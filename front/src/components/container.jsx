import React from "react";
import { useEffect , useState } from "react";
import Terminal from "./terminal";
export default function Container(){
    const [data , setData] = useState(null)
    const [loading , setLoading] = useState(true)
    const [err , setErr] = useState(null)
    const [action , setAction] = useState('')
    const [findId , setFindId] = useState(null)
    const [id , setId ] = useState('')
    const [name , setName] = useState('')
    const [gender , setGender] = useState('')
    const [description , setDescription] = useState('')
    const [mode , setMode] = useState('')
    const [errorLog , setErrorLog] = useState(null)
    const [succesLog , setSuccesLog] = useState(null)

    const clearValue = () =>{
        setId('');
        setName('');
        setGender('');
        setDescription('');
        setFindId(null);
    }
    const dataFetch = async () =>{
            try{
                const res = await fetch('http://localhost:8000/character')
                if(!res.ok){
                    throw new Error(`HTTP error ! status : ${res.status}`)
                }
                const resData = await res.json();

                setData(resData.character)
            }catch(error){
                setErr(error)
            }finally{
                const timer = setTimeout(() => {
                    setLoading(false)}, 2000);
                    return () => clearTimeout(timer);
            }
        }

    useEffect(()=>{
        dataFetch();
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(action == 'add'){
            try{
                const res = await fetch('http://localhost:8000/character',{
                    method : 'POST',
                    body : JSON.stringify({
                        "id" : id,
                        "name" : name,
                        "gender" : gender,
                        "description" : description
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (res.ok) {
                    dataFetch();
                    setId('');
                    setName('');
                    setGender('');
                    setDescription('');
                    setMode('');
                    const jsonRes = await res.json();
                    setSuccesLog(jsonRes.message)
                }
                else{
                    const jsonRes = await res.json();
                    setErrorLog(jsonRes.message)
                    throw new Error('Error' , res.statusText)
                }
            }catch(error){
                console.error('Error : ',error)
            }finally{
                setAction('')
            }
        }
        else if(action == 'delete'){
            try{
                const res = await fetch(`http://localhost:8000/character?id=${findId}`,{
                    method : "DELETE",
                })
                if (!res.ok) {
                    const jsonRes = await res.json();
                    setErrorLog(jsonRes.message)
                    throw new Error('Error' , res.statusText)
                }
                dataFetch();
                setFindId(null);
                setMode('')
                const jsonRes = await res.json();
                setSuccesLog(jsonRes.message)
            }catch(error){
                console.error('Error : ', error)
            }finally{
                setAction('')
            }
        }
        else if(action == 'update'){
            try{
                const res = await fetch(`http://localhost:8000/character?id=${findId}`,{
                    method : "PUT",
                    body : JSON.stringify({
                        "name" : name,
                        "gender" : gender,
                        "description" : description
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!res.ok) {
                    const jsonRes = await res.json();
                    setErrorLog(jsonRes.message)
                    throw new Error('Error' , res.statusText)
                }
                dataFetch();
                setId('');
                setName('');
                setGender('');
                setDescription('');
                setFindId(null);
                setMode('')
                const jsonRes = await res.json();
                setSuccesLog(jsonRes.message)

            }catch(error){
                console.error('Error : ', error)
            }finally{
                setAction('')
            }
        }
    }
    if(loading) return <div className="flex flex-col justify-center text-center items-center w-full h-full mt-52"><p className="flex flex-col text-center w- text-4xl font-semibold">Loading...</p></div>
    if(err) return <div className="flex flex-col justify-center text-center items-center w-full h-full mt-52"><p className="text-4xl">{err.message}</p><p>There seems to be a problem loading this page. We are working to resolve the issue. Please try again in a few moments.</p></div>
    return (
        <div className="flex flex-col w-full h-full">
            <Terminal error = {errorLog} succes={succesLog}/>
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between h-14 text-center items-center">
                    <h1 className="flex flex-col text-center items-center w-1/6 font-semibold text-xl">ID</h1>
                    <h1 className="flex flex-col text-center items-center w-1/6 font-semibold text-xl">Name</h1>
                    <h1 className="flex flex-col text-center items-center w-1/6 font-semibold text-xl">Gender</h1>
                    <h1 className="flex flex-col text-center items-center w-1/6 font-semibold text-xl">Description</h1>
                    <h1 className="flex flex-col text-center items-center w-1/6"></h1>
                </div>
                {
                    data && data.map((character , index)=>(
                        <div key={index} className={`flex flex-row justify-between h-20 text-center items-center ${index % 2 === 0 ? 'bg-[#0A2B4C]' : 'bg-[#05203A]'}`}>
                            <section className="flex flex-col justify-center text-center items-center w-1/6 h-full overflow-x-hidden">
                                <p className="break-all text-center">{character.id}</p>
                            </section> 
                            <section className="flex flex-col justify-center text-center items-center w-1/6 h-full overflow-x-hidden">
                                <p className="break-all">{character.name}</p>
                            </section>
                            <section className="flex flex-col justify-center text-center items-center w-1/6 h-full overflow-x-hidden">
                                <p className="break-all">{character.gender}</p>
                            </section>
                            <section className="flex flex-col justify-center text-center items-center w-1/6 h-full overflow-hidden">
                                <p className="break-all">{character.description}</p>
                            </section>
                            <section className="flex flex-row text-center items-center w-1/6 justify-evenly">
                                <button onClick={() => { setFindId(character.id); setMode('update'); }} type="button" className="bg-[#FFC82C] flex flex-col text-center items-center px-3 py-1 rounded-md h-full w-28 font-semibold hover:cursor-pointer">Update</button>
                                <button onClick={() => { setFindId(character.id); setMode('delete'); }} type="button" className="bg-[#ED1D24] flex flex-col text-center items-center px-3 py-1 rounded-md h-full w-28 font-semibold hover:cursor-pointer">Delete</button>

                            </section>
                        </div>      
                    ))
                }
                {
                    mode === 'delete' &&
                    <div className="flex flex-col text-center items-center w-full fixed top-1/2">
                        <div className="flex flex-col w-1/2 items-center text-center bg-[#f0f0f0ea] rounded-lg justify-between gap-5 pt-5 pb-5">
                        <section className="flex flex-col justify-between items-center text-center">
                        <h2 className="text-[#ED1D24] font-semibold text-2xl">THIS ACTION IS IRREVERSIBLE!</h2>
                        <p className="text-[#ED1D24] font-semibold">Are you sure to delete ID: {findId}?</p>
                        </section>
                        <section className="flex flex-row justify-between gap-26 items-center text-center">
                        <button type="submit" onClick={() => setAction('delete')} className="bg-[#ED1D24] px-3 py-1 font-semibold w-52 rounded-sm hover:cursor-pointer">Confirm</button>
                        <button onClick={() => { setMode(''); clearValue() }} type="button" className="bg-[#666666] px-3 py-1 font-semibold w-52 rounded-sm hover:cursor-pointer">cancel</button>
                        </section>
                        </div>
                    </div>
                }
            </form>
            <nav className="fixed bottom-0 right-96 pr-2.5 pl.25 pt-2.5 flex flex-col items-center text-center w-1/2">
        {
          mode === 'add'?(

          <form action="" className="flex flex-col items-center text-center justify-evenly gap-2.5 bg-[#F7F9FA] rounded-t-xl w-full h-full pb-2.5 overflow-y-hidden" onSubmit={handleSubmit}>
            <section className="flex flex-row items-center text-center bg-[#13CE66] w-full rounded-t-xl pt-2.5 pb-2.5">
            <h1 className="text-xl font-bold text-center w-full">Add form</h1>
            </section>
            <section className="flex flex-row justify-between gap-16 items-center text-center">
            <input type="number" value={id} onChange={e => setId(e.target.value)} placeholder="Id" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center"/>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center"/>
            </section>
            <section className="flex flex-row justify-between gap-16 items-center text-center">
            <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center"/>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center"/>
            </section>
            <section className="flex flex-row justify-between gap-26 items-center text-center">
            <button type="submit" onClick={() => setAction('add')} className="bg-[#1FB6FF] px-3 py-1 font-semibold w-52 rounded-sm hover:cursor-pointer">confirm</button>
            <button onClick={() => { setMode('');clearValue() }} type="button" className="bg-[#666666] px-3 py-1 font-semibold w-52 rounded-sm hover:cursor-pointer">cancel</button>
            </section>
          </form>
          ):(
            (
                mode != 'update'&&
                <button onClick={() => { setMode('add'); setAction(''); }} className="bg-[#13CE66] flex flex-col text-center items-center px-3 py-1 rounded-t-md h-full w-1/2 font-semibold hover:cursor-pointer">Add</button>
            )
          )
        }
        {
          mode === 'update' &&
          <form action="" className="flex flex-col items-center text-center justify-evenly gap-2.5 bg-[#F7F9FA] rounded-t-xl w-full h-full pb-2.5 overflow-y-hidden" onSubmit={handleSubmit}>
            <section className="flex flex-row items-center text-center bg-[#FFC82C] w-full rounded-t-xl pt-2.5 pb-2.5">
            <h1 className="text-xl font-bold text-center w-full">update form</h1>
            </section>
            <section className="flex flex-row justify-between gap-16 items-center text-center">
            <p className="border-[#E0E3E7] border-2 bg-[#E9ECEF] text-[#6C757D] rounded-sm w-64 h-8 text-center font-semibold" >{findId}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center" />
            </section>
            <section className="flex flex-row justify-between gap-16 items-center text-center">
            <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center" />
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border-[#E0E3E7] border-2 bg-[#FFFFFF] text-[#333333] rounded-sm w-64 h-8 text-center"/>
            </section>
            <section className="flex flex-row justify-between gap-26 items-center text-center">

            <button type="submit" onClick={() => setAction('update')} className="bg-[#1FB6FF] px-3 py-1 font-semibold w-52 rounded-sm hover:cursor-pointer">confirm</button>
            <button onClick={() => { setMode(''); clearValue() }} type="button" className="bg-[#666666] px-3 py-1 font-semibold w-52 rounded-sm hover:cursor-pointer">cancel</button>
            </section>
          </form>
        }
      </nav>
        </div>
    )
}