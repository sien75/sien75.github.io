[中文版](#介绍)
## Introduction
This is the repository of my [home page](https://sien75.github.io).   
## Usage
If you want to use this model for your website, here is the steps:

Introduce vue.min.js file from cdn or local. Introduce the drawPage.js file to get the "draw-page" component.
```
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script src="./drawPage.js"></script>
```
Then write in your own html file like this
```
<draw-page
    :size="size"
    :colors="colors"
    :main-btn-infos="mainBtnInfos"
>
```
Then write in your own js file like this
```
let app = new Vue({
  el: '#id',
  data() {
    return {
      size: {
        innerHeightD: window.innerHeight * window.devicePixelRatio,
        innerWidthD: window.innerWidth * devicePixelRatio,
        devicePixelRatio: window.devicePixelRatio
      },
      colors: [
        'rgb(*, *, *)',
        'rgb(*, *, *)',
        'rgb(*, *, *)'
      ],
      mainBtnInfos: [
        {
          mainText: 'mainText0',
          content: 'content0'
        },
        ...
      ],
    }
  },
})
```
What you should do is setting 3 colors and mainBtnInfos. The "content" part supports html format.   
Make sure include codes below to adapt the change of window size.
```
window.onresize = function () {
  app.size = {
    innerHeightD: window.innerHeight * window.devicePixelRatio,
    innerWidthD: window.innerWidth * devicePixelRatio,
    devicePixelRatio: window.devicePixelRatio
  };
}
```
The web page performs well on Chrome(Windows & Android) and Safari(iOS).
## 介绍
这是我的[主页](https://sien75.gitee.io/home)的仓库。（当时并不会Vue的服务端渲染，不知道Vue组件，实现方式有点拙劣...）   
## 使用
如果你想把这个软件模板用在你的网站上，请按照以下步骤做：

从cdn或者本地引入vue.min.js文件，引入drawPage.js文件以获得draw-page组件。
```
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script src="./drawPage.js"></script>
```
之后，在你的html文件里这样写
```
<draw-page
    :size="size"
    :colors="colors"
    :main-btn-infos="mainBtnInfos"
>
```
之后再你的js文件里这样写
```
let app = new Vue({
  el: '#id',
  data: {
    size: {
      innerHeightD: window.innerHeight * window.devicePixelRatio,
      innerWidthD: window.innerWidth * devicePixelRatio,
      devicePixelRatio: window.devicePixelRatio
    },
    colors: [
      'rgb(*, *, *)',
      'rgb(*, *, *)',
      'rgb(*, *, *)'
    ],
    mainBtnInfos: [
      {
        mainText: 'mainText0',
        content: 'content0'
      },
      ...
    ],
  },
})
```
你需要做的就是设置好3个合适的颜色和mainBtnInfos中的信息，content部分是支持html格式的。   
此外，一定要把下面一段写到你的代码里，这样页面就可以适应窗口大小的变化了。
```
window.onresize = function () {
  app.size = {
    innerHeightD: window.innerHeight * window.devicePixelRatio,
    innerWidthD: window.innerWidth * devicePixelRatio,
    devicePixelRatio: window.devicePixelRatio
  };
}
```
这个Web页面在Chrome(Windows & Android)和Safari(iOS)表现都很好。