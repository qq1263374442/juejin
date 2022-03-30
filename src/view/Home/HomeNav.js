import { useLocation,NavLink} from 'react-router-dom'


export default function HomeNav(props){
    const location=useLocation()
    const {tags,setsortInfo }=props
    const tagsToPath={
        '推荐':'comprehensive',
        '后端':'backend',
        '前端':'frontend',
        'Android':'Android',
        'iOS':'iOS'
    }
    const updatedList=(id)=>{
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setsortInfo({
            categoryId:id,
            sortBy:'hot'
        })
    }

    return (
        <ul>
            {tags.map((item,index)=>{
                const name=item.category_name
                let path1=location.pathname.split('/')[1]
                if(!path1)path1='comprehensive'
                return <li key={tagsToPath[name]} onClick={()=>{updatedList(item.category_id)}} >
                    {/* <a 
                    href={`/${tagsToPath[name]}`}  
                    style={path1===tagsToPath[name]?{color:'#007fff'}:{color:'#71777c'}} 
                    >
                        {name}
                    </a> */}

                    <NavLink 
                    to={`/${tagsToPath[name]}`}  
                    style={path1===tagsToPath[name]?{color:'#007fff'}:{color:'#71777c'}} >
                        {name}
                    </NavLink>
                </li>
            })}
        </ul>
    );
}