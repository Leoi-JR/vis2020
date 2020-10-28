## 基础介绍

### 01-Echarts-介绍

官网地址：https://echarts.apache.org/zh/index.html

常见的数据可视化库：

- D3.js   目前 Web 端评价最高的 Javascript 可视化工具库(入手难)  
- ECharts.js   百度出品的一个开源 Javascript 数据可视化库   
- Highcharts.js  国外的前端数据可视化库，非商用免费，被许多国外大公司所使用  
- AntV  蚂蚁金服全新一代数据可视化解决方案  等等
- Highcharts 和 Echarts 就像是 Office 和 WPS 的关系

> ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 [ZRender](https://github.com/ecomfe/zrender)，提供直观，交互丰富，可高度个性化定制的数据可视化图表。


### 02-Echarts-体验

官方教程：[五分钟上手ECharts](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)

- 下载echarts  https://echarts.apache.org/zh/download.html

使用步骤：

1. 引入echarts  
```html
<script src="js/echarts.min.js"></script>
```
2. 准备一个具备大小的DOM容器

```html
<div class="box" style="width: 300px; height:300px;"></div>
```

3.  初始化echarts实例对象

```js
//let myChart = echarts.init(dom元素)
let myChart = echarts.init(document.querySelector(".box"));
```

4. 指定配置项和数据(option)

```js
let option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [1120, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
```

5. 将配置项设置option给echarts实例对象

```js
myChart.setOption(option);
```



### 03-Echarts-基础配置

官网地址：https://echarts.apache.org/zh/index.html

> 需要了解的主要配置：`series` `xAxis` `yAxis` `grid` `tooltip` `title` `legend` `color` 

- title：标题组件

- tooltip：提示框组件(axis,item)

- legend：图例组件

- toolbox：工具箱组件，有另存为图片等功能

- grid：直角坐标系内绘图网格

  - containLabel：是否显示刻度标签
  
- xAxis：直角坐标系 grid 中的 x 轴

  - boundaryGap: 线条与坐标轴是否有缝隙

- yAxis：直角坐标系 grid 中的 y 轴

-  series

  - 系列列表。每个系列通过 `type` 决定自己的图表类型（bar，line，pie……）
  - stack：数据堆叠，同个类目轴上系列配置相同的`stack`值后 后一个系列的值会在前一个系列的值上相加

- color：调色盘颜色列表

  

## 案例学习

Echarts大屏数据可视化展示

### 04-案例适配方案

- 文字等属性随网页大小适配： 
  - 将flexible.js引入HTML页面，实现rem自适应。同时在 “工具-设置-编辑器配置-px转rem比例”  设置为80px=1rem
  - 可以理解为css中元素rem的值实际就是浏览器页面中元素的px值与html的font-size的px值的比例
- 让图表跟随屏幕**自适应**：

```javascript
window.addEventListener("resize", function() {
    myChart.resize();
});
```



### 05-立即执行函数的妙用

为了防止变量污染，减少命名冲突，我们可以采取立即执行函数的写法，里面的变量都是局部变量。

```javascript
(function(){
	let myChart = echarts.init(document.querySelector(.box));
})();
```

​	

### 06-柱状图模块

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

1. 引入到html页面中

~~~javascript
// 柱状图1模块
(function() {
  // 实例化对象
  let myChart = echarts.init(document.querySelector(".bar .chart"));
  // 指定配置和数据
  let option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  // 把配置给实例对象
  myChart.setOption(option);
})();
~~~

让图表跟随屏幕**自适应**

```javascript
  window.addEventListener("resize", function() {
    myChart.resize();
  });
```



2. 根据需求定制

   - 修改图表柱形颜色  #2f89cf


   - 修改图表大小  top 为 10px   bottom 为  4%    grid决定我们的柱状图的大小

   ~~~JavaScript
color: ["#2f89cf"],
    
grid: {
    left: "0%",
    top: "10px",
    right: "0%",
    bottom: "4%",
    containLabel: true
},
   ~~~

   - X轴相关设置  xAxis
     - 文本颜色设置为   rgba(255,255,255,.6)   字体大小为 12px
     - X轴线的样式 不显示

   ~~~JavaScript
   // 设置x轴标签文字样式
  // x轴的文字颜色和大小
        axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize: "12"
        },
   //  x轴样式不显示
   axisLine: {
       show: false
       // 如果想要设置单独的线条样式 
       // lineStyle: {
       //    color: "rgba(255,255,255,.1)",
       //    width: 1,
       //    type: "solid"
      }
   },
   ~~~

   - Y 轴相关定制
     - 文本颜色设置为   rgba(255,255,255,.6)   字体大小为 12px
     - Y 轴线条样式 更改为  1像素的  rgba(255,255,255,.1) 边框
     - 分隔线的颜色修饰为  1像素的  rgba(255,255,255,.1)   

   ~~~JavaScript
   // y 轴文字标签样式
		axisLabel: {
		      textStyle: {
		         color: "rgba(255,255,255,.6)",
		          fontSize: "12"
		      }
		   },
    // y轴线条样式
		axisLine: {
		         lineStyle: {
		            color: "rgba(255,255,255,.1)",
		            // width: 1,
		            // type: "solid"
		         }
		   },
    // y 轴分隔线样式
		splitLine: {
		       lineStyle: {
		          color: "rgba(255,255,255,.1)"
		        }
		},
   ~~~

   - 修改柱形为圆角以及柱子宽度  series 里面设置

   ~~~JavaScript
   series: [
         {
           name: "直接访问",
           type: "bar",
           // 修改柱子宽度
           barWidth: "35%",
           data: [10, 52, 200, 334, 390, 330, 220],
           itemStyle: {
             // 修改柱子圆角
             barBorderRadius: 5
           }
         }
       ]
     };
   ~~~

   - 更换对应数据

   ~~~JavaScript
   // x轴中更换data数据
    data: [ "旅游行业","教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业" ],
   // series 更换数据
    data: [200, 300, 300, 900, 1500, 1200, 600],
   ~~~



