import React, { useState,useEffect } from 'react';
import {InfiniteLoader,List,AutoSizer,WindowScroller} from 'react-virtualized';
import { NavLink } from 'react-router-dom'
import { Spin } from 'antd';
import {getArticles} from '../../fake-api'




const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

export default function ArticleList(props){
    
    const {list, listCount ,setListCount, data,setData}=props
    // const [data,setData]=useState({
    //     loadedRowCount: 0,
    //     loadedRowsMap: {},
    //     loadingRowCount: 0,
    // })
    const _timeoutIdMap={}
    // console.log(data)
    const  _clearData =()=>{
        setData({
          loadedRowCount: 0,
          loadedRowsMap: {},
          loadingRowCount: 0,
        });
      }
    // console.log('data',data)
    // console.log('_timeoutIdMap',_timeoutIdMap)
    const  _isRowLoaded = ({index})=>{
        const {loadedRowsMap} = data;
        return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
    }
    const  _loadMoreRows = ({startIndex, stopIndex})=>{
        console.log('start',startIndex)
        console.log('stop',stopIndex)
        if(startIndex-listCount>10){
          setListCount(listCount+10)
        }
        const {loadedRowsMap, loadingRowCount} = data;
        const increment = stopIndex - startIndex + 1;
    
        for (var i = startIndex; i <= stopIndex; i++) {
          loadedRowsMap[i] = STATUS_LOADING;
        }
        let newData={...data}
        newData[loadingRowCount]=loadingRowCount + increment
        setData(newData);
    
        const timeoutId = setTimeout(() => {
          const {loadedRowCount, loadingRowCount} = data;
          delete _timeoutIdMap[timeoutId];
          for (var i = startIndex; i <= stopIndex; i++) {
            loadedRowsMap[i] = STATUS_LOADED;
          }
          let newData={...data}
          newData[loadingRowCount]=loadingRowCount - increment
          newData[loadedRowCount]=loadedRowCount + increment
          setData(newData);
          promiseResolver();
        }, 1000 + Math.round(Math.random() * 2000));
        _timeoutIdMap[timeoutId] = true;
        let promiseResolver;
        return new Promise(resolve => {
          promiseResolver = resolve;
        });
    }
    
    useEffect(()=>{
    console.log('初始化')
    return ()=>{
        Object.keys(_timeoutIdMap).forEach(timeoutId => {
        clearTimeout(timeoutId);
        });
        _clearData ()
        console.log('回收')
    }
    },[])
    const _rowRenderer=({index, key, style})=> {
        // const list =list;
        const {loadedRowsMap} = data;
        const row = list[index];
        let content;
        if (loadedRowsMap[index] === STATUS_LOADED) {
          content = row.author_user_info.user_name;
        } else {
          content = <Spin />
        }
        // console.log(list[index].article_info.article_id)
        return (
          <div  key={key} style={style}>
            {
                loadedRowsMap[index] === STATUS_LOADED
                ?<div className='article-container'>
                <div className='left-part'>
                    <section className="list-part1">
                        <ul>
                            <li key='list-part1-1'>{list[index].author_user_info.user_name}</li>
                            {list[index].time?<li key='list-part1-2'>{list[index].time}</li>:<li key='list-part1-2'>一年前</li>}
                            <li key='list-part1-3'>{list[index].category_info.first_category_name}.{list[index].category_info.second_category_name}</li>
                        </ul>
                    </section>
                    <section className="list-part2">
                        <NavLink to={`/post/${list[index].article_info.article_id}`}>{list[index].article_info.title}</NavLink>
                    </section>
                    <section className="list-part3 overflow-ellipsis" style={list[index].article_info.cover_image?{width:'580px'}:{width:'700px'}}>
                        {list[index].article_info.brief_content}
                    </section>
                    <section className="list-part4">
                        <div key='list-part4-1'>
                            <img src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png'/>
                            {list[index].article_info.view_count}
                        </div>
                        <div key='list-part4-2'>
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC'/>
                            {list[index].article_info.digg_count}
                        </div>
                        <div key='list-part4-3'>
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7VZNbtpQEJ55BlR15RvUOUHTG5ATJD1BQ9NU6gq8JKiKoyrJ0u2qUmkFOUGaE5TegJwg7gnqLRh7MvMwwiDbYHCUDZ9kHph5M9+bN38AO+zwzEAoiEv3xz4v/KAFiK/0S6J/qPCBoui+Y38cFlC3HgHH7Zk1FTXZUIt/mivEPVY6GFFw4difPNiWwNW3X+dLhj1iA3JqProXq7EQ8TVoz4A1147OWfPkAjYhcO1+twirt7FSEexPiG4+26cDyMEXt1s3AI7Z+LsZ4TEFB1newBzjf2B6Gi8kaqwyvEpHFgmVtjmxcTgm401R44I2G0M2KjpEV5W9KbG0koC+8znrt47d8GFDCAk+gJCQwNyvwqS1LLNwBbHbHuQ7G99bJ4rXgY4LRPGqz4T2koda8EAERl2zIrory7hArlBnDmdSDSbHyf8WrwDVNHKV0YOyQdGNXhAPMwlgnHKjaHQPJUNBOEjamL9fhI7SMt0/Q3uu08wjoJGWLk+FZQKefLyEwIKSETcxwTCbANFfWQLAIygZCFifrjkEQq73WgixCaUziHWi+p1JIC65Hj/mpdt1oCQkq2u7+f4uk4BAGo8minguFQy2hFRXvlonqTuXgK5aRLqHc/m8vXK7LdgCE6hYskolTGtqqWnYsU+dmITJrnCvv/7sOXKSDVCBiScrJgeVBHInIokDuYqEsB5KQqgMl7uk1A4DwrpCkFLLExL0x1HAWfXCr2H4X2TOWh+wEAGB7pBQcRITzgwymvmxEilcVtp+cX1cfs20Drv2VKyDSVUPI4Ij3lRPEfFJclzXEvIQlXhioZ4QYaNjn/Q3IrAMiQmDA0wB+QGEflr/ENK6xXOXFS8QRQdFx/YdnhyP1D0hcwr1KvEAAAAASUVORK5CYII='/>
                            {list[index].article_info.comment_count}
                        </div>
                    </section>
                </div>
                {
                    list[index].article_info.cover_image 
                    ?<img className='right-img' alt="logo" src={list[index].article_info.cover_image }></img>
                    :''
                }
                </div>
                :<Spin />
            }
          </div>
        );
      }

    
    const showArticleInfo=(id)=>{
        console.log(`文章id值:${id}`);
        window.location.href='/post/'+id;
    }
    
    return (
        <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <InfiniteLoader
                isRowLoaded={_isRowLoaded}
                loadMoreRows={_loadMoreRows}
                rowCount={list.length||750}>
                {({onRowsRendered, registerChild}) => (
                <AutoSizer disableHeight>
                    {({width}) => (
                    <List
                        autoHeight
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}

                        ref={registerChild}
                        height={800}
                        onRowsRendered={onRowsRendered}
                        rowCount={listCount}
                        rowHeight={150}
                        rowRenderer={_rowRenderer}
                        width={width}
                    />
                    )}
                </AutoSizer>
                )}
            </InfiniteLoader>
            )}
        </WindowScroller>
        
      );
}



