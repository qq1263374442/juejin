import React, { useEffect, useState } from 'react';
import { NavLink,useLocation,Link } from 'react-router-dom';


export default function HomeSecondNav(props){
    const location = useLocation();
    const {tags,setsortInfo}=props

   const updatedList=(id)=>{
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setsortInfo({
        categoryId:id,
        sortBy:'hot'
    })
   }
    return (
        <div className="secondNav">
            <ul>
                {tags.map((item,index)=>{
                    const name=item.category_name
                    const path1=location.pathname.split('/')[1]
                    let path2=location.pathname.split('/')[2]
                    if(!path2)path2='全部'
                    return  (<li key={index}  onClick={()=>{updatedList(item.category_id)}} >
                                {/* <a
                                href={name==='全部'? `${path1}`:`/${path1}/${name}`} 
                                style={path2===name?{color:'#007fff'}:{color:'#71777c'}}
                                >
                                    {name}
                                </a> */}
                                <NavLink 
                                to={name==='全部'? `${path1}`:`/${path1}/${name}`} 
                                style={path2===name?{color:'#007fff'}:{color:'#71777c'}}>
                                    {name}
                                </NavLink>
                            </li>)
                })}
            </ul>
        </div>
    );
}