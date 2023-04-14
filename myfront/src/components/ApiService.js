import React, {useState, useEffect, useRef} from "react";
import Config from "./Config";
export default function ApiService() {

//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [email, setEmail] = useState([]);
//   const [phone, setPhone] = useState([]);
   
  const [etudiants, setEtudiant] = useState([]);
    
  useEffect(() => {
        Config.get('etudiants').then((response) => {
          console.log(response);
          setEtudiant(response.data);
      }).catch((error) => {
        console.log(error);
     });
    }, []);


   const [state, setState] = useState({
      firstname: "",
      lastname: "",
      email: "",
      phone:"",
  });

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

            //setEtudiant([response.data, ...etudiants]);

            setState({
               firstname: "",
               lastname: "",
               email: "",
               phone:"",
            });

            fnameRef.current.value = ""
            lnameRef.current.value = ""
            emailRef.current.value = ""
            phoneRef.current.value = ""
         });
      
   }

   /*const handleSubmit = (e)=> {
      e.preventDefault();
      setFirstname(e.target.elements.firstname.value);
      setLastname(e.target.elements.lastname.value);
      setEmail(e.target.elements.email.value);
      setPhone(e.target.elements.phone.value);

      const dataStudent = {
         firstname: firstname,
         lastname: lastname,
         email: email,
         phone: phone
      }

      const dataTosend = JSON.stringify(dataStudent);
      const options = {
         headers: { "content-type": "application/json" }
      }

      client
         .post('etudiant/add/new', dataTosend, options)
          .then((response) => {

            console.log("firstname : " + firstname + " lastname : " + lastname + " email : " + email + 
            " phone : " + phone);

            //setEtudiant([response.data, ...etudiants]);

            setFirstname('');
            setLastname('');
            setEmail('');
            setPhone('');

            fnameRef.current.value = ""
            lnameRef.current.value = ""
            emailRef.current.value = ""
            phoneRef.current.value = ""
            });
      
   }*/

    
    return (<div className="etudiants row">
         <div className="col-3"></div>
         <div className="col-6">
            <h3 style={{color:'green'}}>Ajouter un étudiant</h3>
            
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" className="form-control" id="firstname" ref={fnameRef} onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" name="lastname" className="form-control" id="lastname" ref={lnameRef} onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" ref={emailRef} onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="phone" name="phone" className="form-control" id="phone" ref={phoneRef} onChange={handleChange}/>
                     </div>
                  </div>
               </div>
               <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>

            <br />
            <br />
            <h2 style={{color:'blue'}}>List des étudiants</h2>
            <table className="table table-striped table-bordered">
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
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
                        </tr>
                     )
                     })}
                  </tbody>
            </table>
        </div>
        <div className="col-3"></div>
        
    </div>);

}