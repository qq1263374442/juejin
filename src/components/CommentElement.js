import React from 'react';
import { List, Avatar } from 'antd';
import timeUtil from '../utils/setTime'
import {
    LikeOutlined,
    MessageOutlined
  } from '@ant-design/icons';

//React.memo新版本中用作HOC,类似于React.pureComponent,优化性能
const CommentElement=React.memo(function({commentList}){
    const IconText = ({ type, text }) => (
        <span>
            Icon
            {text}
        </span>
    );
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={commentList}
                renderItem={item => (
                <List.Item
                    key={item.comment_id}
                    actions={[<span>{timeUtil.getTimeAgo(item.comment_info.ctime)}</span>,
                            <span><LikeOutlined/>{item.comment_info.digg_count}</span>,
                            <span><MessageOutlined/>{item.comment_info.reply_count}</span>]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.user_info.avatar_large} />}
                    title={<div>{item.user_info.user_name}</div>}
                    description={item.user_info.job_title}
                    />
                    {item.comment_info.comment_content}
                </List.Item>
                )}
            />
        </div>
    );
})

export default CommentElement;