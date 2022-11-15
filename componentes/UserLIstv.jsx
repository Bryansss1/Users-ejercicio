import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const UserLIstv = ({list,select,load}) => {

    const [sure,setSure]=useState(false)
    const[yes,setYes]=useState(false) 
    const [userdelete,setUserdelete]=useState(null)

    const deletexd=(user)=>{
        setSure(true)
        if(yes===true){
        actu(user)
    }
}


const actu=(user)=>{
    setYes(true)
    setSure(false)
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
    .then(()=>{
    setYes(false)
    load()
    setUserdelete(null)
})
}

    return (
        <>
           {sure?(<div className='suree'>
            <h2>are you sure delete this?</h2>
            <small>in case of yes, press delete again</small>
            <div className='suree-button'>
            <button onClick={()=>actu(userdelete)}>si</button>
            <button onClick={()=>setSure(false)}>no</button>
            </div>
            </div>):""}
         
                {list.length===0?<h3>Create users!</h3>:list.map(user=>{
                    return(
                        <ul className='user' key={user.id}>
                        <li>
                            <h3><i className='bx bxs-user'></i> {user.first_name} {user.last_name}</h3>
                            <p><i className='bx bxs-envelope'></i> {user.email}</p>
                            <p><i className='bx bx-calendar'></i> {user.birthday}</p>
                            <button onClick={()=>{
                                deletexd(user)
                               setUserdelete(user) }}><i className='bx bx-trash botonggg' ></i></button>
                            <button onClick={()=>select(user)}><i className='bx bx-edit-alt botonggg' ></i></button>
                        </li>
                        </ul>
                    )
                })}
        </>
    );
};

export default UserLIstv;