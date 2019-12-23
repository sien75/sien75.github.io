## Introduction
This is the repository of my [home page](https://sien75.github.io).   
[中文版](https://gitee.com/sien75/home)
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