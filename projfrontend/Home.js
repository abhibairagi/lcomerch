import React from 'react'
import { API } from '../backend'
import '../styles.css'
import Base from './Base'



export default function Home() {

    //Fetching This APi from Backend.js file
    console.log("API is", API)
    return(
        <Base>
            <h1 className="text-white text-center">Hello Frontend</h1>
        </Base>
    )

}