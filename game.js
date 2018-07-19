import cax from './js/libs/cax'

import Slingshot from './js/slingshot/slingshot'

const slingshot = new Slingshot()

const stage = new cax.Stage()
const info = wx.getSystemInfoSync()
const screenHeight = info.windowHeight
const screenWidth = info.windowWidth
const scaleValue=4
// var worker = wx.createWorker('workers/request/index.js')  // 文件名指定 worker 的入口文件路径，绝对路径

const BG_IMG_SRC = 'images/ic_bg.jpg'
const bg = new cax.Bitmap(BG_IMG_SRC)
const BG_WIDTH = 1080
const BG_HEIGHT = 1920
bg.scaleX = screenWidth / BG_WIDTH
bg.scaleY = screenHeight / BG_HEIGHT

stage.canvas.width = screenWidth * scaleValue 
stage.canvas.height = screenHeight * scaleValue 
stage.add(bg, slingshot)

stage.scaleX = scaleValue
stage.scaleY = scaleValue

function update () {
  stage.update()
 
  // enemyGroup.children.forEach(enemy => {
  //   player.bulletGroup.children.forEach(bullet => {

  //   })
  // })

  // worker.postMessage({
  //   msg: { cityName: "", stationName: "贵阳" }// value是外界传过来的如：{cityName: "", stationName: "贵阳"}
  // })
  requestAnimationFrame(update)
}
update()
