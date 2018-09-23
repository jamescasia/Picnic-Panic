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
        sfxSlider:cc.Node,
        bgToggle:cc.Node,
        sfxToggle:cc.Node,
        tutPanel:cc.Node,
        storage:null,

       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bgSlider.getComponent(cc.Slider).progress = global.bgVolume
        console.log('read vol', global.bgVolume)
        
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo')) 
        //this.tutPanel.


    },

    start () {

    },
    goHome(){
        cc.director.loadScene("realhome")
    },
    changeBgVolume(){
        global.bgVolume = this.bgSlider.getComponent(cc.Slider).progress 
        
        global.bgMusic.setMusicVolume(global.bgVolume) 
        
        this.storage.bgVolume =  this.bgSlider.getComponent(cc.Slider).progress
        global.bgVolume = this.storage.bgVolume 

        this.ss()


    },
    changeSfxVolume(){

    },
    ss(){
        
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )

        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo')) 

    },

    // update (dt) {},
});
