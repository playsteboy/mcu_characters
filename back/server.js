import express from 'express'
import fs from 'fs'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())

const saveData = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('./character.json', jsonData, (err) => {
    if (err) {
      console.error('Error , file not saved', err);
    }
  });
};

app.get("/character",(req,res)=>{
    fs.readFile('./character.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:`file not read`})
        }
        res.send(JSON.parse(data))
    })
})

app.put("/character", (req, res) => {
  fs.readFile('./character.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'file not read' });
    }
    if(req.body.gender && String(req.body.gender).toLowerCase() != 'male' && String(req.body.gender).toLowerCase() != 'female'){
        req.body.gender = 'Undefined';
    }
    if(String(req.body.description).length > 50 || String(req.body.name).length >25){
        return res.status(400).json({message : `text input is too long , description must be less than 51 words and name must be less than 26 words`})
    }
    try {
      const charactersData = JSON.parse(data);
      const { id } = req.query;
      if(Object.keys(req.body).length > 0){

        const index = charactersData.character.findIndex(c => String(c.id) === id);
        if (index !== -1) {
          const characterToUpdate = charactersData.character[index];
          for (const key in req.body) {
            const newValue = req.body[key];
            if (newValue !== null && newValue !== '') {
              characterToUpdate[key] = newValue;
            }
          }
          saveData(charactersData);
          res.status(200).json({ message: 'Character updated successfully' });
        } else {
          res.status(404).json({ message: 'character not found' });
        }
      }
      else{
        res.status(400).json({message : `character is not complete`})
      }
    } catch (error) {
      res.status(500).json({ message: 'update not executed', error: error.message });
    }
  });
});
app.post("/character", (req, res) => {
    fs.readFile('./character.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: `file not read` });
        }
        if(String(req.body.gender).toLowerCase() != 'male' && String(req.body.gender).toLowerCase() != 'female'){
          req.body.gender = 'Undefined';
        }
        if(String(req.body.description).length > 50 || String(req.body.name).length >25){
          return res.status(400).json({message : `text input is too long , description must be less than 51 words and name must be less than 26 words`})
        }
        try {
            const characters = JSON.parse(data);
            const allIds = characters.character.map(c => String(c.id));
            if(allIds.includes(req.body.id)){
              res.status(409).json({message : `This ID already exists`})
            }
            else{

              if(req.body.id && req.body.name && req.body.gender){
                characters.character.push(req.body);
                saveData(characters);
                res.status(200).json({ message: 'Character added' });
              }
              else{
                res.status(400).json({message : `character is not complete`})
              }
            }

        } catch (error) {
            res.status(500).json({ message: `add not executed`, error: error.message });
        }
    });
});

app.delete("/character", (req, res) => {
  fs.readFile('./character.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: `file not read` });
    }
    try {
      const charactersData = JSON.parse(data);
      const { id } = req.query;
      const initialLength = charactersData.character.length;
      
      const updatedCharacters = charactersData.character.filter(n => String(n.id) !== id);
      
      if (updatedCharacters.length < initialLength) {
        charactersData.character = updatedCharacters;
        saveData(charactersData);
        res.status(200).json({ message: `character deleted` });
      } else {
        res.status(404).json({ message: `character not found` });
      }
    } catch (error) {
      res.status(500).json({ message: `delete not executed`, error: error.message });
    }
  });
});
app.listen(8000,console.log("serveur is listen from http://localhost:8000"))