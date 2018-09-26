 //functions to initialize in all scenes, should also add, global functions that can be called anywhere
var global  = require('global')
cc.Class({
    extends: cc.Component,
    properties:{
        musicProp: cc.AudioClip,
    },
    onLoad(){ 
        cc.director.setDisplayStats ( false )
        this.screenResize()
        this.readData()
        this.playBgMusic()
         
    },  
    readData(){
        this.storage = JSON.parse (cc.sys.localStorage.getItem('ampopo'))  
        console.log('read', this.storage)
        global.bgVolume = JSON.parse( (this.storage.bgVolume))
        console.log('saved vol' , global.bgVolume)
        global.sfxVolume = JSON.parse( (this.storage.sfxVolume))
    },
    screenResize(){
        if( cc.director.getWinSize().height/cc.director.getWinSize().width <= 1.34     ) {
            console.log('bogo resized')
            this.node.getComponent(cc.Canvas).fitHeight = true
            this.node.getComponent(cc.Canvas).fitWidth = true
        } 

    },
    playBgMusic(){ 
        console.log(global.bgMusic, "musika")

        if(cc.director.getScene()._name == "realhome" && global.bgOn && !global.musicStarted) {
            cc.audioEngine.preload(this.musicProp );
            global.musicStarted = true 
            var bgMusic = cc.audioEngine 
            bgMusic.playMusic(this.musicProp, true); 
            bgMusic.setMusicVolume(global.bgVolume) 
 
             

        }
    },


    
}); 