/* <WindowScroller>
{({ height, isScrolling, onChildScroll, scrollTop }) => (
<List
    autoHeight
    height={height}
    isScrolling={isScrolling}
    onScroll={onChildScroll}
    rowCount={list.length}
    rowHeight={150}
    rowRenderer={rowRenderer}
    scrollTop={scrollTop}
    width={700}
/>
)}
</WindowScroller> */

/* <InfiniteLoader
isRowLoaded={_isRowLoaded}
loadMoreRows={_loadMoreRows}
rowCount={list.length||750}>
{({onRowsRendered, registerChild}) => (
<AutoSizer disableHeight>
    {({width}) => (
    <List
        ref={registerChild}
        height={800}
        onRowsRendered={onRowsRendered}
        rowCount={n}
        rowHeight={150}
        rowRenderer={_rowRenderer}
        width={width}
    />
    )}
</AutoSizer>
)}
</InfiniteLoader> */

/* <List
width={700}
height={500}
rowCount={list.length}
rowHeight={150}
rowRenderer={rowRenderer}
/> */

/* <AutoSizer>
{({height, width}) => (

)}
</AutoSizer> */

//根据sort信息获取文章列表数据
// const {sortInfo}=props
// const [list,setList]=useState([])
// useEffect(async ()=>{
//     const {categoryId,sortBy}=sortInfo
//     await getArticles(categoryId,sortBy,0,720).then((res)=>{
//         setList(res.data.articles)
//     })
// },[sortInfo])


