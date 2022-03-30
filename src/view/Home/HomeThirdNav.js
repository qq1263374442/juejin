
export default function HomeThirdNav(props){
    const tags=['热门','最新']
    const tagsToSort={'热门':'hot','最新':'new'}
    const {setsortInfo,sortInfo}=props
    const handleClick=(i)=>{
        let newdata={...sortInfo}
        newdata.sortBy=tagsToSort[tags[i]]
        setsortInfo(newdata)
        // setsortInfo({
        //     categoryId:tags[i].category_id,
        //     sortBy:'hot'
        // })
        //tagsToSort[tags[index]]
    }
    return (
        <div className="thirdNav" >
            <ul>
                {tags.map((item,index)=>{
                    return  (<li key={index} className={tagsToSort[tags[index]]===sortInfo.sortBy?'active':''} onClick={()=>{handleClick(index)}}>
                                {item}
                            </li>)
                })}
            </ul>
        </div>
    );
}