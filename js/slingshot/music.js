let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor () {
    if (instance) { return instance }

    instance = this

    this.shootAudio = wx.createInnerAudioContext()
    this.shootAudio.src = 'audio/shot.wav'

    this.boomAudio = wx.createInnerAudioContext()
    this.boomAudio.src = 'audio/bomb.wav'

  }

  playShoot () {
    // this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion () {
    // this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
}
