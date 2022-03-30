import React, { Component } from 'react';
import { Card,List, Avatar,Icon,Affix } from 'antd';
import DownloadApp from '../../components/DownloadApp/index';
import Catalogue from '../../components/Catalogue/index';
import {
    LikeOutlined,EyeOutlined
  } from '@ant-design/icons';
  
export default function SideNav(props){
    const {article}=props
    return (
        <>
            <Card
                title="关于作者"
                style={{ width: '100%' }}
                headStyle={{fontSize:'14px',color:'#333'}}
                bodyStyle={{padding:'0 16px'}}
                >
                <List
                    itemLayout="vertical"
                    dataSource={article}
                    renderItem={item => (
                    <List.Item onClick={()=>window.location.href='/user/'+item.id}>
                        <List.Item.Meta
                        avatar={<Avatar size={46} src={item.author_user_info.avatar_large} />}
                        title={item.author_user_info.user_name}
                        />
                        
                        <div style={{marginTop:'10px'}}>
                            <Avatar style={{ backgroundColor: 'rgb(225, 239, 255)' }}>
                                <LikeOutlined style={{ color: 'rgb(123, 185, 255)' }}/>
                            </Avatar>
                            <label style={{color:'#000',marginLeft:'10px',fontSize:'16px'}}>获得点赞{item.author_user_info.got_digg_count}</label>
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <Avatar style={{ backgroundColor: '#e1efff' }}>
                                <EyeOutlined style={{ color: 'rgb(123, 185, 255)' }}/>
                            </Avatar>
                            <label style={{color:'#000',marginLeft:'10px',fontSize:'16px'}}>
                                文章被阅读{item.author_user_info.got_view_count}
                            </label>
                        </div>
                    </List.Item>
                    )}
                />
            </Card>
            <DownloadApp />
            <Card
                style={{ width: '100%',marginTop:'20px' }}
                hoverable={'true'}
                bodyStyle={{padding:'0'}}
            >
                <img alt='' src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/default.640d9a7.png' style={{height:'200px',width:'100%'}} />
            </Card>

            
        </>
    );
}