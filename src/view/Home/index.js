import React, {  useEffect,useState } from 'react';
import {Outlet,useLocation,useParams} from 'react-router-dom'
import { Affix,Row, Col } from 'antd';
import HomeNav from './HomeNav';
import HomeSecondNav from './HomeSecondNav';
import HomeThirdNav from './HomeThirdNav';
import SideNav from './SideNav';
import {getCategories,getArticles} from '../../fake-api'
import './index.less';

export default function Home(props){
    const params=useParams()
    const {tag1,tag2}=params
    const {setsortInfo,sortInfo, setArticleList ,setListCount ,setData}=props
    const goodAuthor=[
        {
            "title": "阿里云云栖号",
            "desc":"技术 @ 阿里云计算有限公司 ",
            "userImage":"https://p3-passport.byteacctimg.com/img/user-avatar/9ff6df2fe3771d70ea5066c7f7e897e6~300x300.image",
            "rank":'//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg',
            "id":"0001"
        },
        {
            "title": "北斗落凡尘",
            "desc":"前端刨食",
            "userImage":"https://p6-passport.byteacctimg.com/img/user-avatar/293001fc982d759a5d9d3448408cd6f4~300x300.image",
            "rank":'//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/2c3fafd535a0625b44a5a57f9f536d77.svg',
            "id":"0002"
        },
        {
            "title": "B站_江辰",
            "desc":"前端 @ B站 ",
            "userImage":"https://p6-passport.byteacctimg.com/img/user-avatar/d50f98a57ec956717d448dacde987aa5~300x300.image",
            "rank":'//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg',
            "id":"0003"
        }
    ]
    const recommendBooks=[
        {
            "id":"book0001",
            "bookImage":"//user-gold-cdn.xitu.io/2018/6/11/163ee322e6d2c827?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1",
            "title":"深入理解 RPC : 基于 Python 自建分布式高并发 RPC 服务",
            "sellNum":100
        },
        {
            "id":"book0002",
            "bookImage":"//user-gold-cdn.xitu.io/2018/7/30/164ea7de07b7f79e?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1",
            "title":"Redis 深度历险：核心原理与应用实践",
            "sellNum":50
        }
    ]
    const linkList=[
        {
            "id":"link001",
            "linkImage":"//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-tutu.d58819c.png",
            "title":"稀土掘金漫游指南"
        },
        {
            "id":"link002",
            "linkImage":"//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-extension-icon.4b79fb4.png",
            "title":"安装掘金浏览器插件"
        },
        {
            "id":"link003",
            "linkImage":"//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-miner.b78347c.png",
            "title":"前往掘金翻译计划"
        }
    ]
    const [firstTags,setFirstTags]=useState([])
    const [secondTags,setSecondTags]=useState([])
    const pathToTags={
        'comprehensive':'推荐',
        'backend':'后端',
        'frontend':'前端',
        'Android':'Android',
        'iOS':'iOS'
    }
    useEffect(()=>{
        getCategories().then((res)=>{
            const categories=res.data.categories
            //根据路径调整sortInfo
            let categorie
            //一级路径
            if(!tag1){
                categorie=categories[0]
                setsortInfo({
                    categoryId:categorie.category_id,
                    sortBy:'hot'
                })
            }//二级路径
            else if(!tag2){
                const curCategories=pathToTags[tag1]
                categorie=categories.find((item)=>item.category_name===curCategories)
                setsortInfo({
                    categoryId:categorie.category_id,
                    sortBy:'hot'
                })
            }//三级路径
            else if(tag2){
                const curCategories=pathToTags[tag1]
                categorie=categories.find((item)=>item.category_name===curCategories)
                const secondCategorie=categorie.children.find((item)=>item.category_name===tag2)
                setsortInfo({
                    categoryId:secondCategorie.category_id,
                    sortBy:'hot'
                })
            }
            
            // 设置第一标签
            setFirstTags(categories)
            //设置第二标签
            if(categorie.children){
                setSecondTags(categorie.children)
            }
        })
    },[])
    useEffect(()=>{
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        
        const curCategories=pathToTags[tag1]
        const categorie=firstTags.find((item)=>item.category_name===curCategories)
        if(categorie&&categorie.children){
            setSecondTags(categorie.children)
        }
        else{
            setSecondTags([])
        }
        const {categoryId,sortBy}=sortInfo
        getArticles(categoryId,sortBy,0,720).then((res)=>{
            setArticleList(res.data.articles)

            // 切换标签时要对文章列表初始化
            setListCount(20)
            setData({
                loadedRowCount: 0,
                loadedRowsMap: {0: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2,},
                loadingRowCount: 0,
                // loadedRowsMap: {}
            })
        })

        
    },[sortInfo])
    return (
        <div className='home-container'>
            <Affix offsetTop={60}>
                <div className="home-nav">
                    <nav>
                        <HomeNav tags={firstTags} setsortInfo={props.setsortInfo} />
                        <a href="/">标签管理</a>
                    </nav>
                </div>
            </Affix>
            <div className="ct marginTop20">
                <Row gutter={14}>
                    <Col className="gutter-row" span={18}>
                        {secondTags.length
                        ?<HomeSecondNav 
                        tags={[{category_id:sortInfo.categoryId,category_name:'全部'},...secondTags]} 
                        sortInfo={sortInfo} 
                        setsortInfo={setsortInfo} />
                        :''}
                        <HomeThirdNav setsortInfo={setsortInfo} sortInfo={sortInfo} />
                        <Outlet/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <SideNav goodAuthor={goodAuthor} recommendBooks={recommendBooks} linkList={linkList}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}