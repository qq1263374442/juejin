import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './index.less'

export default function TopNav(){
    const tags=[
        {
            path:'/',
            text:'全部'
        },
        {
            path:'/frontend',
            text:'后端'
        },
        {
            path:'/backend',
            text:'前端'
        },
        {
            path:'/Android',
            text:'Android'
        },
        {
            path:'/iOS',
            text:'iOS'
        },
        {
            path:'/general',
            text:'人工智能'
        },
        {
            path:'/devTool',
            text:'开发工具'
        },
        {
            path:'/codelife',
            text:'代码人生'
        },
        {
            path:'/read',
            text:'阅读'
        },
    ]
    return (
        <ul>
            {tags.map((item,index)=>{
                return <li key={item.path} >
                    <NavLink to={`/books${item.path}`}>{item.text}</NavLink>
                </li>
            })}
        </ul>
    );
}