import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const graphics = new cax.Graphics()
const easing = cax.To.easing.elasticInOut
var width=80

export default class Test extends cax.Group {
  constructor() {
    super()
  
    this.drawRubber()

  }

  

  drawRubber() {
    graphics.clear()
    // this.scaleX = 4
    // this.scaleY = 4
    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(20, 20)
      .lineTo(80, 80)
      .lineWidth(width)
      .strokeStyle('#FFFF00')
      .stroke()

    graphics
      .beginPath()
      .lineCap('round')
      .moveTo(20, 200)
      .lineTo(200, 200)
      .lineWidth(40)
      .strokeStyle('#FFFF00')
      .stroke()

    // this.remove(graphics)
    // this.add(graphics)

    // this.scaleX = 0.25
    // this.scaleY = 0.25

    // const text = new cax.Text('Hello World', {
    //   font: '20px Arial',
    //   color: '#ffffff',
    //   baseline: 'top'
    // })
    
    // var textWidth=text.getWidth()
    // text.x = screenWidth / 2  //基准点的位置，不是左上角位置，与originX有关
    // text.y = 50
    // text.originX = textWidth/2 //基准点以文本左上角为基准
    // cax.To.get(text)
    //   .to({ scaleX: 1.5, scaleY: 1.5}, 2000, easing)
    //   .to({ scaleX: 1, scaleY: 1 }, 2000, easing)
    // .start()
    // this.add(text)
    // cax.To.get(text)
    //   .to({ scaleX: 2, scaleY: 2, originX:20}, 2000, easing)
    // // .scaleX(2, 1000, cax.easing.elasticInOut)
    // //   .scaleY(2, 1000, cax.easing.elasticInOut)
    //   .to({ scaleX: 1, scaleY: 1 }, 2000, easing)
    //   .cycle()
    //   .start()

    
    // cax.To.get(graphics)
    //   .to({ y: 340, rotation: 240 }, 2000, easing)
    //   .begin(() => {
    //     console.log("Task one has began!")
    //   })
    //   .progress(() => {
    //     console.log("Task one is progressing!")
    //   })
    //   .end(() => {
    //     console.log("Task one has completed!")
    //   })
    //   .wait(500)
    //   .to()
    //   .rotation(0, 1400, easing)
    //   .begin(() => {
    //     console.log("Task two has began!")
    //   })
    //   .progress(() => {
    //     console.log("Task two is progressing!")
    //   })
    //   .end(() => {
    //     console.log("Task two has completed!")
    //   })
    //   .start();
  }



}
