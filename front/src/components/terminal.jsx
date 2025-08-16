import React from "react";
import { useState } from "react";
export default function Terminal({error,succes}){
    const [show , setShow] = useState(false)
    return(
        <div className="flex flex-col absolute right-0 top-0 w-1/4 rounded-bl-sm">
            {
                show && (
                    <div className="flex flex-row w-full bg-black justify-center rounded-bl-sm items-center text-center p-1">

        <div className="flex flex-col items-center text-center">
            {
                error &&
                (
                    <div className="flex flex-row items-center text-center justify-between gap-1">
                        <h1 className="font-semibold">Terminal:</h1>
                        <p className="break-normal text-[#ED1D24]">{error}</p>
                    </div>
                )
            }
            {
                succes &&
                    <div className="flex flex-row items-center text-center justify-between gap-1">
                        <h1 className="font-semibold">Terminal:</h1>
                        <p className="break-normal text-[#13CE66]">{succes}</p>
                    </div>
            }
        </div>
                    </div>
                )
            }
            <button type="button" onClick={()=>{setShow(!show)}} className="font-bold text-2xl bg-black hover:cursor-pointer rounded-bl-sm">↓</button>
        </div>
    )
}