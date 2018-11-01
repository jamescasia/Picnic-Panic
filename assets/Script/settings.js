// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var global  = require('global')
cc.Class({
    extends: cc.Component,

    properties: {
        bgSlider:cc.Node, 
        storage:null,
        tutsFab:cc.Prefab,
        uiSound:cc.AudioClip

       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bgSlider.getComponent(cc.Slider).progress = global.bgVolume
        console.log('read vol', global.bgVolume)
        
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo')) 
        //this.tutPanel.
         


    },

    rateGame(){
        cc.sys.openURL("https://play.google.com/store/apps/details?id=aetherapps.picnic.panic")
    },
    showTuts(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        var tuts = cc.instantiate(this.tutsFab)
        tuts.position = cc.v2(24, 0 )
        this.node.addChild(tuts)
  
        tuts.opacity = 0
        tuts.scale = cc.v2(0,0)
        var action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2,1, 1).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        tuts.runAction(action)
        var done  = function(){ 
            tuts.opacity = 255
            tuts.scale = cc.v2(1,1)}



    },

    start () {

    },
    goHome(){ 
        this.node.opacity = 0
        this.node.setLocalZOrder(-10)
    },
    changeBgVolume(){
        global.bgVolume = this.bgSlider.getComponent(cc.Slider).progress 
        
        cc.audioEngine.setMusicVolume(global.bgVolume) 
        
        this.storage.bgVolume =  this.bgSlider.getComponent(cc.Slider).progress
        global.bgVolume = this.storage.bgVolume 

        this.ss()


    }, 
    ss(){
        
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )

        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo')) 

    },

    // update (dt) {},
});
