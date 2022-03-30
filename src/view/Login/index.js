import React, {useState} from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form,Input,Button,message } from 'antd';
import { actions as authActions } from "../../reducers/userReducer";

const mapStateToProps = (state, ownProps) => {
    return {
      // userId: state.userReducer.userId
    }
  }
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
      login: authActions.login
    },dispatch);
  }
  
Login=connect(mapStateToProps,mapDispatchToProps)(Login)

export default function Login(props){
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const handleChange=(e)=>{
        if (e.target.name === 'username') {
            setusername(e.target.value)
          } else if (e.target.name === 'password') {
            setpassword(e.target.value)
          } else {
            // do nothing
          }
    }
    const userImage='https://p6-passport.byteacctimg.com/img/mosaic-legacy/3793/3114521287~300x300.image'
    const handleSubmit=(e)=>{
        // e.preventDefault ();
        //这里为什么没有preventDefault,上面的函数能获得e.target？
        if (username.length === 0 || password.length === 0) {
            alert ('用户名或密码不能为空！');
            return;
        }
        //默认用户名和密码分别为admin和123456
        if(username==='admin' && password==='123456'){
            let userId=username+new Date().getTime();
            props.login({username:username,userId:userId,userImage:userImage});
            props.loginSuccess();
        }else{
            message.error('用户名或者密码不正确！');
        }
    }
    return (
        // from 保存跳转到登录页前的页面路径，用于在登录成功后重定向到原来页面
        // const {from} = this.props.location.state || {from: {pathname: '/'}};
        // const {redirectToReferrer} = this.state;
        // // 登录成功后，redirectToReferrer为true，使用Redirect组件重定向页面
        // if (redirectToReferrer) {
        //   return <Redirect to={from} />;
        // }
        <Form onFinish={handleSubmit} className="login-form">
            <Form.Item>
                <Input
                    name="username"
                    placeholder="admin"
                    value={username}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    name="password"
                    placeholder="123456"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
}

