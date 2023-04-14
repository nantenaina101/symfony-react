import React, { useState, useRef } from "react";
import {useNavigate} from "react-router-dom"
import Config from "./Config";
const Add = props => {

   const [state, setState] = useState({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
   });

   const navigate = useNavigate();

   const handleChange = (evt) => {
      const value = evt.target.value;
      setState({
         ...state,
         [evt.target.name]: value,
      });
   };

   const fnameRef = useRef()
   const lnameRef = useRef()
   const emailRef = useRef()
   const phoneRef = useRef()
   
   const handleSubmit = (e) => {
    
      e.preventDefault();

      const dataTosend = JSON.stringify(state);
      const options = {
         headers: { "content-type": "application/json" }
      }

      Config
         .post('etudiant/add/new', dataTosend, options)
         .then((response) => {

            console.log(state);
               
            setState({
               firstname: "",
               lastname: "",
               email: "",
               phone: "",
            });

            fnameRef.current.value = ""
            lnameRef.current.value = ""
            emailRef.current.value = ""
            phoneRef.current.value = ""
               
            navigate("/");

         });
   }
    
   return (<div className="etudiants row">
      <div className="col-3"></div>
      <div className="col-6">
         <h3 style={{ color: 'green' }}>Ajouter un étudiant</h3>
            
         <form onSubmit={handleSubmit}>
            <div className="row">
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="firstname">Prénom</label>
                     <input type="text" name="firstname" className="form-control" id="firstname" ref={fnameRef} onChange={handleChange} />
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="lastname">Nom</label>
                     <input type="text" name="lastname" className="form-control" id="lastname" ref={lnameRef} onChange={handleChange} />
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input type="email" name="email" className="form-control" id="email" ref={emailRef} onChange={handleChange} />
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="phone">Téléphone</label>
                     <input type="phone" name="phone" className="form-control" id="phone" ref={phoneRef} onChange={handleChange} />
                  </div>
               </div>
            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
         </form>
      </div>
      <div className="col-3"></div>
        
   </div>);

};

export default Add;