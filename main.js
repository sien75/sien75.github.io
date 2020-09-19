let infos = {};
infos.English = [
  {
    mainText: 'MusicMaker',
    content: `
      The <b>MusicMaker-LivePlay</b> is a web app to play keyboard instruments.<br>
      Features:<br>
      Instrument change<br>
      Octive change<br>
      Play with keyboard<br>
      <a href="https://sien75.github.io/musicmaker/liveplay">Have a try!</a>
      <br><br>
      The <b>MusicMaker-Arranger</b> is a web app to make simple musics.<br>
      (Unfinished)<br>
      Features:<br>
      Multi viewport edit.<br>
      Upload/download music files.<br>
      <a href="https://sien75.github.io/musicmaker/arranger">Have a try!</a>
    `
  },
  {
    mainText: 'R-W',
    content: `
      <b>Random-Wallpaper</b> is a desktop application, which can randomly get images and change your wallpaper.<br>
      Features:<br>
      Support Windows and Linux.<br>
      Multi sources.<br>
      <a href="https://github.com/sien75/random-wallpaper">Have a try!</a>
    `
  },
  {
    mainText: 'Blog',
    content: `
      This is my tech blog mainly about front-end, including some summaries(written in Chinese)<br>
      <a href="https://sien75.github.io/blog">Take a look!</a><br><br>
      Many times we don't need a long essay, but just search the Internet for specific questions.<br>
      So I'll put my tips on juejin.im and others can find and use it.<br>
      <a href="https://juejin.im/">My Juejin Homepage</a>
    `
  },
  {
    mainText: 'About',
    content: `
      Student, living in Nanjing, China.<br>\
      <a href="https://www.github.com/sien75">Github</a><br>\
      email:<a href="mailTo:sien75@icloud.com">sien75@icloud.com</a><br>\
    `
  }
]
infos['中文'] = [
  {
    mainText: 'MusicMaker',
    content: `
      <b>MusicMaker-LivePlay</b>是一个可以演奏键盘类乐器的Web程序<br>
      特点:<br>
      改变乐器<br>
      改变八度<br>
      可以使用键盘演奏<br>
      <a href="https://sien75.github.io/musicmaker/liveplay">尝试一下!</a>
      <br><br>
      <b>MusicMaker-Arranger</b>是一个可以制作简单音乐的Web程序<br>
      (未完成)<br>
      特点:<br>
      多视窗编辑<br>
      上传/下载音乐文件<br>
      <a href="https://sien75.github.io/musicmaker/arranger">尝试一下!</a>
    `
  },
  {
    mainText: '随机壁纸',
    content: `
      <b>随机壁纸</b>是一款可以随机获得图片并把图片设置为桌面壁纸的电脑软件<br>
      特点:<br>
      支持Windows和Linux<br>
      多图片源<br>
      <a href="https://github.com/sien75/random-wallpaper">尝试一下!</a>
    `
  },
  {
    mainText: '博客',
    content: `
      这是我的技术博客，主要和前端有关，包括一些知识点总结<br>
      <a href="https://sien75.github.io/blog">看一看吧!</a><br><br>
      许多时候我们并不需要长篇大论，而仅仅是会在网上搜索具体的问题。<br>
      所以我会把能够对大家有用的小知识取出来，再放在掘金上，以便于被搜索并且使用到。<br>
      <a href="https://juejin.im/user/3218971592767549">我的掘金主页</a>
      `
  },
  {
    mainText: '关于',
    content: `
      大学生,就读于南京市东南大学<br>
      <a href="https://www.github.com/sien75">Github</a><br>
      email:<a href="mailTo:sien75@icloud.com">sien75@icloud.com</a>
    `
  }
]

let app = new Vue({
  el: '#app',
  data() {
    return {
      size: {
        innerHeightD: window.innerHeight * window.devicePixelRatio,
        innerWidthD: window.innerWidth * devicePixelRatio,
        devicePixelRatio: window.devicePixelRatio
      },
      colors: [
        '#2ecc71',
        '#34495e',
        '#3498db',
      ],
      curLang: 'English',
      toBeChangedLang: '中文'
    }
  },
  computed: {
    mainBtnInfos () {
      return infos[this.curLang];
    },
  },
  methods: {
    changeLang () {
      [this.curLang, this.toBeChangedLang] = [this.toBeChangedLang, this.curLang];
      rsz();
    }
  }
})

function rsz () {
  app.size = {
    innerHeightD: window.innerHeight * window.devicePixelRatio,
    innerWidthD: window.innerWidth * devicePixelRatio,
    devicePixelRatio: window.devicePixelRatio
  };
}
window.onresize = rsz;
window.oncontextmenu = function (e) {
  e.preventDefault();
}