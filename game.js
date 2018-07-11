import cax from './js/libs/cax'

import Slingshot from './js/slingshot/slingshot'
// import Player from './js/player'
// import EnemyGroup from './js/enemy-group'
// import Music from './js/music'

const bg = new Slingshot()
// const player = new Player()
const stage = new cax.Stage()
// const enemyGroup = new EnemyGroup()
// const music = new Music()
const info = wx.getSystemInfoSync()
const screenHeight = info.windowHeight
// var worker = wx.createWorker('workers/request/index.js')  // 文件名指定 worker 的入口文件路径，绝对路径

stage.add(bg)

// stage.add(player.bulletGroup)

// stage.add(graphics)

// let touchX = null
// let touchY = null

// wx.onTouchStart(function (e) {
//   touchX = e.touches[0].clientX
//   touchY = e.touches[0].clientY
// })

// wx.onTouchMove(function (e) {
//   touchX = e.touches[0].clientX
//   touchY = e.touches[0].clientY
// })

function update () {
  stage.update()
  // bg.update()

  // player.update()
  // if (touchX !== null) {
  //   player.x = touchX
  //   player.y = touchY
  // }
  // enemyGroup.update()

  // enemyGroup.children.forEach(enemy => {
  //   player.bulletGroup.children.forEach(bullet => {
  //     if (bullet.isCollideWith(enemy)) {
  //       bullet.visible = false
  //       enemy.explode()
  //       music.playExplosion()
  //     }
  //   })
  // })

  // worker.postMessage({
  //   msg: { cityName: "", stationName: "贵阳" }// value是外界传过来的如：{cityName: "", stationName: "贵阳"}
  // })
  requestAnimationFrame(update)
}

update()


// const text = new cax.Text('powered by cax', {
//     font: '20px Arial',
//     color: '#42B035',
//     baseline: 'top'
//   })
// text.y = screenHeight - 30
// text.x = 4
// text.alpha = 0.6
// stage.add(text)

// cax.To.get(text).to().x(100, 2000, cax.easing.elasticInOut).start()