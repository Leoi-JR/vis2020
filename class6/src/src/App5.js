// 双向数据绑定
import React, { Component } from 'react'

export default class App5 extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            val: "初始值"
        }
    }

    handleChange(e){
        console.log(e.target);
        
        // 需要改变val的值，变成用户输入的值
        this.setState({
            val:e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.val} onChange={this.handleChange.bind(this)}/>
                <p>{this.state.val}</p>
            </div>
        )
    }
}
