import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const scaleValue = 4
const screenWidth = info.windowWidth * scaleValue
const screenHeight = info.windowHeight * scaleValue
const easing = cax.To.easing.elasticInOut

var option

export default class Score extends cax.Group {
  constructor() {
    super()

    // this.setOptions({
    //   color: '',
    //   font: '120px Arial'
    // })
    // this.drawText('Score:0')
   
  }

  setOptions(option){
    this.option=option
  }

  drawText(value) {
    this.option = this.option || {}
    if (this.option.color == null || this.option.color == '') this.option.color = '#ffffff'
    if (this.option.font == null || this.option.font == '') this.option.font = '20px Arial'
    if (this.option.y == null || this.option.y == '') this.option.y = 50
    if ((this.option.lastAlpha == null || this.option.lastAlpha == '' ) && this.option.lastAlpha != 0) this.option.lastAlpha = 1
    if (this.option.isAnim == null) this.option.isAnim = true
    
    var text = new cax.Text(value, {
      font: (this.option.font * scaleValue) + 'px Arial',
      color: this.option.color,
      baseline: 'top'
    })

    this.empty()
    this.add(text)

    var textWidth=text.getWidth()
    text.x = screenWidth / 2  //基准点的位置，不是左上角位置，与originX有关
    text.y = this.option.y * scaleValue
    text.originX = textWidth/2 //基准点以文本左上角为基准

    if (this.option.isAnim){
      cax.To.get(text)
        .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
        .to({ scaleX: 1, scaleY: 1, alpha: this.option.lastAlpha }, 300)
        .start()
    }

    this.scaleX = 1/scaleValue
    this.scaleY = 1/scaleValue
  }



}
