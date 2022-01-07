import React, { useState} from 'react'
import Base from '../core/Base'
import {Link, Redirect} from 'react-router-dom'
import { signup } from '../auth/helper'


const Signup =() => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        })


    //Destructing the sestates 
    const {name , email, password, error, success} = values;

        // To get the values from the frontend and store in state
    const handleChange = name => event => {
        setValues({...values, error: false,  [name]: event.target.value})
    }

    // For submit button
    const onSubmit = (event)=> {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, error: false});
            }
            else {
                setValues({...values, name :"", email: "", password: "", error: "", success: true })
            }
        })
        .catch( console.log(error))
    }


 

    // for success Alert 
    const successMessage = ()=> {
        return(
            <div className="alert alert-success"
            style={{display: success ? "": "none"}}
            >
            New Account has been created. Please <Link to="/signin">Login Here</Link>
            </div>
        )
    }
    
    // For Error alert

    const errorMessage = ()=> {
        return(
            <div className="alert alert-danger"
            style={{display: error ? "": "none"}}
            >
            Unable to signin
            </div>
        )
    }




    const signupform =()=> {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" 
                            onChange={handleChange("name")}
                        type="text" value={name} />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Email</label>
                            <input  className="form-control" value={email}  onChange={handleChange("email")} type="Email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Password</label>
                            <input  className="form-control" value={password}  onChange={handleChange("password")} type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block mt-3">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Sign Up Page" description="A page for user to signup">
            {successMessage()}
            {errorMessage()}
            {signupform()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>

    )
}

export default Signup