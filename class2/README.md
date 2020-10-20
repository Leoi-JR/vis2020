# 可视化及交互编程基础 
## 两种绘图方式

### Canvas 基于像素

https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API
+ \<canvas\>元素
```html
<canvas id="tutorial" width="150" height="150"></canvas> // 只有width和height两个属性
```
+ 模板骨架
```html
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw(){
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
		  // 画图代码
        }
      }
    </script>
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```
+ 基本函数
	- 绘制矩形
	```js
	fillRect(x, y, width, height) // 绘制一个填充的矩形
	strokeRect(x, y, width, height) // 绘制一个矩形的边框
	clearRect(x, y, width, height) // 清除指定矩形区域，让清除部分完全透明。
	```
	- 绘制路径
	```js
	beginPath() // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
	closePath() // 闭合路径之后图形绘制命令又重新指向到上下文中。
	stroke() // 通过线条来绘制图形轮廓。
	fill() // 通过填充路径的内容区域生成实心的图形。
	```
	- 圆弧
	```js
	arc(x, y, radius, startAngle, endAngle, anticlockwise) // 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
	arcTo(x1, y1, x2, y2, radius) // 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
	```
* 点
```js
ctx.fillRect(50, 50, 1, 1);
```
* 线
```js
ctx.beginPath();
ctx.moveTo(25, 25);
ctx.lineTo(100, 100);
ctx.closePath();
ctx.stroke();
```
* 面
```js
ctx.fillRect(50, 50, 55, 55);
// or
ctx.beginPath();
ctx.moveTo(25, 25);
ctx.lineTo(100, 25);
ctx.lineTo(100, 100);
ctx.lineTo(25, 100);
ctx.closePath();
ctx.fill();
```

### SVG 可伸缩矢量图形

https://www.runoob.com/svg/svg-tutorial.html

+ 几何元素及属性  
  + 矩形 <rect>
    + x, y, width, height
	```html
	<svg>
	    <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
	</svg>
	// or 
	<svg>
	    <rect width="300" height="100" fill="rgb(0,0,255)" stroke-width="1px" stroke="rgb(0,0,0)"/>
	</svg>
	```
  + 圆形 <circle>
     + cx, cy, r
	 ```html
	 <svg>
	    <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
	 </svg>
	 ```
  + 椭圆 <ellipse>
     + cx, cy, rx, ry
	 ```html
	 <svg>
	     <ellipse cx="300" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2"/>
	 </svg>
	 ```
  + 线 <line>
     + x1, y1, x2, y2
	 ```html
	 <svg>
	     <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2"/>
	 </svg>
	 ```
  + 折线 <polyline>
     + points
	 ```html
	 <svg>
	     <polyline points="20,20 40,25 60,40 80,120 120,140 200,180" style="fill:none;stroke:black;stroke-width:3" />
	 </svg>
	 ```
  + 多边形 <polygon>
     + points
	 ```html
	 <svg  height="210" width="500">
	     <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1"/>
	 </svg>
	 ```
  + 路径 <path>
     + d    
		- M = moveto  
		- L = lineto  
		- H = horizontal lineto  
		- V = vertical lineto  
		- C = curveto  
		- S = smooth curveto  
		- Q = quadratic Bézier curve  
		- T = smooth quadratic Bézier curveto  
		- A = elliptical Arc  
		- Z = closepath  
	**以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。**
     
## 交互
  * 绑定交互事件
       
  * 鼠标交互事件

https://blog.csdn.net/qq_18407565/article/details/70249644
  
   + onclick
   + onmouseout
   + onmouseover
   + onmouseleave
    

### SVG库paper.js

http://paperjs.org/








