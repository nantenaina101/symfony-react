import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "./Config";
export default function Update() {
   
   const { id } = useParams() 
   
   const navigate = useNavigate()
   
   const [state, setState] = useState({
      firstname: "",
      lastname: "",
      email: "",
      phone:"",
   });
   
   useEffect(() => {
      Config.get('etudiant/'+id).then((response) => {
          console.log(response);
          setState({
               firstname: response.data.firstname,
               lastname: response.data.lastname,
               email: response.data.email,
               phone:response.data.phone,
            });
      }).catch((error) => {
        console.log(error);
     });
   }, []
   );

   const handleChange = (evt) => {
      const value = evt.target.value;
      setState({
         ...state,
         [evt.target.name]: value,
      });
   };
   
   const handleSubmit = (e) => {
      
      e.preventDefault();

      const dataTosend = JSON.stringify(state);
      const options = {
         headers: { "content-type": "application/json" }
      }

      Config
         .put('etudiant/update/'+id, dataTosend, options)
         .then((response) => {

               //console.log(state);
               
               navigate('/')
         });
      
   }
    
   return (<div className="etudiants row">
         <div className="col-3"></div>
         <div className="col-6">
            <h3 style={{color:'green'}}>Modifier l'étudiant</h3>
            
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" value={state.firstname} className="form-control" id="firstname" onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" name="lastname" value={state.lastname} className="form-control" id="lastname" onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={state.email} className="form-control" id="email" onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="phone" name="phone" value={state.phone} className="form-control" id="phone" onChange={handleChange}/>
                     </div>
                  </div>
               </div>
               <button type="submit" className="btn btn-primary">Modifier</button>
            </form>
        </div>
        <div className="col-3"></div>
        
   </div>);

}