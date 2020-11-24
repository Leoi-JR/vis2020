## 一、React简介



React 是一个用于构建用户界面的 JavaScript 库，它是 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。React 主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。由于拥有较高的性能，且代码逻辑非常简单，越来越多的人已开始关注和使用它。 

中文官网：https://react.docschina.org

Node.js安装：[Node.js](https://nodejs.org/en/)

React教程示例：[入门教程: 认识 React – React (reactjs.org)](https://zh-hans.reactjs.org/tutorial/tutorial.html)

Node.js安装配置：[Node.js 安装配置 | 菜鸟教程 (runoob.com)](https://www.runoob.com/nodejs/nodejs-install-setup.html)

参考学习视频：[2020最新版-React实战教程_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1YC4y1h7JC/?p=5)

## 二、React特点



**1、声明式设计** 

​	react是面向数据编程，不需要直接去控制dom，你只要把数据操作好，react自己会去帮你操作dom，可以节省很多操作dom的代码。这就是声明式开发。

**2、使用JSX语法** 

​	 JSX 是 JavaScript 语法的扩展。React 开发大部分使用 JSX 语法（在JSX中可以将HTML于JS混写）。

**3、灵活**

​	react所控制的dom就是id为root的dom，页面上的其他dom元素你页可以使用jq等其他框架 。可以和其他库并存。

**4、使用虚拟DOM、高效**

​	虚拟DOM其实质是一个JavaScript对象，当数据和状态发生了变化，都会被自动高效的同步到虚拟DOM中，最后再将仅变化的部分同步到DOM中（不需要整个DOM树重新渲染）。

**5、组件化开发**

​	通过 React 构建组件，使得代码更加容易得到复用和维护，能够很好的应用在大项目的开发中。 

**6、单向数据流**

​	react是单向数据流，父组件传递给子组件的数据，子组件能够使用，但是不能直接通过this.props修改。 这样让数据清晰代码容易维护。



## 三、React脚手架安装

安装好node,js和npm之后。

进入cmd命令行：

`npm config set registry https://registry.npm.taobao.org`

`npm install create-react-app -g`

## 四、创建第一个React项目



4.1、在cmd命令行进入自己预先创建好的文件夹

4.2、构建一个名为demo的项目：

create-react-app demo

![image-20201122004849716](pic\image-20201122004849716.png)

4.3、进入文件夹，并且跑起来

`cd demo`

npm start

![image-20201122005059402](pic\image-20201122005059402.png)

跑起来之后的界面

![image-20201122005140629](pic\image-20201122005140629.png)

## 五、hello_world程序编写

1、删除在src目录下所有文件

2、src目录下新建index.js文件作为入口文件

```jsx
//1、引入React两个核心模块
import React from 'react';
import ReactDOM from 'react-dom';


//2、通过JSX语法将组件/标签渲染到指定标签上
ReactDOM.render(
    <div>
        hello world!
    </div>
    , document.getElementById('root'));
```

ReactDOM.render(参数1，参数2)

参数1 是JSX语法的标签/组件

参数2 是要把参数1这个标签渲染到的位置

## 六、VSCode中JSX的编写优化

在vscode中按下F1，直接搜索 settings，进入 `settings.json` ：

添加： 

```json
"emmet.includeLanguages": {
        "javascript": "javascriptreact"
},
"emmet.triggerExpansionOnTab": true,

 "editor.mouseWheelZoom":true
```

"emmet.includeLanguages": {

​        "javascript": "javascriptreact" 

}

设置后就可以通过 标签名+Tab 键快速码出标签

## 七、组件化开发

在React的项目中，都是使用组件化开发的模式，所以，我们可以把刚才的hello world的div定义为一个组件：

定义组件分为3步：

​	1、导入React核心模块 

​	2、定义组件类，组件首字母要大写<App />

​	3、导出组件

在src目录下新建App.js文件：

```jsx
//1、导入React核心模块
import React from 'react'

//2、定义组件类、继承于React.Component
class Hello extends React.Component{   //类
    render(){     //函数
        return (   //返回值
            <div>
                hello world !!! 我是组件222
            </div>
        )
    }
}


//3、导出组件
export default Hello
```

在需要引入该组件的index.js中，导入，就可以直接使用这个组件了：

```jsx
//import 组件名 from '文件路径'
import Hello from './App'   //1、导入Hello组件  (首字母必须大写)

ReactDOM.render(
    <Hello />        // 2、使用Hello组件  (首字母必须大写)   
    , document.getElementById('root'));

//注意：Hello是组件名，在使用的时候就应该写JSX标签写法，而不能直接写Hello
```

**！！注意：**

**1、定义组件的时候，return 后面只能有一个根标签，不能有多个，但这个标签内部可以有其他多个标签**

**2、使用组件的时候，首字母必须大写**

## 八、JSX语法糖

​	React 使用 JSX 来替代常规的 JavaScript。JSX 是一个看起来很像 XML 的 JavaScript 语法扩展，在React中会被babel编译为JavaScript。 

#### 8.1、JSX的特点

- JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
- 它是类型安全的，在编译过程中就能发现错误。
- 使用 JSX 编写模板更加简单快速。

#### 8.2、JSX几个注意的格式：

1、React的JSX是使用大写和小写字母来区分本地组件和HTML组件

（如：html就用  div p  h1 ， 组件就用  MyButton    App    Home    List等 ）

2、JSX和html的标签属性的区别

| HTML标签属性 | JSX                                  | 原因                      |
| ------------ | ------------------------------------ | ------------------------- |
| for          | htmlFor                              | for在JS中为for循环关键字  |
| class        | className                            | class在JS中为声明类关键字 |
| style        | 需使用JS对象(使用双花括号--**{{}}**) |                           |

组件中：

		   <div>
	            <p  style={{backgroundColor: "#ccc"}}>
	                hello world !!! 我是组件2223
	            </p>
	            
	            <img src={MyImg} alt="" className="img1" /> <br/>
	            <label htmlFor="username">用户名：
	                <input type="text" id="username"/>
	            </label>
	            
	        </div>
#### 8.3、React的JSX创建出来的是虚拟DOM，而不是HTML

在index.js中：

```jsx
const DomEl = document.createElement("div")
const ReactEl = React.createElement("div",null,"hello");   //虚拟DOM   <div>hello</div>

let Dnum=0
let Rnum=0
for (const i in ReactEl){
    Rnum++
}
for (const i in DomEl){
    Dnum++
}
console.log("ReactDom对象的属性总个数：", Rnum)   // 7
console.log("传统Dom对象的属性总个数：", Dnum)   // 240+
//小结：
//JSX不是HTML
//JSX创建的是ReactDOM(虚拟DOM)
//JSX中的<div>hello</div>  等同于 React.createElement("div",null,"hello");

//！！！以上代码只做了解，只记住结论就行
```

#### 8.4、JSX变量引用、三目运算符、for循环

在JSX中，想要调用变量，需要在return中直接使用单花括号--**{}**调用 

index.js中：

```jsx
//第四节：JSX中变量引用、三目运算符、for循环的使用
import App3 from './App3'

//2、通过JSX语法将标签/组件渲染到指定标签上
ReactDOM.render(
    <App3 />
    , document.getElementById('root'));
```

App3.js中

```jsx
import React, { Component } from 'react'

let name = "小明", num1=20, num2=30, arr=[1, 2, 3, 4, 5]

export default class App3 extends Component {
    render() {
        return (
            <div>
                {/* 这是注释的格式 */}
                {/* JSX中引用变量需要加单花括号 */}
                <p>{name}</p>
               
                {/* 三目运算符的使用 */}
                <p>num1和num2中比较大的是：{num1>num2? num1: num2}</p>


                {/* for循环的使用 */}
                <ul>
                    {/* 数组名.map(函数) */}
                    {
                        //格式1：
                        arr.map((v,k)=>(
                                <li key={k}>{v}</li>
                            )
                        )
                    }
                    {
                        //格式2：可以把上面的大括号和return换成小括号
                        arr.map((v,k)=>{    
                                return <li key={k}>{v}</li>
                            }
                        )
                    }
                </ul>
                
            </div>
        )
    }
}
```

## 九、VSCode中，代码片段扩展的安装

在扩展搜索栏中搜索react，选择下图的扩展进行安装

安装后，通过  rcc+回车 ，得到组件的代码片段， clg+回车 快速得到console.log()代码

## 十、事件的使用

App4.js中:

```jsx
//事件讲解

import React, { Component } from 'react'

//1、实现点击弹框效果(事件基本格式)
// export default class App4 extends Component {
//     handleClick(e){  
//         alert(132456)
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.handleClick}>按钮</button>
//             </div>
//         )
//     }
// }


//2、实现累加的功能 (状态的使用1)
// export default class App4 extends Component {
//     constructor(props){
//         super(props)

//         this.state = {
//             num: 20
//         }
//     }

//     handleClick(){
//         //1、事件中，this的指向，在经过绑定后，指向这个App4组件
//         //2、通过调用this.setState()方法来修改this.state里面的数据
//         this.setState({
//             num: this.state.num+1
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <p>{this.state.num}</p>
//                 <button onClick={this.handleClick.bind(this)}>点击增加1</button>

//                 {/* 下面使用箭头函数可以不用绑定this */}
//                 {/* <button onClick={() => this.handleClick()}>点击增加1</button> */}
//             </div>
//         )
//     }
// }


//3、实现双向数据绑定 (状态的使用2)
export default class App4 extends Component {
    constructor(props){
        super(props)

        this.state = {
            str1: "123"
        }
    }
    handleChange(e){
        console.log(e)
        console.log(e.target)
        this.setState({
            str1: e.target.value
        })
    }
    
    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange.bind(this)}/>
                <p>{this.state.str1}</p>
            </div>
        )
    }
}
```

## 十一、组件状态this.state的基本使用

组件状态this.state的基本使用总结：

```jsx
/*
在组件内部：

定义状态数据：
    constructor(props){
        super(props)

        this.state = {
            num: 20
        }
    }

使用状态数据：
    return (
            <div>
                <p>{this.state.num}</p>
            </div>
        )


修改状态数据：
        1、通过事件或者定时器触发：
        <button onClick={this.handleClick.bind(this)}>点击增加1</button>
        2、在事件函数中：
            this.setState({
                num: this.state.num+1
            })

*/
```

## 十二、组件属性this.props

App5.js中：

```jsx
import React from 'react'


//定义一个头部组件(子组件)
class Header extends React.Component{
    //定义默认值
    static defaultProps = {
        bgc : "blue",
        title : "默认标题",
        children: "默认的子元素"
    }

    render(){
        return (
            <div style={{height:60, backgroundColor:this.props.bgc, textAlign:"center", color:"#fff"}}>
                {this.props.title}
                <p>{this.props.children}</p>
            </div>
            
        )
    }
}

// 父组件
export default class hello extends React.Component{
    render(){
        return (
            <div>
                <Header title="首页" bgc="green"/>
                <Header title="列表页" bgc="red"/>
                <Header/>
                
                {/* 子元素的使用 */}
                <Header bgc="pink">Header子元素</Header>
            </div>
        )
    }
}
/*
this.props基本使用 总结：

1、在父组件中使用子组件的时候，可以给组件设定属性的值
    <组件名 属性名=值 />  例如：<Header title="首页" bgc="green"/>

2、在定义子组件的时候，需要填入值的位置书写  this.props.属性名  来获取定义的值
    <div style={{height:40, backgroundColor:this.props.bgc, textAlign:"center", color:"#fff"}}>
        {this.props.title}
    </div>

3、在子组件内部可以定义默认值，格式如下：

    //定义默认值
    static defaultProps = {
        属性名：默认值,
        bgc : "blue",
        title : "默认标题"
    }

4、子元素的使用(了解)
    在父组件中，以<组件名 属性名=值></组件名>方式使用子组件的时候，可以添加子元素：
    <组件名 属性名=值>子元素</组件名>     
    例如：<Header bgc="pink">Header子元素</Header>

    在子组件内部，通过  this.props.children  来获取这个子元素
*/
```

## 十三、state和props小结（注意点、区别）

**1、定义组件的时候，状态初始化在 constructor  方法中完成；**

```jsx
constructor(props){
    super(props)

    this.state = {
        //状态属性名：值
    	num: 20       
    }
}
```

​	this.state定义的属性，称为state属性

**2、修改状态属性，要使用 this.setState()**

```jsx

this.setState({     
//状态属性名：值    num: this.state.num + 1
})
```

**3、使用组件的时候定义的属性，称为props属性**

```
<Header title="列表页" bgc="red"/>   // title和bgc 就是props属性
```

**4、React组件显示的变化，都是通过状态state的修改，重写(setState())渲染到页面中**

**5、state 和 props 主要的区别在于 props 一般是不可变的，而 state 可以根据与用户交互来改变**

**6、props可以用来区分的同个组件创建(复用)出来的不同标签，它由外部（父组件）传入。state用来定义和修改组件内部的一些数据**

下面举个最最通俗的例子：

​	你爸爸拿给你100块钱叫你去帮他买包烟，这个钱是通过 props 传给你的（父组件通过props可以往子组件传递数据）。

​	剩下的钱自己去买零食吃，你心情觉得高兴，高兴就是你这个人的状态数据（state就是组件的内部数据）。

​	你心情的好坏，理论上来讲，你没说出来，你爸爸是不知道你的心情（即子组件的state数据一般和父组件无关）。

