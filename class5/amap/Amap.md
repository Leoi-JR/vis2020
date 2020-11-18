# [Amap](https://lbs.amap.com)（高德地图）

### 简介

高德地图 JS API 是一套 JavaScript 语言开发的的地图应用编程接口，移动端、PC端一体化设计，一套 API 兼容众多系统平台。

高德Web服务API向开发者提供HTTP接口，开发者可通过这些接口使用各类型的地理数据服务，返回结果支持JSON和XML格式。



#### [获取API key](https://console.amap.com/dev/key/app)

注册成为高德开发者需要分三步：

第一步，注册高德开发者；

第二步，去控制台创建应用；

第三步，获取Key。



### 准备工作

1. 在页面添加 JS API 的入口脚本标签，并将其中「您申请的key值」替换为您刚刚申请的 key；

   ```HTML
   <script src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script> 
   ```

2. 添加`div`标签作为地图容器，同时为该`div`指定`id`属性；

   ```HTML
   <div id="container"></div>
   ```

3. 为地图容器指定高度、宽度；

   *CSS*

   ```HTML
   #container {width:300px; height: 180px; }  
   ```

4. 在完成如上准备工作之后便可以开始进行开发工作了。

   

### 快速上手

#### HELLO，AMAP！

创建一个地图只需要一行代码，构造参数中的`container`为准备阶段添加的地图容器的`id`：

```javascript
var map = new AMap.Map('container');
```

创建的同时可以给地图设置中心点、级别、显示模式、自定义样式等属性：

```javascript
var map = new AMap.Map('container', {
        zoom:11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode:'3D'//使用3D视图
    });
```

**地图的创建**完整代码：

```HTML
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
    <title>地图显示</title>
    <style>
        html,
        body,
        #container {
          width: 100%;
          height: 100%;
        }
    </style>
</head>
<body>
<div id="container"></div>
<!-- 加载地图JSAPI脚本 -->
<script src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script>
<script>
    var map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:11, //初始化地图层级
        center: [116.397428, 39.90923] //初始化地图中心点
    });
</script>
</body>
</html>
```



#### 图层

默认情况下，地图只显示标准底图，如需要叠加别的图层，可以通过`map.add`方法添加图层：

```javascript
var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
    });
    //实时路况图层
    var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
    });
    map.add(trafficLayer);//添加图层到地图
```

也可以在地图初始化的时候通过`layers`属性为地图设置多个图层：

```javascript
var map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        layers: [//使用多个图层
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet()
        ],
        zooms: [4,18],//设置地图级别范围
        zoom: 13
    });
```

**组合使用卫星图层和路网图层**完整代码：

```HTML
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>卫星和路网图</title>
    <style>
        html,
        body,
        #container {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
<div id="container"></div>
<script src="//webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script>
<script>
    var map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        layers: [
            // 卫星
            new AMap.TileLayer.Satellite(),
            // 路网
            new AMap.TileLayer.RoadNet()
        ],
        zoom: 13
    });
</script>
</body>
</html>
```

