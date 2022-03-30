import React from 'react';
import { Affix ,Input,Menu,Dropdown,Badge,Popover, Button ,Avatar, Image} from 'antd';
import {DownOutlined,BellOutlined,UserOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import Nav from './Nav';
import SlideMenu from './SlideMenu';
import './index.less'

//从状态集合store中取出部分状态赋值给Props
const mapStateToProps = (state) => {
    return {
        count: state.pageHeaderReducer.notificationCount,
        userName:state.userReducer.userName,
        userImage:state.userReducer.userImage,
        userId:state.userReducer.userId
    }
}
Header=connect(mapStateToProps)(Header)

const {Search}=Input
const menu = (
    <Menu>
      <Menu.Item key="1">写文章</Menu.Item>
      <Menu.Item key="2">发沸点</Menu.Item>
    </Menu>
  );
function Header(props) {
    const onSearch = value => console.log(value);
    const {count,userName,userId,handlelogin}=props
    let isLogin = userName!=='' ? true : false;
    return (
        <Affix offsetTop={0}>
            <div className='pageHeader'>
                <div className='container'>
                    <a href="/" className="logo">
                        <img src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt="掘金" className="logo-img" />
                    </a>
                    <nav className='main-nav'>
                        <Nav/>
                    </nav>
                    <ul className='head-right-side'>
                        <li>
                            <Search placeholder="搜索稀土掘金" onSearch={()=>{}} enterButton />
                        </li>
                        <li>
                            <Dropdown.Button
                            type="primary"
                            icon={<DownOutlined />}
                            overlay={menu}
                            onClick={() => {}}
                            >
                                创作者中心
                            </Dropdown.Button>
                        </li>
                        <li>
                            <a href="#">
                                <Badge count={count} overflowCount={9} size="small">
                                <BellOutlined />
                                </Badge>
                            </a>
                        </li>
                        <li>
                            {
                                isLogin
                                ?<Popover content={<SlideMenu userId={userId} />}  trigger="click">
                                    <Avatar style={{ backgroundColor: '#87d068' ,cursor:'pointer'}} icon={<UserOutlined />} />
                                </Popover>
                                :<Button size={'middle'} onClick={handlelogin} className='login' >登录</Button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </Affix>
    );
  }
  
  export default Header;