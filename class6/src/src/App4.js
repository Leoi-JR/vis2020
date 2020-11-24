// 事件的使用

import React,{Component} from "react"

// 基本格式
// export default class App4 extends Component{


//     handleClick(){
//         console.log("点击了按钮！");
//     }

//     render(){
//         return(
//             <div>
//                 <button onClick={this.handleClick}>按钮</button>
//             </div>
//         )
//     }
// }

export default class App4 extends Component{

    constructor(props){
        super(props)

        //定义一个组件的状态数据
        this.state = {
            num:20
        }
    }

    handleClick(){
        // console.log("点击了按钮！");
        // console.log(num);
        
        // 修改state状态数据的格式：
        this.setState({
            num:this.state.num+1
        })

        // this.state.num++;
        // console.log(this.state.num);
        
    }

    render(){
        return(
            <div>
                <p>{ this.state.num }</p>
                <button onClick={this.handleClick.bind(this)}>按钮</button>
                {/* <button onClick={()=>this.handleClick()}>按钮</button> */}
            </div>
        )
    }
}