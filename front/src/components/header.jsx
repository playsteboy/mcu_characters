import React from "react";

export default function Header({err}){
    return(
        <header className="flex flex-row justify-center items-center w-full h-48 bg-[#0B305B] ">
            <h1 className="flex flex-col w-1/2 h-1/2 justify-center text-center text-[#ED1D24] text-5xl font-bold">Marvel Characters</h1>
        </header>
    )
}