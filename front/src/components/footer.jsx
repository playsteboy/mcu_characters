import React from "react";

export default function Footer(){
    return(
        <footer>
            <nav>
                <button id="add">Add</button>
                <button id="update">Update</button>
                <button id="delete">Delete</button>
            </nav>
            <form action="">
                <input type="text" placeholder="" id="id"/>
                <input type="text" placeholder="" id="name"/>
                <input type="text" placeholder="" id="gender"/>
                <input type="text" placeholder="" id="status"/>
                <button>confirm</button>
            </form>
        </footer>
    )
}