# DECK.GL入门

在页面添加 JS API 的入口脚本标签

```html
<script src="https://unpkg.com/deck.gl@latest/dist.min.js"></script>
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet
```

添加 div 标签作为地图容器，同时为该 div 指定 id 属性

```html
<div id="container"></div>
```

为地图容器指定高度、宽度

```html
<style type="text/css">
      body {margin: 0; padding: 0;}
      #container {width: 100vw; height: 100vh;}
</style>
```

绘制地图

```html
<script type="text/javascript">
		new deck.DeckGL({
  			mapStyle: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  			initialViewState: {
			    longitude: -122.45,
			    latitude: 37.8,
			    zoom: 15
  			},
  			controller: true,
		});
	</script>
```

添加散点

```html
layers: [
    			new deck.ScatterplotLayer({
      				data: [
        				{position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}
      				],
      				getColor: d => d.color,
      				getRadius: d => d.radius
    			})
  			]
```

