# Leaflet.js教程

- [简介](#简介)
- [通过四个步骤创建基本的传单地图](#通过四个步骤创建基本的传单地图)
  - [创建一个基本的 HTML 页面](#创建一个基本的-html-页面)
  - [参考开源 Leaflet JavaScript 库的文件](#参考开源-leaflet-javascript-库的文件)
  - [准备数据](#准备数据)
  - [设置传单地图](#设置传单地图)
- [初始化地图](#初始化地图)
- [添加基础层](#添加基础层)
- [添加默认标记](#添加默认标记)
- [自定义传单地图](#自定义传单地图)
  - [1. 禁用鼠标滚动缩放](#1.禁用鼠标滚动缩放)
  - [2. 向地图添加图层](#2.向地图添加图层)
  - [3. 自定义标记](#3.自定义标记)
  - [4. 添加弹出窗口](#4.添加弹出窗口)
- [Leaflet 地图的其他自定义项](#leaflet-地图的其他自定义项)
- [结论](#结论)

---

**Leaflet.js 是目前最流行的映射库之一。它是一个灵活、轻量级的开源 JavaScript 库，用于创建交互式地图。**

Leaflet 是一个用于呈现地图数据的框架。数据以及底图图层必须由开发人员提供。地图由切片图层以及浏览器支持、默认交互性、平移和缩放功能组成。您还可以添加更多自定义图层和插件，以及 Leaflet 中的所有映射。该地图库将您的数据转换为地图图层，并提供出色的支持，使其成为大多数开发人员的首选。它在主要的桌面和移动平台上运行良好，使其成为移动和大屏幕地图的完美 JavaScript 库。

在本教程中，我将向您展示如何使用 HTML、CSS 和 Leaflet 创建漂亮的交互式南太平洋地图，以突出显示最受欢迎的海滩。我从 TripAdvisor 网站收集了数据，并整理了2021 年轻旅行者之选投票评选的南太平洋前十名海滩。

您是否看过一些有趣的在线地图并希望自己创建一个？跟随这个激动人心的旅程，我将向您展示如何绘制一张很酷的地图并使用 Leaflet 突出显示前十名海滩。

  

![动图封面](https://pic3.zhimg.com/v2-86d4dd9bcf872877fc1f47a918cfceeb_720w.jpg?source=d16d100b)

---

## 通过四个步骤创建基本的传单地图

使用传单构建简单地图的过程很简单。一些 HTML 和 JavaScript 的背景知识是有益的，但如果您是一个完整的初学者，请不要担心。使用这个 JavaScript 库非常简单，在创建这个令人惊叹的、富有洞察力的地图时，我将引导您完成每一行代码。

---

## 创建一个基本的 HTML 页面

首先，我要创建一个 HTML 页面来呈现地图对象。然后我添加一个</div>来保存地图并给它一个 ID，map以便稍后参考。接下来，我添加了一些样式细节，其中我将宽度和高度指定为100vw和100vh。这将使地图占据整个页面：

```text
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Leaflet Map</title>
    <style type="text/css">
      body{
        margin: 0;
        padding: 0;
      }
      #map {
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
  </body>
</html>
```

---

## 参考开源 Leaflet JavaScript 库的文件

由于我使用的是 Leaflet 库，因此我需要包含该库的必要 JavaScript 和 CSS 文件。您可以直接下载文件，使用 JavaScript 包管理器 (npm) 在本地安装文件，或使用其 CDN 中的托管版本：

```text
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Leaflet Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <style type="text/css">
      body{
        margin: 0;
        padding: 0;
      }
      #map {
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
    <script>
      // All the code for the leaflet map will come here
    </script>
  </body>
</html>
```

_注意：该integrity属性允许浏览器检查获取的脚本，以确保如果源已被操纵，则不会加载代码。_

---

## 准备数据

要绘制任何地图，我需要像纬度和经度这样的坐标值。我在此处整理了来自该站点的每个数据点的纬度和经度。此外，对于 Leaflet 开发，我还需要从名为OpenStreetMap的站点获得的基础层。

---

## 设置传单地图

现在是通过编写几行代码来创建地图的有趣部分。您不会相信使用 Leaflet 创建功能齐全的地图只需要几行代码。这种易于开发的特点，加上 Leaflet 是一个开源 JavaScript 库，使其在映射库列表中名列前茅。

因此，首先，请记住这个 JavaScript 库中的所有内容都通过字母“L”访问，并且所有功能都通过它进行扩展。

---

## 初始化地图

我要做的第一件事是声明 map 变量并使用 Leaflet map 对其进行初始化。第一个参数是<div>前面定义的ID。第二个是您希望地图中心所在的位置。最后是缩放级别。我已将缩放设置为 3.5，但您可以将其设置为您喜欢的任何值。

我将这些参数用于我的地图，但有许多不同的选项可用于设置地图、交互、动画和事件的状态，您可以在此处查看：

```text
const map = L.map('map', {
  center: [-29.50, 145],
  zoom: 3.5
});
```

## 添加基础层

接下来，我添加了切片图层，这将是 Leaflet 地图的基础图层。切片图层是通过服务器通过直接 URL 请求访问的一组切片。此切片图层将地理边界添加到地图中。

请务必为此包含归因文本，因为大多数开发人员都忘记了这样做：

```text
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
```

## 添加默认标记

为了指示海滩，我添加了标记。Leaflet 默认提供此功能。由于我需要显示十个海滩，我将添加一个标记，每个标记带有相应海滩的纬度和经度值：

```text
const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);
const marker2 = L.marker([-27.643310, 153.305140]).addTo(map);
const marker3 = L.marker([-33.956330, 122.150270]).addTo(map);
const marker4 = L.marker([-34.962390, 117.391220]).addTo(map);
const marker5 = L.marker([-17.961210, 122.214820]).addTo(map);
const marker6 = L.marker([-16.505960, 151.751520]).addTo(map);
const marker7 = L.marker([-22.594400, 167.484440]).addTo(map);
const marker8 = L.marker([-37.977000, 177.057000]).addTo(map);
const marker9 = L.marker([-41.037600, 173.017000]).addTo(map);
const marker10 = L.marker([-37.670300, 176.212000]).addTo(map);
```

瞧！一个绝对可爱且实用的传单地图已全部设置并准备就绪。这传单开发不是轻而易举吗？

下图显示了到目前为止这一切的样子。

  

![](https://picx.zhimg.com/v2-e1552142117bbe6ef1e12120ac6a719b_b.jpg)

  

您可以在此 Pen中找到整个代码：

---

## 自定义传单地图

Leaflet JavaScript 库的一个有用功能是它可以快速构建基本地图，并且它还具有大量自定义地图的选项。因此，让我向您展示四种方法，使这张传单地图更具信息性和美观性。

---

## 1.禁用鼠标滚动缩放

主要的问题之一是在尝试浏览页面时意外滚动地图。为了处理这个问题，我修改了我在设置阶段声明地图的代码。我将添加scrollWheelZoom属性并将其设置为false，以确保地图只能使用缩放按钮进行缩放。我还将使用不同的方式来设置中心和缩放级别，这样可以有效地工作并且更具可读性：

```text
const map = L.map('map', {scrollWheelZoom:false}).setView([-29.50, 145], 3.5);
```

---

## 2. 向地图添加图层

Leaflet 的另一个令人兴奋和有用的功能是添加多个矢量图层的选项。将街景作为图层之一，我将提供免费网络地图服务 (WMS) 的站点添加另外两个切片图层。我将添加一个地形图层和一个地点图层：

```text
const basemaps = {
  StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',   {attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
  Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?',   {layers: 'TOPO-WMS'}),
  Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {layers: 'OSM-Overlay-WMS'})
};
```

Leaflet 还提供了让用户控制要渲染的图层的功能。使用该功能，我将在页面右上角添加一个选项菜单按钮，让您选择要覆盖在地图上的三个图层中的哪一个：

```text
L.control.layers(basemaps).addTo(map);
```

最后，我将 Topography 图层设置为要渲染的默认图层。在最终版本中，我将恢复为 Streetview 作为默认选项：

```text
basemaps.Topography.addTo(map);
```

---

## 3.自定义标记

默认标记非常适合指示位置，但自定义标记为地图提供了个性化的外观，并且使用 Leaflet 库很容易设置它。

要定义图标，我需要指定图标的 URL 和大小。我将下载一个免费的 SVG 图标并将其托管在我的 GitHub 帐户上，该帐户提供了 URL。我将大小设置为 40，但您可以或多或少地保留它。

现在，我将简单地将这个图标添加到之前定义的每个标记中，仅此而已。所有指示海滩的标记现在都是海滩图标：

```text
const basicBeachIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/shacheeswadia/leaflet-map/main/beach-icon-chair.svg',
  iconSize: [40, 40],
});

const marker1 = L.marker([-37.699450, 176.279420], {icon: basicBeachIcon}).addTo(map);
const marker2 = L.marker([-27.643310, 153.305140], {icon: basicBeachIcon}).addTo(map);
const marker3 = L.marker([-33.956330, 122.150270], {icon: basicBeachIcon}).addTo(map);
const marker4 = L.marker([-34.962390, 117.391220], {icon: basicBeachIcon}).addTo(map);
const marker5 = L.marker([-17.961210, 122.214820], {icon: basicBeachIcon}).addTo(map);
const marker6 = L.marker([-16.505960, 151.751520], {icon: basicBeachIcon}).addTo(map);
const marker7 = L.marker([-22.594400, 167.484440], {icon: basicBeachIcon}).addTo(map);
const marker8 = L.marker([-37.977000, 177.057000], {icon: basicBeachIcon}).addTo(map);
const marker9 = L.marker([-41.037600, 173.017000], {icon: basicBeachIcon}).addTo(map);
const marker10 = L.marker([-37.670300, 176.212000], {icon: basicBeachIcon}).addTo(map);
```

在此处查看此个性化版本的外观并使用CodePen上的代码。

  

![](https://pica.zhimg.com/v2-5239596c5b4b0978c8053f11fea0c0e8_b.jpg)

  

这个图标只是一个例子，所以当我在可视化的最终版本中更改自定义标记时，请留意一个更时髦的图标。

---

## 4.添加弹出窗口

与工具提示一样，弹出窗口可以包含有关数据的更多信息。单击时会显示地图中的弹出窗口，并且可以根据您的喜好进行自定义。使用 Leaflet，可以使用名为bindPopup.

由于我们在地图对象上显示海滩，我决定在弹出窗口中显示每个海滩的名称。我只是将文本添加到函数并将其绑定到每个标记：

```text
const marker1 = L.marker([-37.699450, 176.279420], {icon: basicBeachIcon})
    .bindPopup('Whitehaven Beach, Whitsunday Island')
    .addTo(map);
const marker2 = L.marker([-27.643310, 153.305140], {icon: basicBeachIcon})
    .bindPopup('Turquoise Bay Exmouth, Australia')
    .addTo(map);
const marker3 = L.marker([-33.956330, 122.150270], {icon: basicBeachIcon})
    .bindPopup('Cape Le Grand National Park Esperance, Australia')
    .addTo(map);
const marker4 = L.marker([-34.962390, 117.391220], {icon: basicBeachIcon})
    .bindPopup('Greens Pool Denmark, Australia')
    .addTo(map);
const marker5 = L.marker([-17.961210, 122.214820], {icon: basicBeachIcon})
    .bindPopup('Cable Beach Broome, Australia')
    .addTo(map);
const marker6 = L.marker([-16.505960, 151.751520], {icon: basicBeachIcon})
    .bindPopup('Matira Beach, Society Islands')
    .addTo(map);
const marker7 = L.marker([-22.594400, 167.484440], {icon: basicBeachIcon})
    .bindPopup('Piscine Naturelle Ile Des Pins, New Caledonia')
    .addTo(map);
const marker8 = L.marker([-37.977000, 177.057000], {icon: basicBeachIcon})
    .bindPopup('Ohope Beach Whakatane, New Zealand')
    .addTo(map);
const marker9 = L.marker([-41.037600, 173.017000], {icon: basicBeachIcon})
    .bindPopup('Kaiteriteri Beach, New Zealand')
    .addTo(map);
const marker10 = L.marker([-37.670300, 176.212000], {icon: basicBeachIcon})
    .bindPopup('Mt Maunganui Main Beach, New Zealand')
    .addTo(map);
```

这是一个包装！您可以在CodePen上找到整个代码。

  

![](https://pic4.zhimg.com/v2-a3a802f2e9dce0e14b0a90e1067dcf11_b.jpg)

  ---

## Leaflet 地图的其他自定义项

除了我在本教程中向您展示的内容之外，Leaflet 还有大量自定义选项——例如添加圆形或多边形等形状、自定义弹出窗口以及添加事件。您可以查看官方文档中的说明以及Leaflet 提供的众多示例。

一个插件打开了整个定制领域，而作为开源的 Leaflet 有许多第三方插件，可以为原始地图提供扩展功能。您可以在此处搜索 Leaflet 社区开发的任何插件。您可以使用 Leaflet 插件添加更多地图图块、页面、URL 模板、PNG 图像、图块图像、高级缩放选项和增强的图块交互。还可以选择使用 Google 的 API 进行定位和搜索。

---

## 结论

如您所见，使用 Leaflet 等 JS 库创建交互式地图非常简单快捷。安装无忧，工作高效，代码可读，所有映射都由库方便地处理。它也是创建适合移动设备的交互式地图的绝佳选择，因为它适用于所有移动平台。除了出色的可用性外，Leaflet 还支持大量自定义选项。如果您有任何问题或建议，请告诉我。

---