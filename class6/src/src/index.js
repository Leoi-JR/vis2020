//index.js就是react项目的入口文件(名字不要改变)

//1、引入核心的模块
import React from "react"
import ReactDOM from "react-dom"
import App from "./App8"

//2、把对应的内容渲染到id为root的标签上

// let docDom = document.createElement("div")    // 原生DOM
// let reactDom = React.createElement("div", {name:"reactDom"}, "内部文本")   // 虚拟DOM

// let docDomNum = 0
// for(const i in docDom){  // 遍历原生DOM对象的属性
//     docDomNum++;
// }

// let reactDomNum = 0
// for(const i in reactDom){  // 遍历React的DOM对象的属性
//     reactDomNum++;
// }

// console.log("原生dom对象的属性个数为：", docDomNum)
// console.log("react的dom对象的属性个数为：", reactDomNum)
// 虚拟dom不是html
// 虚拟dom对象比原生dom对象更简洁
// 浏览器在解析虚拟dom的时候回更快，更高效


// ReactDOM.render(参数1，参数2)  
// 参数1 作为root内部内容，参数2 渲染到/public/index.html中的哪个标签
ReactDOM.render(
    <App />,    
    document.getElementById("root")
)

// ReactDOM.render(
//     React.createElement("div", null, "Hello React2"),
//     document.getElementById("root")
// )