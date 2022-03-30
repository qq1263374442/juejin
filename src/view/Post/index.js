import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col,List, Avatar } from 'antd';
import ArticleSuspendedPanel from '../../components/ArticleSuspendedPanel';
import CommentList from '../../components/Comment';
import CommentElement from '../../components/CommentElement';
import RelationArticleList from '../Home/ArticleList';
import SideNav from './SideNav.js';
import './index.less';
import { useParams } from 'react-router-dom';
import { getArticleById,getCommentsByArticleId } from '../../fake-api';
import { UserOutlined } from '@ant-design/icons';

const mapStateToProps = (state) => {
    return {
        userId:state.userReducer.userId,
        userImage:state.userReducer.userImage,
        userName:state.userReducer.userName,
        userDesc:state.userReducer.userDesc
    }
}
Post=connect(mapStateToProps)(Post)

export default function Post(props){
    //articleId
    const params=useParams()
    const [article,setArticle]=useState([])
    const [comment,setComment]=useState([])
    useEffect(()=>{
        getArticleById(params.articleId).then(res=>{
            // console.log(res.data.article)
            setArticle([res.data.article])
            document.getElementById('articleContext').innerHTML=res.data.article.article_content
        })
        getCommentsByArticleId(params.articleId,0,10).then(res=>{
            console.log(res.data.comments)
            setComment(res.data.comments)
        })
    },[])
    const {userId,userName,userImage,userDesc}=props
    const data = {
        //实际中该部分数据需要从数据库中获取
        articleInfo:{
            starCount:'10',
            commentsCount:'5',
            articleList:[{
                authorImage:'https://p6-passport.byteacctimg.com/img/mosaic-legacy/3793/3114521287~300x300.image',
                author:'rocky191',
                editDate:'2019年03月20日',
                readNum:'1853',
                isFocus:true,
                isGroup:true,
                allStarNum:100,
                allReadNum:2000
            }],
            articleText:'最近正在学习react，就想着能不能用react做一个项目，平时浏览掘金，就拿掘金练手吧！'
        },
        commentList:[
            {
                userId:'0001',
                starNum:25,
                commentNum:7,
                userImage:'https://p6-passport.byteacctimg.com/img/user-avatar/4702aaf87ca84f22b4ea08a0f3d59b7e~300x300.image',
                authorName:'LiuJie',
                userDesc:'前端开发',
                commentText:'获取url参数可以用内置的URLSearchPramas构造函数',
                editDate:1553011200,
                reply:[
                    {
                        userId:'0004',
                        starNum:10,
                        commentNum:5,
                        userImage:'//mirror-gold-cdn.xitu.io/168e093aa99c9c4ad10?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                        authorName:'melody_future',
                        userDesc:'',
                        commentText:'666',
                        editDate:1553356800
                    }
                ]
            },
            {
                userId:'0002',
                starNum:10,
                commentNum:5,
                userImage:'https://p26-passport.byteacctimg.com/img/user-avatar/f6abc665eed7890e381837c94e16ec00~300x300.image',
                authorName:'迈迈',
                userDesc:'前端开发工程师',
                commentText:`666啊，收藏一波，之后再慢慢啃`,
                editDate:1553529600
            },
        ],
        relateList:[
            {
                id:'00001',
                author:'前端阿飞',
                time:'4月前',
                tags:['前端'],
                title:'10个常见的前端手写功能,你全都会吗',
                articleImage:'',
                watch:'5965',
                starNum:'2160',//点赞数
                commentNum:'174',//评论数
                articleType:'1',//1代表文章类型为专栏，2代表文章类型为小册
            },
            {
                id:'00002',
                author:'sunshine小小倩',
                time:'4年前',
                tags:['JavaScript','前端'],
                title:`this、apply、call、bind`,
                articleImage:'',
                starNum:'9154',//点赞数
                commentNum:'3130',//评论数
                articleType:'248'
            }
        ],
        relationArticles:[
            {
                id:'0001',
                title:'vue面试题集合',
                starNum:'10',
                commentNum:'20'
            },
            {
                id:'0002',
                title:'react资料整理',
                starNum:'100',
                commentNum:'30'
            }
        ],
        articleCatalogue:[
            {
                text:'题记',
                children:[
                    {
                        text:'标题1'
                    },
                    {
                        text:'标题2'
                    }
                ]
            },
            {
                text:'安装',
                children:[]
            },
            {
                text:'使用步骤',
                children:[]
            }
        ]
    }
    //评论
    const lookComment=(id)=>{
        console.log('评论',id);
        window.location.href = `/post/:${id}`;  //window.location.href跳转
    }

    const submitComment=(val)=>{
        let newObj={
            userId:userId,
            starNum:0,
            commentNum:0,
            userImage:userImage,
            authorName:userName,
            userDesc:userDesc,
            commentText:val,
            editDate:0
        }
        // const newdata={...data}
        // setdata({...data,newObj})
    }
    
    return (
        <div className="ct marginTop20 position-rel">
            <Row gutter={14}>
                <Col className="gutter-row" span={18}>
                    <div className="article-info">
                        {/* 头部 */}
                        <List
                            itemLayout="horizontal"
                            dataSource={article}
                            renderItem={item => (
                            <List.Item actions={[item.author_user_info.isfollowed?<button className='focusedBtn'>已关注</button>:<button className='focusBtn'>关注</button>]}>
                                <List.Item.Meta
                                // <img src={item.author_user_info.avatar_large}></img>
                                    avatar={<Avatar size="large" icon={<img src={item.author_user_info.avatar_large}></img>} />}
                                    title={item.author_user_info.user_name}
                                    description={<div><span>2019年03月20日</span><span style={{marginLeft:'10px'}}>阅读{item.article_info.view_count}</span></div>}
                                />
                            </List.Item>
                            )}
                        />
                        {/* 正文+评论 */}
                        <article>
                            <section id="articleContext"></section>
                            <CommentList userImage={userImage} submitComment={()=>{}} />
                            <CommentElement commentList={comment} />
                        </article>
                    </div>
                    {/* 相关推荐 */}
                    {/* <div style={{background:'#fff',marginTop:'20px'}}>
                        <header style={{height:'52px',lineHeight:'52px',borderBottom:'1px solid rgba(178,186,194,.15)',color:'#909090',fontWeight:'600',padding:'0 20px',fontSize:'16px'}}>相关推荐</header>
                        <RelationArticleList data={data.relateList}/>
                    </div> */}
                </Col>
                <Col className="gutter-row" span={6}>
                    <SideNav article={article}/>
                </Col>
            </Row>
        </div>
    );
}