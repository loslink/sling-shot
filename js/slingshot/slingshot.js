import cax from '../libs/cax'

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

var touchX = null
var touchY = null

export default class Slingshot extends cax.Group {
  constructor () {
    super()

    this.bg = new cax.Bitmap(BG_IMG_SRC)
    this.sling = new cax.Bitmap(SLING_IMG_SRC)

    this.bg.scaleX  = screenWidth / BG_WIDTH
    this.bg.scaleY = screenHeight / BG_HEIGHT

    var sx = (screenWidth / SLING_WIDTH) * 0.6
    this.sling.scaleX = sx
    this.sling.scaleY = sx

    slingWidthReal = SLING_WIDTH * sx
    slingHeightReal = SLING_HEIGHT * sx

    slingShotTopY = screenHeight - SLING_HEIGHT * sx 
    slingShotLeftX = screenWidth / 2 - SLING_WIDTH * sx / 2
    
    this.sling.x = slingShotLeftX
    this.sling.y = slingShotTopY

    this.add(this.bg,this.sling)

    // graphics.rotation=90

    this.drawRubber()

    wx.onTouchStart(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    })

    wx.onTouchMove(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    })

    wx.onTouchEnd(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    })
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
      .lineTo(160, slingShotTopY)
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





}
