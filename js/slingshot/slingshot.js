import cax from '../libs/cax'

import Test from './test.js'
const test = new Test()
import Score from './score.js'
const score = new Score()
const lianJiTxt = new Score()
import StartButton from './button.js'
const button = new StartButton()
import Bomb from './bomb.js'
const bomb = new Bomb()
import BunblePoint from './bunblepoint.js'
import Music from './music'
import Stone from './stone.js'
const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const graphics = new cax.Graphics()


const SLING_IMG_SRC = 'images/ic_slingshot.png'
const TARGET_IMG_SRC = 'images/ic_ba.png'

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
var scoreNum=0
var oneMaxScore = 200;
var lianjiCount = 0;
var gameTime= 5*60 //秒
const countTimeText=new Score()
var isStart=false

function countTime(){
  var interval = setInterval(function () {

    gameTime--;
    if (gameTime < 0) {
      clearInterval(interval);
      that.showButton()
      lianjiCount = 0
      scoreNum=0
      gameTime = 5 * 60
    }else{
      that.drawCountTime(gameTime + 's')
    }
  }.bind(this), 1000);
}

function clickListenr(state) {
  if (state == 'tap') {
    music.playShoot()
    score.drawText('Score:' + Math.round(scoreNum))
  } else if (state == 'dismiss'){
    that.dismissButton()
  }
} 


function onShotListenr(state, shotHuan,bombX,bombY) {

  //延时执行
  setTimeout(function () {
    that.getTargetPoint()
  }, 500)
  that.drawBomb(bombX, bombY)
  if (state=='success'){
    // wx.showToast({
    //   title: '射中',
    //   duration: 500
    // })
    music.playExplosion()
    lianjiCount++;
    scoreNum = scoreNum + (oneMaxScore * shotHuan * lianjiCount);
    score.drawText('Score:' + Math.round(scoreNum))
    if(lianjiCount>1){
      lianJiTxt.drawText(lianjiCount+'连击')
    }
  }else{
    lianjiCount=0
  }
  console.log("state:" + state)
} 

export default class Slingshot extends cax.Group {
  constructor() {
    super()

    that = this

    this.sling = new cax.Bitmap(SLING_IMG_SRC)
    this.target = new cax.Bitmap(TARGET_IMG_SRC)
    this.init()
    stone = new Stone(screenWidth / 2, slingShotTopY)
    stone.init(slingShotTopY, slingWidthReal, slingHeightReal, centerPiW, targetWidthReal)

    this.sling.scaleX = sx
    this.sling.scaleY = sx

    this.sling.x = slingShotLeftX
    this.sling.y = slingShotTopY

    score.setOptions({
      color: '#ffffff',
      font: 30,
      y: 80,
    })
    score.drawText('Score:0')

    lianJiTxt.setOptions({
      color: '#ff8800',
      font: 20,
      y:150,
      lastAlpha: 0
    })
    lianJiTxt.drawText(' ')
    this.add(this.sling, test, score, lianJiTxt)
    this.getTargetPoint()

    this.drawRubber()
    this.showButton()
    
    
    wx.onTouchStart(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      that.getleftCenterPiStartPoint()
    })

    wx.onTouchMove(function (e) {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      that.getleftCenterPiStartPoint()
      if (isStart){
        that.drawRubber()
      }
      
    })

    wx.onTouchEnd(function (e) {
      
      if (isStart) {
        that.touchUp()
        that.drawRubber()
      }
    })
    
  }

  drawBomb(x,y){
    if (bomb){
      this.remove(bomb)
    }
    bomb.drawBomb(x, y)
    this.add(bomb)
  }

  dismissButton(){
    isStart = true
    countTime()
    if (button != null) {
      this.remove(button)
    }
  }

  showButton() {
    isStart = false
    button.onClickListenr(clickListenr)
    button.drawButton()
    this.add(button)
    
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

  /**
   * 倒计时
   */
  drawCountTime(value){
    if (countTimeText!=null){
      this.remove(countTimeText)
    }
    countTimeText.setOptions({
      color: '#ffffff',
      font: 20,
      y: 30,
      isAnim: false
    })
    countTimeText.drawText(value)
    this.add(countTimeText)
  }

  /**
   * 弹弓橡皮
   */
  drawRubber() {

    if (graphics!=null){
      this.remove(graphics)
    }
    // graphics.cache(0, slingShotTopY - 10, screenWidth, screenHeight)
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
