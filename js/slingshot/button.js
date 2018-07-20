import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const scaleValue = 4
const screenWidth = info.windowWidth * scaleValue
const screenHeight = info.windowHeight * scaleValue
const easing = cax.To.easing.elasticInOut

var option
var that
var button
var callback
var buttonWidth = 80 * scaleValue

export default class StartButton extends cax.Group {
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


  drawButton() {
    if (button != null) {
      this.remove(button)
    }
    button = new cax.Button({
      width: buttonWidth,
      height: buttonWidth,
      borderColor: '#65cca1',
      backgroundColor: '#65cca1',
      color: '#ffffff',
      font: (15 * scaleValue)+'px Arial',
      borderRadius: buttonWidth/2,
      textY: -5 * scaleValue,
      text: "开 始"
    })

    button.x = screenWidth / 2 - buttonWidth/2
    button.y = screenHeight / 2 - buttonWidth/2
    this.add(button)

    
    button.on('tap', function(){
      console.log('tap')
      that.callback('tap');
      button.originX = buttonWidth/2
      button.originY = buttonWidth/2

      button.x = button.x + buttonWidth/2
      button.y = button.y + buttonWidth/2

      cax.To.get(button)
        .to({ scaleX: 4, scaleY: 4, alpha: 0 }, 300)
        .end(() => {
          button.alpha = 1
          that.remove(button)
          console.log("Task two has completed!")
          that.callback('dismiss');
        })
        .start()
    })

    this.scaleX = 1 / scaleValue
    this.scaleY = 1 / scaleValue
  }


}
