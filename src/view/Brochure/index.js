import React, { Component, useState } from 'react';
import {Route,Routes,Outlet} from 'react-router-dom'
import { Affix,Row, Col } from 'antd';
import TopNav from './TopNav';
import BookList from './BookList';
import Aside from './Aside.js';
import './index.less';

export default function Brochure(props){
    
    return (
        <div className="brochure-container">
            <Affix offsetTop={60}>
                <div className="brochure-nav">
                    <nav>
                        <TopNav/>
                    </nav>
                </div>
            </Affix>
            <div className="ct marginTop20">
                <Row gutter={14}>
                    <Col className="gutter-row" span={18}>
                        <Outlet />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Aside />
                    </Col>
                </Row>
            </div>
        </div>
    );
}