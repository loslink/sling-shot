import cax from '../libs/cax'

import BunblePoint from './bunblepoint.js'
import Music from './music'
import Stone from './stone.js'
const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const graphics = new cax.Graphics()

const BG_IMG_SRC = 'images/ic_bg.jpg'
const SLING_IMG_SRC = 'images/ic_slingshot.png'
const TARGET_IMG_SRC = 'images/ic_ba.png'
const BG_WIDTH = 1080
const BG_HEIGHT = 1920
const SLING_WIDTH = 363
const SLING_HEIGHT = 367
const TARGET_WIDTH = 74
const TARGET_HEIGHT = 96

var slingWidthReal = 0
var slingHeightReal = 0
var slingShotTopY
var slingShotLeftX
var leftCenterPiStartX, leftCenterPiStartY, rightCenterPiEndX, rightCenterPiEndY

var touchX = null
var touchY = null

var sx
var centerPiW = 60
var rubberHeight=8
var bunblePoint = new BunblePoint()
const music = new Music()
var that
var startX, endX, startY, endY
var targetX, targetY
var targetWidthReal
var stone

function onShotListenr(state) {
  
  //延时执行
  setTimeout(function () {
    that.getTargetPoint()
  }, 500)
  
  if (state=='success'){
    wx.showToast({
      title: '成功',
      duration: 1000
    })
    music.playExplosion()
  }else{

  }
  console.log("state:" + state)
} 

export default class Slingshot extends cax.Group {
  constructor() {
    super()

    that = this

    this.bg = new cax.Bitmap(BG_IMG_SRC)
    this.sling = new cax.Bitmap(SLING_IMG_SRC)
    this.target = new cax.Bitmap(TARGET_IMG_SRC)
    this.init()
    stone = new Stone(screenWidth / 2, slingShotTopY)
    stone.init(slingShotTopY, slingWidthReal, slingHeightReal, centerPiW, targetWidthReal)

    this.bg.scaleX = screenWidth / BG_WIDTH
    this.bg.scaleY = screenHeight / BG_HEIGHT

    this.sling.scaleX = sx
    this.sling.scaleY = sx

    this.sling.x = slingShotLeftX
    this.sling.y = slingShotTopY

    this.add(this.bg, this.sling)
    this.getTargetPoint()
    // graphics.rotation=90

    this.drawRubber()

    wx.onTouchStart(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      that.getleftCenterPiStartPoint()
      // console.log("onTouchStart touchX:" + touchX)
    })

    wx.onTouchMove(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      that.getleftCenterPiStartPoint()
      // console.log("onTouchMove touchX:" + touchX)
      that.drawRubber()
    })

    wx.onTouchEnd(function (e) {
      that.touchUp()
      that.drawRubber()
      // console.log("onTouchEnd touchX:" + touchX)
    })
    
    // cax.setInterval(function () {
    //   that.drawRubber()
    // }, 16)
  }

  init() {

    targetWidthReal = screenWidth * 0.1
    sx = (screenWidth / SLING_WIDTH) * 0.6
    slingWidthReal = SLING_WIDTH * sx
    slingHeightReal = SLING_HEIGHT * sx

    slingShotTopY = screenHeight - SLING_HEIGHT * sx
    slingShotLeftX = screenWidth / 2 - SLING_WIDTH * sx / 2

    leftCenterPiStartX = screenWidth / 2 - centerPiW / 2;
    leftCenterPiStartY = slingShotTopY;

    rightCenterPiEndX = screenWidth / 2 + centerPiW / 2;
    rightCenterPiEndY = slingShotTopY;

    touchX = screenWidth / 2;
    touchY = slingShotTopY;

    // paramB = canvasHeight / 4;

    startX = 50;
    endX = screenWidth - 50;
    startY = screenHeight / 2;
    endY = screenHeight / 2 + 50;

  }

  getTargetPoint() {
    targetX = (Math.random() * (endX - startX) + startX);
    targetY = (Math.random() * (endY - startY) + startY);

    this.target.x = targetX
    this.target.y = targetY

    this.target.scaleX = screenWidth * 0.1 / TARGET_WIDTH
    this.target.scaleY = screenWidth * 0.1 / TARGET_WIDTH

    this.remove(this.target)
    this.add(this.target)
  }

  touchUp() {

    this.startShot(touchX, touchY)

    touchX = screenWidth / 2;
    touchY = slingShotTopY;
    leftCenterPiStartX = screenWidth / 2 - centerPiW / 2;
    leftCenterPiStartY = slingShotTopY;

    rightCenterPiEndX = screenWidth / 2 + centerPiW / 2;
    rightCenterPiEndY = slingShotTopY;

   
    // touchCenterX = touchX - screenWidth / 2;
    // touchCenterY = touchY - screenHeight / 2;

    // isShot = true;
    // point.x = 0;
    // point.y = 0;
    // point.alpha = 255;
    // calcuParams();
    // startShot();
  }

  getleftCenterPiStartPoint() {
    var A = (slingWidthReal / 2) - (screenWidth / 2 - touchX);
    var B = touchY - slingShotTopY;
    var C = centerPiW / 2;
    leftCenterPiStartX = -(A * C) / Math.sqrt(A * A + B * B) + touchX;
    leftCenterPiStartY = touchY - (B * C) / Math.sqrt(A * A + B * B);

    var A2 = (screenWidth / 2) + (slingWidthReal / 2) - touchX;
    rightCenterPiEndX = (A2 * C) / Math.sqrt(A2 * A2 + B * B) + touchX;
    rightCenterPiEndY = touchY - (B * C) / Math.sqrt(A2 * A2 + B * B);
  }

  drawRubber() {

    this.scaleX = 2
    this.scaleY = 2
    graphics.cache(0, slingShotTopY - 10, screenWidth, screenHeight)
    graphics.clear()

    //前橡胶
    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(slingShotLeftX + 20, slingShotTopY)
      .lineTo(touchX, touchY)
      .lineWidth(rubberHeight)
      .strokeStyle('#FFFF00')
      .stroke()

    //后橡胶
    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(touchX, touchY)
      .lineTo(slingShotLeftX + slingWidthReal - 20, slingShotTopY)
      .lineWidth(rubberHeight)
      .strokeStyle('#FFFF00')
      .stroke()


    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(leftCenterPiStartX, leftCenterPiStartY)
      .lineTo(touchX, touchY)
      .lineWidth(20)
      .strokeStyle('#191818')
      .stroke()

    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(touchX, touchY)
      .lineTo(rightCenterPiEndX, rightCenterPiEndY)
      .lineWidth(20)
      .strokeStyle('#191818')
      .stroke()

    graphics
      .beginPath()
      .fillStyle("#FFFF00")
      .arc(touchX, touchY, 5, 0, Math.PI * 2)
      .fill();

    // this.empty(); 
    this.remove(graphics)
    this.add(graphics)

    this.scaleX = 1
    this.scaleY = 1

  }

  startShot(x,y){
    stone.onShotListenr(onShotListenr)
    this.remove(stone)
    this.add(stone)
    stone.start(x, y, targetX, targetY)
    music.playShoot()
    
  }

  update() {

  }


}
