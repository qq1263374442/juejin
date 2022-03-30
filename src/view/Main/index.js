import { Routes, Route,Outlet } from 'react-router-dom';
import Home from '../Home/index';
import Post from '../Post/index'
import Brochure from '../Brochure/index' 
import BookList from '../Brochure/BookList';
import ArticleList from '../Home/ArticleList';
import { useEffect, useState } from 'react';


export default function Main(props){
    const init={
        categoryId:0,
        sortBy:'hot'
    }
    const [sortInfo,setsortInfo]=useState(init)
    const [articleList,setArticleList]=useState([])
    const [listCount,setListCount]=useState(20)
    const [data,setData]=useState({
        loadedRowCount: 0,
        loadedRowsMap: {},
        loadingRowCount: 0,
    })

    return (
        <div style={{backgroundColor:'rgb(244, 245, 245)'}}>
            <Routes>
                <Route path='/books' element={<Brochure />}>
                    <Route path=':tag' element={<BookList/>}></Route>
                    <Route path={''} element={<BookList />}></Route>
                </Route>
                <Route exact path='/' element={<Home setsortInfo={setsortInfo} sortInfo={sortInfo} setArticleList={setArticleList} setListCount={setListCount} setData={setData} />}>
                    <Route path='' element={<ArticleList sortInfo={sortInfo} list={articleList||[]} listCount={listCount} setListCount={setListCount} data={data} setData={setData} />}></Route>
                    <Route path=':tag1' element={<ArticleList sortInfo={sortInfo} list={articleList||[]} listCount={listCount} setListCount={setListCount} data={data} setData={setData} />}></Route>
                    <Route path=':tag1/:tag2' element={<ArticleList sortInfo={sortInfo} list={articleList||[]} listCount={listCount} setListCount={setListCount} data={data} setData={setData} />}></Route>
                </Route>
                <Route path='post/:articleId' element={<Post props={props} />}/>
            </Routes>
        </div>
    );
}