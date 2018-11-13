 //functions to initialize in all scenes, should also add, global functions that can be called anywhere
let global  = require('global')
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
        // this.storage = null
        if(  this.storage == null  ){
            let a0={collected:false,prize:100,achieved:false,desc:"Score 100 points!", type:"score", req:100 }
            let a1={collected:false,prize:100,achieved:false ,desc:"Achieve a 20-long combo" , type:"combo", req:20 }
            let a2={collected:false,prize:200,achieved:false ,desc:"Score 500 points!", type:"score", req:500 }
            let a3={collected:false,prize:200,achieved:false ,desc:"Achieve a 30-long combo" , type:"combo", req:30 }
            let a4={collected:false,prize:500,achieved:false ,desc:"Score 1000 points!" , type:"score", req:1000 }
            let a5={collected:false,prize:500,achieved:false ,desc:"Achieve a 40-long combo" , type:"combo", req:40 }
            let a6={collected:false,prize:1000,achieved:false ,desc:"Score 2000 points!" , type:"score", req:2000 }
            let a7={collected:false,prize:1000,achieved:false, desc:"Achieve a 60-long combo" , type:"combo", req:60 }
            let a8={collected:false,prize:2000,achieved:false ,desc:"Score 5000 points!" , type:"score", req:5000 }
            let a9={collected:false,prize:3000,achieved:false,desc:"Play 100 games" , type:"games", req:100 }
            let a10={collected:false,prize:5000,achieved:false,desc:"Play 200 games" , type:"games", req:200 }
            let a11={collected:false,prize:7000,achieved:false,desc:"Play 500 games" , type:"games", req:500 }
            let a12={collected:false,prize:10000,achieved:false,desc:"Play 1000 games" , type:"games", req:1000 }
            

            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0, sfxVolume:1, bgVolume:1,sfxOn:true, bgOn:true, 
                achievements:[a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12],usedParticle:null,leaf:false,pinkLeaf:false, sakura:false,bong:false,
                bonusTaps:0,bonusCollected:false, 
                        } 
                    
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        } 
        global.storage = this.storage
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
        console.log(global.bgOn,"sdaa" ,  global.musicStarted, "musika")

        if(cc.director.getScene()._name == "realhome" && global.bgOn && !global.musicStarted) {
            cc.audioEngine.preload(this.musicProp );
            global.musicStarted = true 
            cc.audioEngine.playMusic(this.musicProp, true,global.bgVolume);  
            cc.audioEngine.setMusicVolume(global.bgVolume) 
            cc.audioEngine.setEffectsVolume(global.bgVolume) 
  
        }

        if(cc.director.getScene()._name == "main" ) {cc.audioEngine.setMusicVolume(global.bgVolume*0.33) 
        cc.audioEngine.setEffectsVolume(global.bgVolume) }

        if(cc.director.getScene()._name == "realhome" ) {cc.audioEngine.setMusicVolume(global.bgVolume )  }
    },


    
}); 
