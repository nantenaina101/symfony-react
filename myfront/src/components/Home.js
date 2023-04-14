import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Config from "./Config";
export default function Home() {

   const [etudiants, setEtudiant] = useState([]);
    
   useEffect(() => {
        Config.get('etudiants').then((response) => {
          console.log(response);
          setEtudiant(response.data);
      }).catch((error) => {
        console.log(error);
     });
   }, []
   );
   
   const deleteStudent = (id) => {
      Config.delete(`etudiant/delete/${id}`);
      setEtudiant(
         etudiants.filter((etudiant) => {
            return etudiant.id !== id;
         })
      );
   };
    
   return (<div className="etudiants row">
      <div className="col-2"></div>
      <div className="col-8">
         <div>
            <div style={{
               float:"right"
            }}>
               <Link to="/add" className="btn btn-primary">Ajouter</Link>
            </div>
            <h2 style={{ color: 'blue' }}>List des étudiants</h2>
         </div>
         <table className="table table-striped table-bordered">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Prénom</th>
                     <th>Nom</th>
                     <th>Email</th>
                     <th>Téléphone</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {etudiants.map(etudiant => { return (
                     
                     <tr className="etudiant-card" key={etudiant.id} data-id={etudiant.id}>
                        <td className="etudiant-id">{etudiant.id}</td>
                        <td className="etudiant-firstname">{etudiant.firstname}</td>
                        <td className="etudiant-lastname">{etudiant.lastname}</td>
                        <td className="etudiant-email">{etudiant.email}</td>
                        <td className="etudiant-phone">{etudiant.phone}</td>
                        <td className="actions" style={{textAlign:"center"}}>
                           <Link to={"/update/" + etudiant.id} className="btn btn-secondary">Modifier</Link>
                           &nbsp;&nbsp;
                           <button className="btn btn-danger ml-3" onClick={()=>{deleteStudent(etudiant.id)}}>Supprimer</button></td>
                     </tr>
                  )
                  })}
               </tbody>
         </table>
      </div>
      <div className="col-2"></div>
      
   </div>);

}