/* <ul style={{position: 'relative'}}>
{updatedList.map((item, index) => {
    const top = (height * (index + start)) + 'px'; // 基于相对 & 绝对定位 计算
    const refVal = getReference(index, index === lastIndex); // map循环中赋予头尾ref
    const id = index === 0 ? 'top' : (index === lastIndex ? 'bottom' : ''); // 绑ID
    return (
    <li className="li-card" key={item.id} style={{top}} ref={refVal} id={id}>
        <article>
                <section className="list-part1">
                    <ul>
                        <li key='list-part1-1'>{item.author_user_info.user_name}</li>
                        {item.time?<li key='list-part1-2'>{item.time}</li>:<li key='list-part1-2'>一年前</li>}
                        <li key='list-part1-3'>{item.category_info.first_category_name}.{item.category_info.second_category_name}</li>
                    </ul>
                </section>
                <section className="list-part2">
                    <NavLink to={`/post/:articleId`}>{item.article_info.title}</NavLink>
                </section>
                <section className="list-part3 overflow-ellipsis" style={item.article_info.cover_image?{width:'580px'}:{width:'700px'}}>
                    {item.article_info.brief_content}
                </section>
                <section className="list-part4">
                    <div key='list-part4-1'>
                        <img src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png'/>
                        {item.article_info.view_count}
                    </div>
                    <div key='list-part4-2'>
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC'/>
                        {item.article_info.digg_count}
                    </div>
                    <div key='list-part4-3'>
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7VZNbtpQEJ55BlR15RvUOUHTG5ATJD1BQ9NU6gq8JKiKoyrJ0u2qUmkFOUGaE5TegJwg7gnqLRh7MvMwwiDbYHCUDZ9kHph5M9+bN38AO+zwzEAoiEv3xz4v/KAFiK/0S6J/qPCBoui+Y38cFlC3HgHH7Zk1FTXZUIt/mivEPVY6GFFw4difPNiWwNW3X+dLhj1iA3JqProXq7EQ8TVoz4A1147OWfPkAjYhcO1+twirt7FSEexPiG4+26cDyMEXt1s3AI7Z+LsZ4TEFB1newBzjf2B6Gi8kaqwyvEpHFgmVtjmxcTgm401R44I2G0M2KjpEV5W9KbG0koC+8znrt47d8GFDCAk+gJCQwNyvwqS1LLNwBbHbHuQ7G99bJ4rXgY4LRPGqz4T2koda8EAERl2zIrory7hArlBnDmdSDSbHyf8WrwDVNHKV0YOyQdGNXhAPMwlgnHKjaHQPJUNBOEjamL9fhI7SMt0/Q3uu08wjoJGWLk+FZQKefLyEwIKSETcxwTCbANFfWQLAIygZCFifrjkEQq73WgixCaUziHWi+p1JIC65Hj/mpdt1oCQkq2u7+f4uk4BAGo8minguFQy2hFRXvlonqTuXgK5aRLqHc/m8vXK7LdgCE6hYskolTGtqqWnYsU+dmITJrnCvv/7sOXKSDVCBiScrJgeVBHInIokDuYqEsB5KQqgMl7uk1A4DwrpCkFLLExL0x1HAWfXCr2H4X2TOWh+wEAGB7pBQcRITzgwymvmxEilcVtp+cX1cfs20Drv2VKyDSVUPI4Ij3lRPEfFJclzXEvIQlXhioZ4QYaNjn/Q3IrAMiQmDA0wB+QGEflr/ENK6xXOXFS8QRQdFx/YdnhyP1D0hcwr1KvEAAAAASUVORK5CYII='/>
                        {item.article_info.comment_count}
                    </div>
                </section>
            </article>
            {
                item.article_info.cover_image 
                ?<img width="120" height="80" alt="logo" src={item.article_info.cover_image }></img>
                :''
            }
    </li>);
})}
</ul> */