import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card } from 'antd';

import './index.less';
function DownloadApp(){
    return (
        <Card style={{ width: '100%',marginTop:'20px' }} className="download-card" bodyStyle={{padding:'15px'}}>
            <NavLink to='/app'>
                <img alt='qrcode' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYAQMAAACEqAqfAAAABlBMVEX///8dffqGxf/kAAAC2klEQVR42u3dQXKcMBCFYU2x8DJHyFHmaPhoHIUjZOkFFRKUFz2LRjVjyiKuyv9WeNTz4RWoGqFJhBBC/pd8W3f5sX16345efx/c1nUutRpM6WXd5Q0LCwsL62pLg0tKowYfWcnxqT14l6VCWa/JGbGwsLCw+lnfy1U7XO91PCVl2I6zpS8tWFhYWFgXWkP+Q5YybcdnrSXl3CpLwcLCwsI6YeVjWYoKp/OWy7GwsLCw/oHl7HvuspzYg8HCwsLC6mfViX0TX9I1OD35XNTl7udgYWFhYX2uVcpVcWzFxNuDLc/vY7CwsLCw3q/bnqulfj+LlQcdW8WdP2otbtbkQSwsLCysSyy1War2tywv+R7eX+N1/OekatZgYWFhYXWxdEmXVUXPMufKcoIVe+6KSmwpgwcdLCwsLKwDa7RSWcpb40T72PK9Q6d2z133C32QsLCwsLB6W9XrN2HtigaTrL+FZfLvQSwsLCysnlZcE6jM+wm7rNXNGlv1vaP+H29YWFhYWOctJ75LGSwnWK0pvMuP98ZSIRYWFhbW51tVW/2l3DuU+FxUa1d0UjdosLCwsLC6W81MWl9Yvr8qturI8qldnmSFG4uOsbCwsLCa601KebhGO8/0TRRZ7r+rwRP7OXcsLCwsrJ6WovJw79CEXYWH7/yMWFhYWFgdrZhFlmPLDZZg5VMo3pZQg6Flky27ChYWFhZWsNrJ1hoKw5zcVliruOvnYGFhYWFdbcVU+4DnaH7vDQnjXilYWFhYWB2so31h4/4mTvythkeWypMtze+xsLCwsM5YOU9a7T2oirUkZzjar7a8sI+FhYWFJSv+5tkDa42Z9V5myzrK2LLyIBYWFhbWdZb75PXmJxoML9ZjYWFhYV1qObOtkKesRz2YEhViYWFhYbWt2Nv+yB5UjqwpPiiNk3//KD0WFhYWVierivvkHoz7m6zVJuFbsLCwsLC+uEUIIeSL5heoDbgJUHdTigAAAABJRU5ErkJggg==' />
                <div>
                    <div className="headline">下载掘金客户端</div>
                    <div className="desc">一个帮助开发者成长的社区</div>
                </div>
            </NavLink>
        </Card>
    )
}

export default DownloadApp;