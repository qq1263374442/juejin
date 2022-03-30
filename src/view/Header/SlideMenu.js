import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { actions as authActions } from "../../reducers/userReducer";
import { Menu} from 'antd';
import {
    EditOutlined,
    FileTextOutlined,
    UserOutlined,
    LikeOutlined,
    ReadOutlined,
    StarOutlined,
    HistoryOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons';

const menuData=[
    {
        iconType:'EditOutlined',
        text:'写文章',
        linkPath:'editor/drafts/new'
    },
    {
        iconType:'FileTextOutlined',
        text:'草稿箱',
        linkPath:'editor/drafts'
    },
    {
        iconType:'UserOutlined',
        text:'我的主页',
        linkPath:'user/:userId'
    },
    {
        iconType:'LikeOutlined',
        text:'我赞过的',
        linkPath:'user/:userId/likes'
    },
    {
        iconType:'ReadOutlined',
        text:'我的课程',
        linkPath:'user/:userId/collections'
    },
    {
        iconType:'StarOutlined',
        text:'我的收藏',
        linkPath:'user/:userId/books?type=bought'
    },
    {
        iconType:'HistoryOutlined',
        text:'浏览记录',
        linkPath:'subscribe/subscribed'
    },
    {
        iconType:'SettingOutlined',
        text:'设置',
        linkPath:'user/settings/profile'
    },
    {
        iconType:'QuestionCircleOutlined',
        text:'关于',
        subMenu:[//'下载应用','关于','加入我们','翻译计划','合作伙伴'
            {
                text:'下载应用',
                linkPath:'app'
            },
            {
                text:'翻译计划',
                linkPath:'gold-miner'
            }
        ]
    },
    {
        iconType:'PoweroffOutlined',
        text:'退出',
        linkPath:'logout'
    }
]
export default function SlideMenu(){
    const SubMenu = Menu.SubMenu;
    return (
        <div>
            <Menu  style={{ width: 130,border:'none' }} mode="vertical">
                <Menu.Item  key={1}>
                    <EditOutlined/>     
                    写文章
                </Menu.Item>
                <Menu.Item  key={2}>
                    <FileTextOutlined/>     
                    草稿箱
                </Menu.Item>
            </Menu>
        </div>
    );
}