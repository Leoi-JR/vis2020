// jsx语法注意事项
import React, { Component } from 'react'

export default class App2 extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

import React, {Component} from "react"
import "./assets/css/style.css"
import Img from "./assets/images/qingle_avatar2.jpg"

export default class App2 extends Component{

    render(){   //实例方法

        return(
            <div>
                {/* 注释的写法      
                
                    1、行内样式的写法style={{color:"red", fontSize:30}}
                    2、class的写法携程className
                    3、图片需要引入之后才能使用  (后面会有其他方式去书写图片)
                    4、label标签的 for属性写成  htmlFor
                    5、！！！在JSX语法中书写js代码的话，需要加 { }
                */}
                <p style={{color:"red", fontSize:30}}>jsx语法注意事项</p>
                <p className="box">jsx语法注意事项</p>
                <img src={Img} alt="" width="100"/>
                <br/><br/>
                <label htmlFor="username">
                    用户名：<input type="text" id="username"/>
                </label>
                
            </div>
        )
    }
}