import React from "react";

export default function Name({ firstname, lastname, email }) {
    
    return (
        <div>
            <p><b>Firstname : </b>{ firstname}</p>
            <p><b>Lastname : </b>{ lastname}</p>
            <p><b>Email : </b>{ email}</p>
            <hr />
        </div>
    );
}