### plotly.js介绍

plotly.js是开源的 JavaScript 图表库，它是基于 d3.js 和 stack.gl，高层次的、描述性的图表库。 plotly.js有20种图表类型，包括 3D 图表，统计图表，和 SVG 地图。使用Plotly.js可以轻松创建交互式图， 创建的任何图表都具有放大，缩小，平移，自动缩放等功能。

plotly.js ：https://plotly.com/javascript/

#### plotly.py

```python
~$ pip install plotly #在python安装plolty
import plotly.plotly as py            # 用来与plotly服务器通信
import plotly.graph_objs as go        # 用来生成图形对象
fig = go.Figure()  #使用go.Figure()方法来编译data和layout，结果将传给我们选择的绘图函数
```

plotly.py：https://plotly.com/python/

### plotly.js实践

#### 加载plotly.js库

https://github.com/plotly/plotly.js/releases

下载缩小的plotly.js捆绑包

```html
<head> 
<script src="plotly.min.js"></script> 
</head>
```

#### 引用plotly.js库还可以使用ultrafast plotly.js CDN引用图表库

```html
<head> 
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script> 
</head>
```

如果要获取plotly.js的特定版本，加上版本数字，如1.2.0：

```html
<head> 
<script src="https://cdn.plot.ly/plotly-1.2.0.min.js"></script> 
</head>
```

#### 调用plotly.js库

```js
Plotly.newPlot(‘id’,data) 
```

#### plotly.js配置选项

```js
var config={
  showLink: true,//链接在线编辑面板
  plotlyServerURL: "https://chart-studio.plotly.com"}
var config={
    scrollZoom: true//自由缩放
	staticPlot: true//静态图表
	displayModeBar: false//隐藏modebar}
```

### 创建图表

在HTML文档中，创建一个空的DIV来绘制图形：

```html
<div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
```

#### 基本框架

```html
<head>
	<!—加载plotly.js库 -->
	<script src='https://cdn.plot.ly/plotly-latest.min.js'></script>
</head>

<body>
	<div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
	<script>
	
Plotly.newPlot('myDiv',data)
</script>
</body>
```

#### 基础图表

##### 散点图和气泡图

```js
var trace1 = {
  x: [1, 2, 3, 4, 5],
  y: [1, 6, 3, 6, 1],
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
  marker: { size: 12 }
};

var trace2 = {
  x: [1.5, 2.5, 3.5, 4.5, 5.5],
  y: [4, 1, 7, 1, 4],
  mode: 'markers',
  type: 'scatter',
  name: 'Team B',
  text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
  marker: { size: 12 }
};

var data = [ trace1, trace2 ];

var layout = {
  xaxis: {
    range: [ 0.75, 5.25 ]
  },
  yaxis: {
    range: [0, 8]
  },
  title:'Data Labels Hover'
};

Plotly.newPlot('myDiv', data, layout);
```

气泡图给定数据点的size值只能是正值，因为size表示的是气泡的面积而不是其半径。

```js
symbol: ['circle', 'square', 'diamond', 'cross']//改变点的形状
```

##### 折线图

使用Plotly.js，无法将type属性设置为line创建折线图。 必须将type属性设置为”scatter” ，然后将mode属性设置为“ lines”，“ lines + markers”或“ lines + markers + text”。

```js
var trace1 = { 
    x: [1, 2, 3, 4], 
    y: [10, 15, 13, 17], 
    type: 'scatter',
    mode: 'lines'
}; 
var trace2 = { 
    x: [1, 2, 3, 4], 
    y: [16, 5, 11, 9], 
    type: 'scatter',
    mode: 'lines+marks'
}; 
var data = [trace1, trace2]; 
Plotly.newPlot('myDiv', data);
```

可以使用color指定线条的颜色，使用width属性控制线条的宽度，宽度以像素为单位，默认值为2像素。

###### Connect Gaps Between Data

```js
var trace1 = { 
    x: [1, 2, 3, 4], 
    y: [10, null, 13, 17], 
    type: 'scatter' 
    mode: 'lines', 
    connectgaps: true
};
```

###### 折线线型

可以使用shape属性指定要绘制的不同点之间的线型。 默认情况下是linear，但是也可以将其设置为spline，vh，hv，hvh或vhv 。

```js
line: { dash: 'solid', width: 4 }; //实线
line: { dash: 'dashdot', width: 4 };//点划线
line: { dash: 'dot', width: 4 }；//虚线
```

###### layout

```js
var layout = { 
	title: 'Title of the Graph',
	xaxis: { title: 'x-axis title' },
	yaxis: { title: 'y-axis title' } ,
	showlegend: false //隐藏标注,
};
```

