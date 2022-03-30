import React from 'react';
import { NavLink } from 'react-router-dom'
import { Card,List, Avatar } from 'antd';
import DownloadApp from '../../components/DownloadApp/index';

export default function SideNav(props){
    const {goodAuthor,recommendBooks,linkList}=props
    return (
        <>
            <DownloadApp />
            <Card
                title={<header >🎖️作者榜</header>}
                style={{ width: '100%' }}
                // hoverable={'true'} //鼠标划过时浮起
                bodyStyle={{padding:'0 16px'}}
                //此处应弹出新页面
                actions={[<NavLink to='/recommendation/authors/recommended' style={{color:'#007fff'}}>完整榜单{' >'}  </NavLink>]}
                >
                <List
                    itemLayout="horizontal"
                    dataSource={goodAuthor}
                    renderItem={item => (
                    <List.Item onClick={()=>window.location.href='/user/'+item.id}>
                        <List.Item.Meta
                        avatar={<Avatar size={46} src={item.userImage} />}
                        title={<span>{item.title} <img src={item.rank} /> </span>}
                        description={<div className="overflow-ellipsis little-description">{item.desc}</div>}
                        />
                    </List.Item>
                    )}
                />
            </Card>
            <Card
                style={{ width: '100%',marginTop:'20px' }}
                bodyStyle={{padding:'0 16px'}}
                >
                <List
                    itemLayout="horizontal"
                    dataSource={linkList}
                    className="linkCard"
                    renderItem={item => (
                    <List.Item onClick={()=>window.location.href='/repos'}>
                        <List.Item.Meta
                        avatar={<img alt='' src={item.linkImage} />}
                        title={item.title}
                        />
                    </List.Item>
                    )}
                />
            </Card>
        </>
    );
}