import React from 'react'
import {Link, withRouter} from "react-router-dom"
import { isAutheticated, signout } from '../auth/helper'



// This is use to highlight the currebt tab 

const currentab = (history , path)=> {
    if (history.location.pathname === path) {
        return {color: "#FFFFFF"}
    }
    else { 
        return {color: "#2ecc72"}

    }
}
 
const Menu = (history)=> (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentab(history, "/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
                <Link style={currentab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dasboard</Link>
            </li>
            <li className="nav-item">
                <Link style={currentab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">A.Dasboard</Link>
            </li>
            <li className="nav-item">
                <Link style={currentab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
                <Link style={currentab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
            </li>
              {isAutheticated() && (
                     <li className="nav-item">
                    <span className="nav-link text-warning" 
                    onClick={()=> {
                        signout(()=> {
                            history.push("/")
                        })
                    }}>Signout</span>
                 </li>
              )}
        </ul>
    </div>
)

export default withRouter(Menu)