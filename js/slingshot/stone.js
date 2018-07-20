import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const graphics = new cax.Graphics()

var that
var zbX,zbY
var slingShotTopY
var stoneX=0,stoneY=0
var shotX = 0, shotY = 0
var paramA,paramB
// var xPercent = 0.8
var touchX = null
var touchY = null
var isArride=true
var targetX, targetY

var slingWidthReal
var slingHeightReal
var centerPiW
var baWid
var stoneRadius=5
var callback
var shotHuan=0

function getSecondZeroX(paA){
  return paA * Math.PI;
}

/**
* 有没有击中靶
* @return
*/
function isShotSuccess(shotX, shotY, targetX, targetY, baWid) {
  
  var distance = Math.sqrt((shotX - (targetX + baWid / 2)) * (shotX - (targetX + baWid / 2))+ (shotY - (targetY - baWid / 2)) * (shotY - (targetY - baWid / 2)));
  if (distance <= (baWid / 2 + stoneRadius / 2)) {
    shotHuan = 1 - (distance / (baWid / 2 + stoneRadius / 2));
    return true;
  }else{
    shotHuan = 0
  }
  return false;
}

export default class Stone extends cax.Group {
  constructor(zbX, zbY) {
    super()

    this.zbX=zbX
    this.zbY=zbY
    that = this
    this.x = zbX;
    this.y = zbY;
    this.scaleY=-1
    this.paramB = screenHeight / 4;

    cax.setInterval(function () {
      if (!isArride) {
        that.calcuPoints()
        that.update()
      }
    }, 16)
  }

  onShotListenr(callback) {
    this.callback = callback
  } 

  init(slingShotTopY, slingWidthReal, slingHeightReal, centerPiW, targetWidthReal){
    this.slingShotTopY = slingShotTopY
    this.slingWidthReal = slingWidthReal
    this.slingHeightReal = slingHeightReal
    this.centerPiW = centerPiW
    this.baWid = targetWidthReal
  }

  start(touchX, touchY, targetX, targetY){
   
    isArride=false
    this.stoneX = 0
    this.stoneY = 0
    this.touchX = touchX - screenWidth / 2
    this.touchY = this.slingShotTopY-touchY
    this.targetX = targetX - screenWidth / 2
    this.targetY = this.slingShotTopY - targetY
    this.calcuParams()
    
    // for (var i = 0; i < screenWidth / 2;i++){
    //   if (!this.isArride) {
    //     that.calcuPoints()
    //     that.update()
    //   }
    // }
  }

  update() {
    this.scaleX = 2
    this.scaleY = -2
    graphics.clear()
    this.empty()
    if (this.stoneX != 0 && this.stoneY != 0) {
      graphics
        .beginPath()
        .fillStyle("#FFFF00")
        .arc(this.stoneX, this.stoneY, stoneRadius, 0, Math.PI * 2)
        .fill();
      this.remove(graphics)
      this.add(graphics)
    }
    this.scaleX = 1
    this.scaleY = -1
  }

  

  calcuParams(){
    var b =Math.abs(this.touchY);
    var a = Math.abs(this.touchX);
    this.paramA = (a / b) * this.paramB;

    this.paramB = (screenHeight * 0.33) * (Math.abs(this.touchY) / this.slingHeightReal);
  }

   calcuPoints() {
     this.getStoneRadius()
    var step = 1;
     step = Math.abs(getSecondZeroX(this.paramA)) / (screenWidth / 6);
    if (this.touchX <= 0 && this.touchY <= 0) {//第三象限
      this.getNextPoint(this.stoneX, this.stoneY, step, this.paramA, this.paramB);
    }else if (this.touchX > 0 && this.touchY <= 0) {//第四象限
      this.getNextPoint(this.stoneX, this.stoneY, -step, -this.paramA, this.paramB);
    }

  }

  getStoneRadius(){
    stoneRadius = (1-Math.abs(this.stoneX/getSecondZeroX(this.paramA))*0.8)*5
  }
  getNextPoint( x, y,  step,  paramA,  paramB) {
    
    if (Math.abs(x) > Math.abs(getSecondZeroX(this.paramA) * 0.8)) {
      isArride = true;
      this.stoneX = 0
      this.stoneY = 0
      this.getShotPoint()
      if (isShotSuccess(this.shotX, this.shotY, this.targetX, this.targetY, this.baWid)) {
        
        this.callback('success', shotHuan, this.shotX + screenWidth / 2, this.slingShotTopY-this.shotY);
      } else {
        this.callback('failure', 0, this.shotX + screenWidth / 2, this.slingShotTopY-this.shotY);
      }
    } else {
      this.stoneX = x + step;
      this.stoneY = paramB *  Math.sin(x / paramA);
    }
  }

  /**
  * 子弹击中点
  * @return
  */
  getShotPoint() {
    var x = getSecondZeroX(this.paramA) * 0.8;
    var y = this.paramB * Math.sin(x / this.paramA);
    if (this.touchX >= 0) {
      x = -x;
    }
    this.shotX=x
    this.shotY=y
  }



}
