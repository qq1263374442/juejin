import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { List,Avatar } from 'antd';

function BookList(){
    //bookList应该根据标签从数据库获取数据
    const bookList=[
        {
            bookId:'000001',
            userId:'000001',
            img:'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/25/16922d6d22ff1458~tplv-t2oaga2asx-no-mark:280:280:200:280.awebp',
            isPresell:true,
            name:'WebGL 入门与实践',
            desc:'介绍 WebGL 与 CSS 3D 开发的点点滴滴，详细阐述 3D 数学库的实现原理与使用，演示 3D 数学库对于 WebGL 开发和普通网页开发的重要作用，助力每个前端开发者轻松掌握 3D 开发的关键技术。',
            userImage:'https://p26-passport.byteacctimg.com/img/user-avatar/9074aebf26dc04ee212e60b3275c12f7~300x300.image',
            author:'lucefer',
            selfDesc:'某大型互联网公司前端工程师',
            price:'19.9',
            isBuy:false,
            chapterNum:33,
            purchaseNum:1434,
            readTime:160
        },
        {
            bookId:'000002',
            userId:'000002',
            img:'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/25/167e14942f2dcf44~tplv-t2oaga2asx-no-mark:280:280:200:280.awebp',
            isPresell:false,
            name:'前端面试之道',
            desc:'助你建立起完整的前端知识架构体系，探究知识的原理，深入了解大厂常考知识点',
            userImage:'https://p26-passport.byteacctimg.com/img/user-avatar/a386aa8db73c9678458ec34161472ca5~300x300.image',
            author:'yck',
            selfDesc:'宋小菜高级开发，GitHub 15K Star 项目作者，公众号前端真好玩主笔',
            price:'19.9',
            isBuy:true,
            chapterNum:36,
            purchaseNum:7044,
            readTime:160
        }
    ]
    
    return (
        <List
            size="large"
            dataSource={bookList}
            renderItem={item => (
                <List.Item className='bookList' >
                    <img alt='books' src={item.img} />
                    <div>
                        <div style={{color:'#000',fontSize:'20px',fontWeight:400}}>
                            {item.isPresell && <span className="presale">预售</span> }
                            <span className='bookName'>{item.name}</span>
                        </div>
                        <div className='bookDesc'>{item.desc}</div>
                        <div className='bookAuthor'>
                            {/* <NavLink to={`/user/:${item.userId}`}> */}
                                <Avatar size={26} src={item.userImage} />
                                <span style={{color:'#000',marginLeft:'5px'}}>{item.author}</span>
                            {/* </NavLink> */}
                            <span style={{color:'#71777c',margin:'0 10px',whiteSpace:'nowrap',overflow:'hidden'}}>{item.selfDesc}</span>
                        </div>
                        <div className='other'>
                            {item.isBuy?<span className='bought'>已购买</span>:<span className='price'>￥{item.price}</span>}
                            <span className='message'>{item.chapterNum}小节</span>
                            {item.isBuy && <span className='message'>阅读时长{item.readTime}分</span>}
                            <span className='message'>{item.purchaseNum}购买</span>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    );
}

export default BookList;