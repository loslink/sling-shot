import cax from '../libs/cax'

import BunblePoint from './bunblepoint.js'
const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const graphics = new cax.Graphics()

const BG_IMG_SRC = 'images/ic_bg.jpg'
const SLING_IMG_SRC = 'images/ic_slingshot.png'
const BG_WIDTH = 1080
const BG_HEIGHT = 1920
const SLING_WIDTH = 363
const SLING_HEIGHT = 367

var slingWidthReal = 0
var slingHeightReal = 0
var slingShotTopY
var slingShotLeftX
var leftCenterPiStartX, leftCenterPiStartY, rightCenterPiEndX, rightCenterPiEndY

var touchX = null
var touchY = null

var sx
var centerPiW = 200
var bunblePoint = new BunblePoint()
var that

export default class Slingshot extends cax.Group {
  constructor () {
    super()

    that=this
    this.init()
    // bunblePoint.x=1001
    // bunblePoint.printX()
    this.bg = new cax.Bitmap(BG_IMG_SRC)
    this.sling = new cax.Bitmap(SLING_IMG_SRC)

    this.bg.scaleX  = screenWidth / BG_WIDTH
    this.bg.scaleY = screenHeight / BG_HEIGHT

    this.sling.scaleX = sx
    this.sling.scaleY = sx

    this.sling.x = slingShotLeftX
    this.sling.y = slingShotTopY

    this.add(this.bg,this.sling)

    // graphics.rotation=90

    this.drawRubber()

    wx.onTouchStart(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      console.log("onTouchStart touchX:" + touchX)
    })

    wx.onTouchMove(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      console.log("onTouchMove touchX:" + touchX)
      // that.drawRubber()
    })

    wx.onTouchEnd(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      console.log("onTouchEnd touchX:" + touchX)
    })
  }

  init(){

    sx = (screenWidth / SLING_WIDTH) * 0.6
    slingWidthReal = SLING_WIDTH * sx
    slingHeightReal = SLING_HEIGHT * sx

    slingShotTopY = screenHeight - SLING_HEIGHT * sx
    slingShotLeftX = screenWidth / 2 - SLING_WIDTH * sx / 2

    touchX = 0;
    touchY = slingShotTopY;

    leftCenterPiStartX = screenWidth / 2 -centerPiW / 2;
    leftCenterPiStartY = slingShotTopY;

    rightCenterPiEndX = screenWidth / 2+centerPiW / 2;
    rightCenterPiEndY = slingShotTopY;

    // paramB = canvasHeight / 4;

    // startX = -canvasWidth / 2 + DipToPx.dipToPx(mContext, 50);
    // endX = canvasWidth / 2 - DipToPx.dipToPx(mContext, 50);
    // startY = DipToPx.dipToPx(mContext, 50);
    // endY = DipToPx.dipToPx(mContext, 100);
  }

  
  drawRubber() {
    //前橡胶
    // canvas.drawLine(-(canvasWidth / 2 - circleSling.getWidth() / 2),
    //   slingShotTopY,
    //   touchX,
    //   touchY,
    //   rubberPaint);

    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(slingShotLeftX+20, slingShotTopY)
      .lineTo(touchX, touchY)
      .lineWidth(10)
      .strokeStyle('#FFFF00')
      .stroke()

    // //后橡胶
    // canvas.drawLine(touchX,
    //   touchY,
    //   circleSling.getWidth() / 2,
    //   slingShotTopY,
    //   rubberPaint);

    this.add(graphics)

}


  update() {

  }


}