[查看更多图层](https://lbs.amap.com/api/javascript-api/guide/layers/official-layers)



#### 点标记与矢量图形

添加一个默认样式的Marker：

```javascript
var marker = new AMap.Marker({
        position:[116.39, 39.9]//位置
    })
    map.add(marker);//添加到地图
```

移除：

```javascript
map.remove(marker)
```

**点标记**完整代码：

通过icon属性创建Marker，展示添加、修改、删除Marker的接口。

```HTML
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>默认点标记</title>
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
    <style>
        html, body, #container {
            height: 100%;
            width: 100%;
        }

        .amap-icon img,
        .amap-marker-content img{
            width: 25px;
            height: 34px;
        }

        .marker {
            position: absolute;
            top: -20px;
            right: -118px;
            color: #fff;
            padding: 4px 10px;
            box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
            white-space: nowrap;
            font-size: 12px;
            font-family: "";
            background-color: #25A5F7;
            border-radius: 3px;
        }

        .input-card{
            width: 18rem;
            z-index: 170;
        }

        .input-card .btn{
            margin-right: .8rem;
        }

        .input-card .btn:last-child{
            margin-right: 0;
        }
    </style>
</head>
<body>
<div id="container"></div>
<div class="input-card">
    <label style="color:grey">点标记操作</label>
    <div class="input-item">
        <input id="addMarker" type="button" class="btn" onclick="addMarker()" value="添加点标记">
        <input id="updateMarker" type="button" class="btn" onclick="updateIcon()" value="更新点标记图标">
    </div>
    <div class="input-item">
        <input id="clearMarker" type="button" class="btn" onclick="clearMarker()" value="删除点标记">
        <input id="updateMarker" type="button" class="btn" onclick="updateContent()" value="更新点标记内容">
    </div>
</div>
<script type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script>
<script type="text/javascript">
    var marker, map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
    });

    // 实例化点标记
    function addMarker() {
        marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [116.406315,39.908775],
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);
    }
    function updateIcon() {
    
        marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
    }

    function updateContent() {

        if (!marker) {
            return;
        }

        // 自定义点标记内容
        var markerContent = document.createElement("div");

        // 点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
        markerContent.appendChild(markerImg);

        // 点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.className = 'marker';
        markerSpan.innerHTML = "Hi，我被更新啦！";
        markerContent.appendChild(markerSpan);

        marker.setContent(markerContent); //更新点标记内容
        marker.setPosition([116.391467, 39.927761]); //更新点标记位置
    }

    // 清除 marker
    function clearMarker() {

        if (marker) {
            marker.setMap(null);
            marker = null;
        }
    }
</script>
</body>
</html>
```

[查看更多点标记](https://lbs.amap.com/api/javascript-api/guide/overlays/marker)



#### 绘制矢量图形

添加折线：

```javascript
var lineArr = [
        [116.368904, 39.913423],
        [116.382122, 39.901176],
        [116.387271, 39.912501],
        [116.398258, 39.904600]
    ];
    var polyline = new AMap.Polyline({
        path: lineArr,          //设置线覆盖物路径
        strokeColor: "#3366FF", //线颜色
        strokeWeight: 5,        //线宽
        strokeStyle: "solid",   //线样式
    });
    map.add(polyline);
```

**折线的绘制和编辑**完整代码：

使用[AMap.Polyline](https://lbs.amap.com/api/javascript-api/reference/overlay#polyline)和[AMap.PolyEditor插件](https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.PolyEditor)绘制和编辑折线

```HTML
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <style>
    html,
    body,
    #container {
      width: 100%;
      height: 100%;
    }
    </style>
    <title>折线的绘制和编辑</title>
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
    <script src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值&plugin=AMap.PolyEditor"></script>
    <script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
</head>
<body>
<div id="container"></div>
<div class="input-card" style="width: 120px">
   <button class="btn" onclick="polyEditor.open()" style="margin-bottom: 5px">开始编辑</button> 
   <button class="btn" onclick="polyEditor.close()">结束编辑</button> 
</div>
<script type="text/javascript">
    var map = new AMap.Map("container", {
        center: [116.395577, 39.892257],
        zoom: 14
    });

    var path = [
        [116.362209, 39.887487],
        [116.422897, 39.878002],
        [116.372105, 39.90651],
        [116.428945, 39.89663]
    ];

    var polyline = new AMap.Polyline({
        path: path,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 3,
        strokeColor: "#3366FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
    })

    polyline.setMap(map)
    // 缩放地图到合适的视野级别
    map.setFitView([ polyline ])

    var polyEditor = new AMap.PolyEditor(map, polyline)

    polyEditor.on('addnode', function(event) {
        log.info('触发事件：addnode')
    })

    polyEditor.on('adjust', function(event) {
        log.info('触发事件：adjust')
    })

    polyEditor.on('removenode', function(event) {
        log.info('触发事件：removenode')
    })

    polyEditor.on('end', function(event) {
        log.info('触发事件： end')
        // event.target 即为编辑后的折线对象
    })
</script>
</body>
</html>
```

[查看更多矢量图形](https://lbs.amap.com/api/javascript-api/guide/overlays/vector-overlay)



#### 事件功能与信息窗体

给点标记绑定`click`事件：

```javascript
var infoWindow = new AMap.InfoWindow({ //创建信息窗体
        isCustom: true,  //使用自定义窗体
        content:'<div>信息窗体</div>', //信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(16, -45)
    });
    var onMarkerClick  =  function(e) {
        infoWindow.open(map, e.target.getPosition());//打开信息窗体
        //e.target就是被点击的Marker
    } 
    var marker = new AMap.Marker({
         position: [116.481181, 39.989792]
    })
    map.add(marker);
    marker.on('click',onMarkerClick);//绑定click事件
```

**自定义样式信息窗体**完整代码：

展示如何创建自定义样式的信息窗体，以及如何点击Marker打开信息窗体。

```HTML
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>默认样式信息窗体</title>
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
    <style>
        html, body, #container {
            height: 100%;
            width: 100%;
        }

        .content-window-card {
            position: relative;
            box-shadow: none;
            bottom: 0;
            left: 0;
            width: auto;
            padding: 0;
        }

        .content-window-card p {
            height: 2rem;
        }

        .custom-info {
            border: solid 1px silver;
        }

        div.info-top {
            position: relative;
            background: none repeat scroll 0 0 #F9F9F9;
            border-bottom: 1px solid #CCC;
            border-radius: 5px 5px 0 0;
        }

        div.info-top div {
            display: inline-block;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            line-height: 31px;
            padding: 0 10px;
        }

        div.info-top img {
            position: absolute;
            top: 10px;
            right: 10px;
            transition-duration: 0.25s;
        }

        div.info-top img:hover {
            box-shadow: 0px 0px 5px #000;
        }

        div.info-middle {
            font-size: 12px;
            padding: 10px 6px;
            line-height: 20px;
        }

        div.info-bottom {
            height: 0px;
            width: 100%;
            clear: both;
            text-align: center;
        }

        div.info-bottom img {
            position: relative;
            z-index: 104;
        }

        span {
            margin-left: 5px;
            font-size: 11px;
        }

        .info-middle img {
            float: left;
            margin-right: 6px;
        }
    </style>
</head>
<body>
<div id="container"></div>
<div class="info">
    点击地图上的点标记，打开所添加的自定义信息窗体
</div>
<script type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script>
<script type="text/javascript">    //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
var map = new AMap.Map("container", {
    resizeEnable: true,
    center: [116.481181, 39.989792],
    zoom: 16
});
addMarker();

//添加marker标记
function addMarker() {
    map.clearMap();
    var marker = new AMap.Marker({
        map: map,
        position: [116.481181, 39.989792]
    });
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker.getPosition());
    });
}

//实例化信息窗体
var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
    content = [];
content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
content.push("电话：010-64733333");
content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
var infoWindow = new AMap.InfoWindow({
    isCustom: true,  //使用自定义窗体
    content: createInfoWindow(title, content.join("<br/>")),
    offset: new AMap.Pixel(16, -45)
});

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}
</script>
</body>
</html>
```

查看更多[事件系统](https://lbs.amap.com/api/javascript-api/guide/events/map_overlay)和[信息窗体](https://lbs.amap.com/api/javascript-api/guide/overlays/infowindow)