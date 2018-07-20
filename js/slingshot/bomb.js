import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const scaleValue = 4
const screenWidth = info.windowWidth * scaleValue
const screenHeight = info.windowHeight * scaleValue
const easing = cax.To.easing.elasticInOut

var option
var that
var circle
var callback
var radius = 5 * scaleValue

export default class Bomb extends cax.Group {
  constructor() {
    super()
    that=this
  }

  setOptions(option){
    this.option=option
  }

  onClickListenr(callback) {
    this.callback = callback
  } 


  drawBomb(mX,mY) {
    if (circle != null) {
      this.remove(circle)
    }
   circle = new cax.Circle(radius,{
     fillStyle:"#FFFF00"
    })
    circle.x = mX * scaleValue
    circle.y = mY * scaleValue
    // circle.originX = radius
    // circle.originY = radius
    this.add(circle)
    cax.To.get(circle)
      .to({ scaleX: 4, scaleY: 4, alpha: 0 }, 300)
      .end(() => {
        that.remove(circle)
        console.log("circle completed!")
      })
      .start()
    this.scaleX = 1 / scaleValue
    this.scaleY = 1 / scaleValue
  }


}
