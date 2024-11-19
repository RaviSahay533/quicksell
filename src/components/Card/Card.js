import React, { useState,useEffect } from 'react'
import style from './card.module.css'
import UserIcon from '../UserIcon/UserIcon'


export default function Card({cardData,userData}) {

    const [data,setData] = useState([]);

    useEffect(()=>{
        const res = userData.filter(d => d.id == cardData.userId);
        setData(res);
        console.log(data)
    },[])



    return (
    <div className={style.cardContainer}>
    <p style={{color:'gray'}}>{cardData.id}</p>
    
    <div style={{display:'flex'}}>
    <p>{cardData.title}</p>
    <UserIcon intials={data[0]?.name[0]} available={data[0]?.available} />
    </div>

    <p style={{color:'gray',padding:'2px', border:'1px solid rgb(193, 193, 193)',borderRadius:'5px'}}>{cardData.tag}</p>
    </div>
  )
}
