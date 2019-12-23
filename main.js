let app = new Vue({
  el: '#app',
  data: {
    size: {
      innerHeightD: window.innerHeight * window.devicePixelRatio,
      innerWidthD: window.innerWidth * devicePixelRatio,
      devicePixelRatio: window.devicePixelRatio
    },
    colors: [
      'rgb(248, 204, 174)',
      'rgb(239, 69, 102)',
      'rgb(131, 174, 155)',
    ],
    mainBtnInfos: [
      {
        mainText: 'LivePlay',
        content: `
          The MusicMaker LivePlay is a web app to playing keyboard instruments.<br>
          Features:<br>
          Instrument change<br>
          Octive change<br>
          Play with keyboard<br>
          <a href="https://sien75.github.io/musicmaker/liveplay">Have a try!</a>
        `
      },
      {
        mainText: 'Arranger',
        content: `
          The MusicMaker Arranger is a web app to make simple musics.<br>
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
          Random-Wallpaper is a desktop application, which can randomly get images and change your wallpaper.<br>
          Features:<br>
          Support Windows and Linux.<br>
          Multi sources.<br>
          <a href="https://github.com/sien75/random-wallpaper">Have a try!</a>
        `
      },
      {
        mainText: 'About',
        content: `
          Student, living in Nanjing, China.<br>\
          <a href="https://www.github.com/sien75">Github</a><br>\
          email:<a href="mailTo:smooooooe@hotmail.com">smooooooe@hotmail.com</a><br>\
        `
      }
    ],
  },
})

window.onresize = function () {
  app.size = {
    innerHeightD: window.innerHeight * window.devicePixelRatio,
    innerWidthD: window.innerWidth * devicePixelRatio,
    devicePixelRatio: window.devicePixelRatio
  };
}