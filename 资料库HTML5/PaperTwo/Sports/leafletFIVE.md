要让地图在页面上居中显示，您可以将地图容器 `#map` 放在一个父容器 `div` 中，然后使用 CSS 将 `#map` 居中对齐。

以下是如何修改您的代码，使地图在页面上水平和垂直居中：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>中国地图示例 - Leaflet.js</title>
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="/LeafletGRA/leaflet/leaflet.css">
  <style>
    /* 设置父容器样式，确保地图居中 */
    .map-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh; /* 使父容器充满视口高度 */
    }
    /* 设置地图容器样式 */
    #map {
      height: 788px; /* 设置地图高度 */
      width: 406px; /* 设置地图宽度 */
    }
  </style>
</head>
<body>
  <!-- 父容器用于将地图居中 -->
  <div class="map-container">
    <div id="map"></div>
  </div>

  <!-- Leaflet JS -->
  <script src="/LeafletGRA/leaflet/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([51.505, -0.09], 13);

    var marker = L.marker([51.5, -0.09]).addTo(map);

    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);

    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    // 添加 OpenStreetMap 瓦片层
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  </script>
</body>
</html>
```

### 说明
- **`.map-container`**：这是父容器，设置为 `display: flex`，并使用 `align-items: center` 和 `justify-content: center` 来实现居中。
- **`height: 100vh`**：使父容器占满整个视口高度，以便地图垂直居中。
  
这样，您的地图将会在页面中水平和垂直居中显示。