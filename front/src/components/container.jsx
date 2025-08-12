import React from "react";
import { useEffect , useState } from "react";

export default function Container(){
    const [data , setData] = useState(null)
    const [loading , setLoading] = useState(true)
    const [err , setErr] = useState(null)

    useEffect(()=>{
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
                setLoading(false)
            }
        }
        dataFetch();
    },[])
    if(loading) return <p>loading...</p>
    if(err) return <div>{err.message}</div>
    return (
        <div className="flex flex-row w-screen justify-between">
            <section>
                <h1>ID</h1>
                {
                    data&& data.map(character=>(
                        <p>{character.id}</p>
                    ))
                }
            </section>
            <section>
                <h1>Name</h1>
                {
                    data && data.map(character=>(
                        <p>{character.name}</p>
                    ))
                }
            </section>
            <section>
                <h1>Gender</h1>
                {
                    data && data.map(character=>(
                        <p>{character.gender}</p>
                    ))
                }
            </section>
            <section>
                <h1>Status</h1>
                {
                    data && data.map(character=>(
                        <p>{character.status}</p>
                    ))
                }
            </section>
        </div>
    )
}