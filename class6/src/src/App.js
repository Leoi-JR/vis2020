// 组件化开发  (react项目用es6模块化规范来书写)

// 1、引入核心模块
import React, {Component} from "react"

// 2、定义一个组件(定义组件并且导出这个组件)
export default class App extends Component{

    render(){   //渲染
        return (
            <div>
                <p>第一个组件</p>
                <p>第一个组件</p>
                <p>第一个组件</p>
                <p>第一个组件</p>
            </div>
        )
    }
}

// 3、导出组件
// export default App