import { useLocation ,Link} from 'react-router-dom';

function Nav(){
    const location=useLocation()
    const navs=[
        {
            text:'首页',
            isActived:true,
            path:'/'
        },
        {
            text:'课程',
            isActived:false,
            path:'/books'
        },
    ]
    let path=location.pathname.split('/')
    let activeIndex=0
    if(path[1]=='books')activeIndex=1
    return (
        <ul>
            {
            navs.map((item,index)=>{
                return  <li key={item.path} className={activeIndex===index?'activeLi':''} >
                            {/* <a href={item.path}>{item.text}</a> */}
                            <Link to={item.path}>{item.text}</Link>
                        </li>
            })}
        </ul>
    );
}

export default Nav;