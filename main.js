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
      'rgb(131, 174, 155)'
    ],
    mainBtnInfos: [
      {
        mainText: 'LivePlay',
        content: 
          'The MusicMaker-LivePlay is a web app to playing keyboard instruments.<br>\
          Features:<br>\
          Instrument change<br>\
          Octive change<br>\
          Play with keyboard<br>\
          <a href="https://sien75.github.io/musicmaker/liveplay">Have a try!</a>\
          '
      },
      {
        mainText: 'Arranger',
        content: 
          'The MusicMaker-Arranger is a web app to make simple musics.<br>\
          Features:<br>\
          Multi viewport edit.<br>\
          Upload/download music files.<br>\
          <a href="https://sien75.github.io/musicmaker/Arranger">Have a try!</a>\
          '
      },
      {
        mainText: 'About',
        content: 
          `Student, living in Nanjing, China.<br>\
          Looking for job.<br>\
          <a href="https://www.github.com/sien75">Github</a><br>\
          <a href="mailTo:smooooooe@hotmail.com">Email</a><br>\
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