##### 饼图

###### 基本饼图

```js
var data = [{ 
    values: [19, 26, 55], 
    labels: ['a', 'b', 'c'], 
    type: 'pie' 
}];
var layout = { 
    height: 400, 
    width: 500 }; 
Plotly.newPlot('myDiv', data, layout);
```

###### 环形图

```js
var data = [{ 
    values: [19, 26, 55], 
    labels: ['a', 'b', 'c'], 
    hole：.4,//数值小于1，表示占饼图的40%
    type: 'pie'，
}];

var layout = { 
    height: 400, 
    width: 500 
}; 
Plotly.newPlot('myDiv', data, layout);
```

###### 自动调节边距和方向

边距：automargin属性设置为true，将自动增加边距大小

文本方向：`insidetextorientation`属性控制图表扇区内文本的方向。设置为auto时，文本可以沿任何方向定向，以便在扇区中间尽可能大。

##### 条形图

###### 基础条形图

```js
var data = [{ 
    x: ['giraffes', 'orangutans', 'monkeys'], 
    y: [20, 14, 23], 
    type: 'bar' 
}]; 
Plotly.newPlot('myDiv', data);
```

###### 分组条形图

```js
var layout = {barmode: 'group'};
```

###### 堆积条形图

```js
var layout = {barmode: 'stack'};
```

#### 统计图

##### 直方图

```js
var x = []; 
for (var i = 0; i < 500; i ++) { x[i] = Math.random(); }
var trace1 = { 
    x: x, //垂直直方图
    type: 'histogram', 
}; 
var data = [trace];
var trace2 = { 
    y: y, //水平直方图
    type: 'histogram', 
}; 
var data = [trace1,trace2];

Plotly.newPlot('myDiv', data);
```

##### 平面等高线图

```js
var x = []; 
var y = []; 
for (var i = 0; i < 500; i ++) 
{ 
    x[i] = Math.random(); 
    y[i] = Math.random() + 1;
}; //随机生成一组数据
var data = [ { 
    x: x,
    y: y, 
    type: 'histogram2dcontour' 
} ]; 
Plotly.newPlot('myDiv', data);
```

#### 科学图表

##### 等高线图

###### 基本等高线图

```js
var data = [ { 
    z: [
        [10, 10.625, 12.5, 15.625, 20], 
        [5.625, 6.25, 8.125, 11.25, 15.625], 
        [2.5, 3.125, 5.0, 8.125, 12.5], 
        [0.625, 1.25, 3.125, 6.25, 10.625], 
        [0, 0.625, 2.5, 5.625, 10]
    ],
	type: 'contour' 
}]; 
var layout = { 
    title: 'Basic Contour Plot' 
} ;
Plotly.newPlot('myDiv', data, layout);
```

###### 自定间距和色彩

```js
colorscale: 'Jet', 
    dx: 10, 
    x0: 5, 
    dy: 10, 
    y0: 10
```

###### 补充间隙

connectgaps: true,//补充间隙

```js
var trace1 = { 
    z: [
        [null, null, null, 12, 13, 14, 15, 16], 
        [null, 1, null, 11, null, null, null, 17], 
        [null, 2, 6, 7, null, null, null, 18], 
        [null, 3, null, 8, null, null, null, 19], 
        [5, 4, 10, 9, null, null, null, 20], 
        [null, null, null, 27, null, null, null, 21], 
        [null, null, null, 26, 25, 24, 23, 22]
       ],
	connectgaps: true,
    type: 'contour', 
    showscale: false, 
    xaxis: 'x1', 
    yaxis: 'y1' 
};
```

###### 平滑

```js
line:{ smoothing: 0.85 },
```

###### 增加标签

```js
contours: { 
    coloring: 'heatmap', 
    showlabels: true, 
    labelfont: { 
        family: 'Raleway', 
        size: 12, 
        color: 'white',
}
```

##### 热度图

###### 基本框架

```js
var data = [ { 
        z: [[1, 20, 30],
            [20, 1, 60], 
            [30, 60, 1]], 
    	type: 'heatmap' 
} ]; 
Plotly.newPlot('myDiv', data);
```

###### 增加分类标签

```js
var data = [ { 
    z: [
        [1, null, 30, 50, 1], 
        [20, 1, 60, 80, 30], 
        [30, 60, 1, -10, 20]
       ],
	x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 
	y: ['Morning', 'Afternoon', 'Evening'], 
	type: 'heatmap', 
	hoverongaps: false 
} ]; 

Plotly.newPlot('myDiv', data);
```

