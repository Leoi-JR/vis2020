// tab栏小案例
import React, { Component } from 'react'
import "./assets/css/tab.css"
export default class App6 extends Component {

    constructor(props){

        super(props)

        this.state = {  //这里state的数据，是组件的内部数据
            num:1
        }
    }

    handleClick(number){
        
        this.setState({
            num:number
        })
        
    }
    render() {
        return (
            <div className="tab_con">
                <div className="tab_btns">
                    <input type="button"  className={ this.state.num===1?"active":""} value="按钮1" onClick={this.handleClick.bind(this, 1)}/>
                    <input type="button"  className={ this.state.num===2?"active":""} value="按钮2" onClick={this.handleClick.bind(this, 2)}/>
                    <input type="button"  className={ this.state.num===3?"active":""} value="按钮3" onClick={this.handleClick.bind(this, 3)}/>
                </div>
                <div className="tab_cons">
                    <div className={this.state.num===1?"current":""} >按钮1对应的内容</div>
                    <div className={this.state.num===2?"current":""} >按钮2对应的内容</div>
                    <div className={this.state.num===3?"current":""}>按钮3对应的内容</div>
                </div>
            </div>
        )
    }
}
