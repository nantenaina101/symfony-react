import React from "react";

export default function ShowListAndFilter() {
    const people = [
        'Creola Katherine Johnson: mathematician',
        'Mario José Molina-Pasquel Henríquez: chemist',
        'Mohammad Abdus Salam: physicist',
        'Percy Lavon Julian: chemist',
        'Subrahmanyan Chandrasekhar: astrophysicist'
    ];
    
    const style = {fontSize:"20px",color:'red',textDecoration:'none', textAlign:'justify'}
    
    let listItem = people.map(item => <li style={{listStyleType:'none'}}>{ item}</li>)
    return (
        <ul style={style}>{ listItem}</ul>
    );
}