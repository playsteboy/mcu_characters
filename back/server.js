import express from 'express'
import fs from 'fs'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())

function saveData(character){
  fs.writeFileSync('./character.json', JSON.stringify(character, null, 2), 'utf-8');
};

app.get("/character",(req,res)=>{
    fs.readFile('./character.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:`file not read`})
        }
        res.send(JSON.parse(data))
    })
})

app.put("/character",(req,res)=>{
    const getData = fs.readFile('./character.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:`file not read`})
        }
        res.send(JSON.parse(data))
    })
    try{
        const {name} = req.query
    const index = getData.character.findIndex(c=>c.name === name)
    if(index != -1){
        data.character[index] = {...data.character[index] , ...req.body}
        saveData(data)
    }
    else{
        res.status(404).json({message:`character not found`})
    }
}catch(error){
    res.status(500).json({message : `update not executed`})
}
})

app.post("/character",(req,res)=>{
    const getData = fs.readFile('./character.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:`file not read`})
        }
        res.send(JSON.parse(data))
    })
    try{
        const newData = getData
        newData.character.push(req.body);
        saveData(newData);
    }catch(error){
        res.status(500).json({message : `add not executed`})
    }
})

app.delete("/character",(req,res)=>{
    const getData = fs.readFile('./character.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:`file not read`})
        }
        res.send(JSON.parse(data))
    })
    try{
         const {name} = req.query
    const data = getData;
    const length = data.character.length
    data = data.character.filter(n=>n.name !== name)

    if(data.character.length < length){
        saveData(newData)
    }else{
        res.json({message : `character not found`})
    }
}catch(error){
    res.status(500).json({message : `delete not executed`})
}
})
app.listen(8000,console.log("serveur is listen from http://localhost:8000"))