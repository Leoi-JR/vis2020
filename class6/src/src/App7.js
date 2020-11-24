// this.props的使用

import React, { Component } from 'react'


class Header extends Component{   // 子组件

    static defaultProps = {   // 给props属性添加默认值
        bgc:"skyblue",
        title:"默认标题"
    }
    render(){
        return(
            <header style={{ width:"100%", height:40, lineHeight:"40px", backgroundColor:this.props.bgc}}>
                {/* this.props 要获取调用这个组件的时候的标签属性 */}
                {this.props.title}

                {/* 特殊写法： 专门获取子组件被调用的时候，写成双标签时，标签中的子元素 */}
                {this.props.children}

            </header>
        )
    }
}


export default class App7 extends Component {   // 父组件
    constructor(props){
        super(props)

        this.state = {
            title:"首页标题"
        }
    }

    render() {
        return (
            <div>
                <Header title={this.state.title} bgc="#cff"/>
                <Header title="列表页标题" />
                <Header>这是子元素</Header>
            </div>
        )
    }
}
