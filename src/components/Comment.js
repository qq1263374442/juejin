import React, { Component } from 'react'
import { Avatar,Input,Button,message } from 'antd';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',//输入框内容
            showIconAndBtn:false
        }
    }

    handleFocus=()=>{
        this.setState({
            showIconAndBtn:true
        })
    }

    handleChange=(e)=>{
        // console.log(e.target.value);
        this.setState({
            value:e.target.value
        });
    }

    //评论
    handlePressEnter=()=>{
        if(this.state.value!==''){
            this.props.submitComment(this.state.value);
            this.setState({
                value:'',
                showIconAndBtn:false
            })
        }else{
            message.warning('还未填写评论哦！');
        }
    }

    render() {
        return (
            <article>
                <section style={{padding:'0px 15px',color:'#252933',fontSize:'18px',fontWeight:'600',margin:'20px 0 10px 0'}}>评论</section>
                <section style={{display:'flex',background:'#fafbfc',borderRadius:'3px',margin:'20px 0',padding:'10px 15px'}}>
                    <Avatar src={this.props.userImage} />
                    <div style={{marginLeft:'10px',flex:'1'}}>
                        <Input value={this.state.value} placeholder="输入评论"  onChange={this.handleChange.bind(this)} onPressEnter={this.handlePressEnter.bind(this)}/>
                        <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                            <p>
                                <label style={{color:'#c2c2c2',marginRight:'8px'}}>Enter</label>
                                <Button type="primary" onClick={this.handlePressEnter.bind(this)}>评论</Button>
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

export default CommentList;