import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import UserLIstv from './UserLIstv';
const UserForm = () => {

    const {handleSubmit, register ,reset } = useForm();

    const[users,setUsers]=useState([])
    const [userSelect,setSelectuser]=useState(null)
    const[warning,setWarning]=useState(false)
    const[show,setShow]=useState(false)
    const[congratulation,setcCongratu]=useState(false)
    const[initialll,setInitial]=useState(false)
    const[agg,setAgg]=useState(true)
    const[mode,setMode]=useState(false)
    const [ligth,setLigth]=useState("background:linear-gradient(90deg, rgba(75,79,244,1) 20%, rgba(255,246,246,1) 80%);")
    const[dark,setDark]=useState("background:linear-gradient(90deg, rgba(164,29,255,1) 0%, rgba(0,0,0,1) 0%, rgba(46,2,75,1) 100%, rgba(146,8,238,1) 100%, rgba(42,25,0,1) 100%);")
    const [back,setBack]=useState(null)



    useEffect(()=>{
        axios.get("https://users-crud1.herokuapp.com/users/")
        .then(res=>{ 
                     setUsers(res.data)})
             
        },[])
          
                
useEffect(()=>{
   const opten=localStorage.getItem("darkmodee")
                if(opten){
                    setBack(opten)
                    document.body.style=opten
                }
},[])

useEffect(()=>{
localStorage.setItem("darkmodee",back)
},[back,])

    const load=()=>{
        axios.get("https://users-crud1.herokuapp.com/users/")
        .then(res=>setUsers(res.data))
    }

    const summit=(user)=>{

        if(userSelect!==null){
          up(user)
        }else{
            axios.post(`https://users-crud1.herokuapp.com/users/`,user)
            .then(()=>{
                truee()
                load()
                reset({
                    email:"",
                    password:"",
                    first_name:"",
                    last_name:"",
                    birthday:"",
                })
            })
            .catch(error=>{
                console.log(error.response?.data)
                    ward()
            })
        }   
    }

    const truee=()=>{
        setcCongratu(true)
        setTimeout(()=>{
            setcCongratu(false)
        },1500)
    }

    const ward=()=>{
                    setWarning(true)
                    setTimeout(()=>{
                        setWarning(false)
                    },1000)
    }

    const selectt=(user)=>{
        setSelectuser(user)
        setInitial(true)
    }

const up=(userr)=>{
    console.log(userr)
    axios.put(`https://users-crud1.herokuapp.com/users/${userSelect.id}/`,userr)
    .then(()=>{
            truee()
        load()
        reset({
            email:"",
            password:"",
            first_name:"",
            last_name:"",
            birthday:"",
        })
        setSelectuser(null)
    })
    .catch(error=>{
        ward()
        console.log(error.response?.data)})
}

useEffect(()=>{
    if(userSelect){
        reset(userSelect)
    }
},[userSelect])


const aggbutton=()=>{
    setAgg(false)
    setInitial(true)
}

const darkk=()=>{
     setMode(false)
     setBack(dark)
}
const ligthhh=()=>{
    setMode(true)
    setBack(ligth)
}
const formquit=()=>{
    setInitial(false) 
    setAgg(true)
}    
return (
        <div>
            <section className='principal'>
                <div>
                <h2>USERS CRUD</h2>
                <small> @bryansss1</small>
                </div>
            <a href='https://www.youtube.com/watch?v=s6zrzOgh4CI' target="blank_"><img onClick={()=>alert("creador by bryansss1")} className='lobo' src="https://cdn.icon-icons.com/icons2/1446/PNG/512/22217wolfface_98825.png"/></a>
            {mode?<button className='darkmode' onClick={()=>{
                   darkk()
                document.body.style=dark}}><i className='bx bx-moon'></i></button> 
                :<button className='darkmode' onClick={()=>{ligthhh()
                document.body.style=ligth}}><i className='bx bx-sun'></i></button>}
                
            </section>

            {agg?(
            <div className='aggg' onClick={()=>aggbutton()}>
            <h3>Users <i className='bx bxs-user-plus'></i></h3>
            </div>
            ):""}

            {initialll?(
    <article className='Form-user'>
        
        <form action='' onSubmit={handleSubmit(summit)}>
            <i onClick={()=>{formquit()}} className='bx bx-x zzz'></i>
            <div className='input-part'>
            <label htmlFor='email'>Email</label>
            <input {...register("email")} type="email" placeholder='Email/correo' id='email'/>
            </div>

            <div className='input-part'>
            <label htmlFor='passwordd'>Password</label>
            <input {...register("password")} type="text" placeholder='password/contraseña' id='passwordd' required=""/>
            <button type='button' onClick={()=>setShow(!show)}>{show?<i className='bx bx-low-vision'></i>:<i className='bx bxs-show'></i>}</button>
            </div>

            <div className='input-part'>
            <label htmlFor='first'>First name</label>
            <input {...register("first_name")} type="text" placeholder='First name/nombre' id='first' required=""/>
            </div>

            <div className='input-part'>
            <label htmlFor='last'>Last name</label>
            <input {...register("last_name")} type="text" placeholder='Last name/apellido' id='last' required=""/>
            </div>

            <div className='input-part'>
            <label htmlFor='brd'>Birthday</label>
            <input {...register("birthday")} type="date" placeholder='birthday/cumpleaños' id='brd'/>
            </div>
            <button className='botoncito'>Submint</button>
        </form>
        </article>):""}
           

            {congratulation?(<div className='congratulation'>
                <h2>Congratulation <i className='bx bxs-check-circle'></i></h2>
                <p>realized</p>
            </div>):""}

            {warning?(<div className='warning'>
                <h2>Error <i className='bx bx-error-alt'></i></h2>
                <p>an error has occurred, check your form</p>
            </div>):""}
            
        <article className='users'>
        <UserLIstv list={users} load={load} select={selectt} />
        </article>

        </div>
    );
};

export default UserForm;