### 07-折线图模块

- 官网找到类似实例，引入到HTML页面中
- 根据需求定制图表

需求1：修改折线图大小，显示边框设置颜色：#012f4a，并且显示刻度标签

```javascript
//设置格网样式
grid: {
    top: "20%",
    left: "3%",
    right: "4%",
    bottom: "3%",
    show: true,//显示边框
    borderColor: "#012f4a",//边框颜色
    containLabel: true //包含刻度文字在内
},
```

需求2：修改图例组件中的文字颜色 #4c9bfd， 距离右侧right为 10%

```javascript
legend: {
    textStyle: {
      color: "#4c9bfd" // 修饰图例文字的颜色
    },
    right: "10%",// 距离容器10%
},
```

需求3：x轴相关配置

- 刻度去除
- x轴刻度标签字体颜色：#4c9bfd
- 剔除x坐标轴线颜色（将来使用y轴分割线）
- 轴两端是不需要内间距 boundaryGap

```javascript
xAxis: {
  type: "category",
  boundaryGap: false,
  data: ["周一","周二","周三","周四","周五","周六","周日"],
  axisTick: {
	show: false // 去除刻度
  },
  axisLabel: {
	color: "rgba(255,255,255,.7)"  // 修饰刻度标签的颜色
  },
  axisLine: {
	show: false  // 去除x坐标轴的颜色
  },
},
```

需求4：y轴的定制

- 刻度去除
- 字体颜色：#4c9bfd
- 分割线颜色：#012f4a

```JavaScript
yAxis: {
  type: "value",
  axisTick: {
	show: false  // 去除刻度
  },
  axisLabel: {
	color: "rgba(255,255,255,.7)"  // 修饰刻度标签的颜色
  },
  splitLine: {
	lineStyle: {
	  color: "#012f4a"  // 修改y轴分割线的颜色
	},
  },
},
```

需求5：光滑曲线 smooth

```javascript
series: [
	{
		name: '邮件营销',
		type: 'line',
		stack: '总量',
		data: [120, 132, 101, 134, 90, 230, 210],
		smooth:true,  //光滑曲线
	},
	{
		name: '联盟广告',
		type: 'line',
		stack: '总量',
		data: [220, 182, 191, 234, 290, 330, 310],
		smooth:true,  //光滑曲线
	},

]
```



### 08-饼形图模块

- 官网找到类似实例，引入到HTML页面中
- 根据需求定制图表

定制图表需求：

- 修改图例组件在底部并居中显示
- 每个小图标的宽度和高度修改为10px
- 文字大小为12 颜色rgba（255,255,255, .5）

```javascript
legend: {
    bottom: "0%",
    itemWidth: 10,
    itemHeight: 10,
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    textStyle: {
       color:"rgba(255,255,255,.5)",
       fontSize:"12"
	}
},
```



### 09-Echarts-社区介绍

> [社区](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)就是一些，活跃的echart使用者，交流和贡献定制好的图表的地方。


- 在这里可以找到一些基于echart的高度定制好的图表，相当于基于jquery开发的插件，这里是基于echarts开发的第三方的图表。

### 10-Echarts-map使用（扩展）

参考社区的例子：https://gallery.echartsjs.com/editor.html?c=x0-ExSkZDM  (模拟飞机航线)

实现步骤：

- 需要下载china.js提供中国地图的js文件
- 使用社区提供的配置即可

需要修改：

- 去掉图例组件和标题组件
- 去掉背景颜色
- 修改地图省份背景  #142957
- 地图放大通过  zoom   设置为1.2即可

~~~javascript
    geo: {
      map: 'china',
      zoom: 1.2,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: 'rgba(52, 110, 235, 0.7)',
          borderColor: '#09e7ff'
        },
        emphasis: {
          areaColor: '#0b1c2d'
        }
      }
    },
~~~

总结：这例子是扩展案例，大家以后可以多看看社区里面的案例。

全文教程： https://www.bilibili.com/video/BV1v7411R7mp 

