import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Base from '../core/Base'

import {signin, isAutheticated,authenticate} from "../auth/helper/index"

const Signin =()=> {

    const [values, setValues] = useState({
        email: "d@gmail.com",
        password: "123456",
        error: "",
        loading: false,  //Need to notify people  what is happening
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect}  = values;

    const {user} = isAutheticated();

    // To get the values from the frontend and store in state
    const handleChange = name => event => {
        setValues({...values, error: false,  [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then( data => {
            if(data.error){
                setValues({...values,error: data.error, loading: true})
            }
            else {
                authenticate(data, ()=> {
                    setValues({...values, didRedirect: true})
                })
            }
        })
        .catch(console.log("Signin request Failed"))
    }


     // Redirect to 
    const performRedirect = () => {
        //TODo:
        if(didRedirect) {
            if(user && user.role === 1) {
                return <p>Redirect To admin</p>
            }
            else {
                return <p>Redirect to user Dashboard</p>
            }
        }
         if (isAutheticated()) {
            return <Redirect to="/"></Redirect>
        }
    }

    // for success Alert 
    const loadingMessage = ()=> {
       return(
           loading && (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <div className="alert alert-info p-1">
                   <h5 className="text-center text-white ">Loading...</h5>
               </div></div></div>
           )
       )
    }
    
    // For Error alert

    const errorMessage = ()=> {
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger p-1" 
            style={{display: error ? "": "none"}}
            >
            Unable to signin
            </div></div></div>
        )
    }

    const signinform =()=> {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light mt-2">Email</label>
                            <input value={email} onChange={handleChange("email")}  className="form-control" type="Email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Password</label>
                            <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
                        </div>
                        <button  onClick={onSubmit} className="btn btn-success btn-block mt-3">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return(
        <Base title="Sign in Page" description="A page where User can signin">
            {loadingMessage()}
            {errorMessage()}
           {signinform()}
           {performRedirect()}
           <p className="text-center text-white">{JSON.stringify(values)}</p>
        </Base>
    )

}

export default Signin