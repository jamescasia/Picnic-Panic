 
var global = require('global')  
cc.Class({
    extends: cc.Component,

    properties: {
        shopFab:cc.Prefab,
  
        freeze:cc.Node,
        spawn:cc.Node,
        frenzy:cc.Node,
        usingFreeze:false,
        usingFrenzy:false,
        usingSpawn:false,
        frenzyBoosts:0,
        freezeBoosts:0,
        spawnBoosts:0,
        storage: null,
        coins:0,
        highestScore:0,
        highestCombo:0,
        bgMusic:cc.AudioClip,
        achvContent:cc.Node,
        achvPanel:cc.Node,
        itemFab:cc.Prefab,
        numOfAchv:13,
        shap:null,
        settingsFab:cc.Prefab,
        creditPanel:cc.Node



 
    }, 
     
    onLoad () {           
        this.numOfAchv = 13

        
       
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode === cc.KEY.back) {
                    cc.game.end()
                    // the back button of Android Device is pressed
                    // maybe it's not work in Web environment
                }
                else if (keyCode === cc.KEY.backspace) {
                    // the backspace of PC/Mac is pressed
                }
                else if (keyCode === cc.KEY.escape) {
                    // the escape of PC/Mac is pressed
                }
            }
        }, this.node);
        this.preloadScenes()
        this.loadShop()
        this.dataLoad()
        this.setAchievements()
        
        
        

         
 
        
         
    },
    openShop(){ 
        this.loadShop()
        this.shap.opacity = 255
        this.shap.scale = cc.v2(1,1)
        this.shap.setLocalZOrder(10)
        
    },
    loadShop(){
        this. shap = cc.instantiate(this.shopFab)
        this.node.addChild(this.shap)
        this.shap.opacity = 0
        this.shap.setLocalZOrder(-10)
        this.shap.scale = cc.v2(0,0)
    },
    goToSDK(){
        cc.game.end()
        // cc.director.loadScene('sdk')
    },
    dataLoad(){
        console.log("ATAY")

        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        
        // this.storage = null
        if(  this.storage == null  ){
            
            var a0={collected:false,prize:100,achieved:false,desc:"Score 100 points!", type:"score", req:100 }
            var a1={collected:false,prize:100,achieved:false ,desc:"Achieve a 20-long combo" , type:"combo", req:20 }
            var a2={collected:false,prize:200,achieved:false ,desc:"Score 500 points!", type:"score", req:500 }
            var a3={collected:false,prize:200,achieved:false ,desc:"Achieve a 30-long combo" , type:"combo", req:30 }
            var a4={collected:false,prize:500,achieved:false ,desc:"Score 1000 points!" , type:"score", req:1000 }
            var a5={collected:false,prize:500,achieved:false ,desc:"Achieve a 40-long combo" , type:"combo", req:40 }
            var a6={collected:false,prize:1000,achieved:false ,desc:"Score 2000 points!" , type:"score", req:2000 }
            var a7={collected:false,prize:1000,achieved:false, desc:"Achieve a 60-long combo" , type:"combo", req:60 }
            var a8={collected:false,prize:2000,achieved:false ,desc:"Score 5000 points!" , type:"score", req:5000 }
            var a9={collected:false,prize:3000,achieved:false,desc:"Play 100 games" , type:"games", req:100 }
            var a10={collected:false,prize:5000,achieved:false,desc:"Play 200 games" , type:"games", req:200 }
            var a11={collected:false,prize:7000,achieved:false,desc:"Play 500 games" , type:"games", req:500 }
            var a12={collected:false,prize:10000,achieved:false,desc:"Play 1000 games" , type:"games", req:1000 }
            
            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0, sfxVolume:1, bgVolume:1,sfxOn:true, bgOn:true, 
                achievements:[a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12],usedParticle:null,leaf:false,pinkLeaf:false, sakura:false,bong:false
                        } 
                    
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        global.storage = this.storage
        } 
        this.frenzyBoosts =JSON.parse( parseInt(this.storage.frenzyBoosts))
        this.freezeBoosts =JSON.parse( parseInt(this.storage.freezeBoosts))
        this.spawnBoosts = JSON.parse(parseInt(this.storage.spawnBoosts)) 
        this.usingFreeze =false
        this.usingFrenzy = false
        this.usingSpawn = false
        this.coins =JSON.parse(parseInt( this.storage.coins))  
        this.highestScore =JSON.parse(parseInt( this.storage.highestScore)) 
        this.usingFrenzy = false
        this.usingFreeze = false
        this.usingSpawn = false
        this.storage.usingFrenzy = false
        this.storage.usingFreeze = false
        this.storage.usingSpawn = false
        this.ss() 
        this.achvPanel.opacity = 0
        this.achvPanel.setLocalZOrder(-10)


    },

    start () {

    },
    setAchievements(){
        
        console.log("gitaya achieve ba", this.storage)

        for (var ach in this.storage.achievements) {
            if(! this.storage.achievements[ach].achieved){

            console.log("ach", this.storage.achievements[ach])

            if(   this.storage.achievements[ach].type == "combo" && parseInt( this.storage.achievements[ach].req )<= parseInt(this.storage.highestCombo)  ) console.log("WOW"), console.log("WOW"), this.storage.achievements[ach].achieved = true
            if(   this.storage.achievements[ach].type == "score" && parseInt( this.storage.achievements[ach].req )<= parseInt(this.storage.highestScore)  )   this.storage.achievements[ach].achieved = true
            if(   this.storage.achievements[ach].type == "games" && parseInt( this.storage.achievements[ach].req )<= parseInt(this.storage.numOfGames)  )  this.storage.achievements[ach].achieved = true
            }


        }
        this.ss()

    },
    preloadScenes(){

        cc.director.preloadScene("main");  
    },
    goSettings(){
        var set = cc.instantiate(this.settingsFab)
        this.node.addChild(set)
        set.setLocalZOrder(10)
 

    }, 
    goLdrbrd(){
        //cc.director.loadScene("settings")
    },
    goAchvmnts(){

    },
    share(){

        cc.sys.openURL("https://play.google.com/store/apps/details?id=aetherapps.picnic.panic")
        //fb shit

    },  
    website(){

        c.sys.openURL("https://www.facebook.com/aetherapps/")
    },
    shop(){
        global.wentShop = 'realhome' 

        cc.director.loadScene('shop');
    },
    play(){

        cc.director.loadScene('main');
    },
    ss(){
        console.log('called')
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        console.log(this.storage)
        global.storage = this.storage
        
    },
    collect(event,customEventData){ 


    },
    showAchievements(){
        this.achvPanel.opacity = 255
        this.achvPanel.setLocalZOrder(10)
        
        var pos = -40
        for(var a in Array.from(Array(this.numOfAchv).keys())){
            var item = cc.instantiate(this.itemFab)
            item.getComponent('itemachv').namae = ""+ a
            item.position = cc.v2(-300 , pos)
            this.achvContent.addChild(item)
            pos-=140

        }
        


    },
    closeAchvmnts(e,a){
        if(a == "credits") this.creditPanel.opacity = 0, this.creditPanel.setLocalZOrder(-10)
        this.achvPanel.opacity = 0
        this.achvPanel.setLocalZOrder(-10)
    },
    credits(){
        this.creditPanel.position = cc.v2(0,0)

        this.creditPanel.opacity = 255
        this.creditPanel.setLocalZOrder(10)
    }

   




    // update (dt) {},
});
