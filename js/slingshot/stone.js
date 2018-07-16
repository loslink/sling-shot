import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const graphics = new cax.Graphics()

var that
var zbX,zbY
var stoneX=0,stoneY=0
var paramA,paramB


export default class Stone extends cax.Group {
  constructor(zbX, zbY) {
    super()

    this.zbX=zbX
    this.zbY=zbY
    that = this
    this.x = zbX;
    this.y = zbY;
    this.scaleY=-1
  }

  start(){
    cax.setInterval(function () {
      stoneY = stoneY + 2
      that.update()
    }, 16)
  }

  update() {
    graphics
      .clear()
      .beginPath()
      .fillStyle("#FFFF00")
      .arc(stoneX, stoneY, 5, 0, Math.PI * 2)
      .fill();
    this.remove(graphics)
    this.add(graphics)
  }

  getSecondZeroX(){
    return paramA*Math.PI;
  }

  calcuParams(){
    var b=
  }

}
