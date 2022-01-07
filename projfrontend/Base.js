import React from "react"
import Menu from "./Menu"

const Base = ({
    title ="My Title",
    description ="My description",
    className = "bg-dark text-white p-4",
    children

})=> (
    <div>
        <Menu />
        <div className="containe-fluid bg-dark text-white text-center">
            <div className="jumbotron text-center text-white">
                <h4 className="display-6 py-1">{title}</h4>
                <h5 className="lead">{description}</h5>
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-4">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h5>IF you have any query Please do reach out</h5>
                <button className="btn btn-warning btn-sm">Contact us </button>
            </div>
            <div className="container">
                <span className="text-muted">An Amazing <span className="text-white"> Ecommerce </span>Website</span>
            </div>
        </footer>
    </div>
)



export default Base