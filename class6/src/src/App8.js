import React, { Component } from 'react'

export default class App8 extends Component {

    constructor(props){
        super(props)

        this.state = {
            list: [{id:1, value:"值1"},{id:2, value:"值2"},{id:3, value:"值3"}]
        }
    }

    handleClick(){

        this.setState({
            list: [{id:4, value:"值4"},{id:1, value:"值1"},{id:2, value:"值2"},{id:3, value:"值3"}]
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>按钮</button>
                <ul>
                    {
                        this.state.list.map((v, k)=>{
                            return (
                                // key的值，在项目中一般设置为数据的id值，
                                // key属性的作用：有利于提高更新效率，减少不必要的DOM操作。
                                <li key={v.id}>   
                                    {v.value}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
