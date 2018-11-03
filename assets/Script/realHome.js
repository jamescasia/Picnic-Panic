 
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
        achievelist:[],
        achvContent:cc.Node,
        achvPanel:cc.Node,
        itemFab:cc.Prefab,
        numOfAchv:13,
        shap:null,
        settingsFab:cc.Prefab,
        creditPanel:cc.Node,
        bscore:cc.Node,
        bcombo:cc.Node,
        quitNode:cc.Node,
        titleNode:cc.Node,
        uiSound:cc.AudioClip,
        hasOneUncollected:false,
        achvBtn:cc.Node,
        achPos:cc.v2
        



 
    }, 
     
    onLoad () {           
        this.achPos = this.achvBtn.position
        if (cc.sys.os == cc.sys.OS_ANDROID)jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "dismissLoader", "()V");
        this.numOfAchv = 13
        var t = this
       
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode === cc.KEY.back) {
                    t.showQuit() 
                    
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
        var breathing = cc.repeatForever(
            cc.sequence(
                cc.moveBy(2, 0, -12).easing(cc.easeCubicActionOut()),
                cc.moveBy(2, 0, 6).easing(cc.easeQuarticActionIn()),
                cc.moveBy(2, 0, 6).easing(cc.easeCubicActionOut())
            )
        )

        this.titleNode.runAction(breathing)

        
        this.preloadScenes()
        this.loadShop()
        this.dataLoad()
        this.setAchievements()
        
        
        

         
 
        
         
    },
    openShop(){  
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.loadShop()
        this.shap.setLocalZOrder(10)
        this.shap.opacity = 255
        this.shap.scale = cc.v2(1,1)
        var action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 1, 1).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        this.shap.runAction(action)
        var done  = function(){ 
        this.shap.opacity = 255
        this.shap.scale = cc.v2(1,1)
    }
 

        
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
                passiveTimeLvl:0, bgVolume:1, bgVolume:1,sfxOn:true, bgOn:true, 
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
        this.highestCombo =JSON.parse  (parseInt(this.storage.highestCombo))
        this.highestScore =JSON.parse (parseInt( this.storage.highestScore))
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
    shakeAchv(){ 
         
            var shake = cc.repeatForever(
                cc.sequence(
                    cc.spawn(
                        cc.moveBy(1.26, 0, 19).easing(cc.easeCubicActionOut()),

                        cc.sequence(
                            cc.rotateTo(0.2, 4),
                            cc.rotateTo(0.15, 12),
                            cc.rotateTo(0.23, 4),
                            cc.rotateTo(0.14, 1),
                            cc.rotateTo(0.2, -8),
                            cc.rotateTo(0.14, -11),
                            cc.rotateTo(0.2, -16))),


                    cc.spawn(
                        cc.sequence(
                            cc.rotateTo(0.1, -12),
                            cc.rotateTo(0.2, -8),
                            cc.rotateTo(0.2, -3),
                            cc.rotateTo(0.2, 0),
                            cc.rotateTo(0.2, 3),
                            cc.rotateTo(0.1, 0)),

                        cc.moveBy(1, 0, -19)),
                    cc.delayTime(1.9)

                )
            ).speed(3)
            this.achvBtn.runAction(shake)

         
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
        this.achievelist =  ( (this.storage.achievements)) 
        this.ss()
        console.log(this.achievelist, 'out')
        var arrayLength = this.achievelist.length;
        for (var i = 0; i < arrayLength; i++) {
            console.log("ASD", this.achievelist[i].collected , this.achievelist[i].achieved )
            if(   this.achievelist[i].achieved   && !this.achievelist[i].collected) this.hasOneUncollected = true
            //Do something
        }
        console.log(this.hasOneUncollected)
        if(this.hasOneUncollected) this.shakeAchv() 

    },
    preloadScenes(){

        cc.director.preloadScene("main");  
    },
    goSettings(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        var set = cc.instantiate(this.settingsFab)
        this.node.addChild(set)
        set.setLocalZOrder(10) 
        set.opacity = 255
        set.scale = cc.v2(1,1)
        var action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 1, 1).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        set.runAction(action)
        var done  = function(){ 
        set.opacity = 255
        set.scale = cc.v2(1,1)
        }

 

    }, 
    goLdrbrd(){
        //cc.director.loadScene("settings")
    },
    goAchvmnts(){

    },
    share(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 

        cc.sys.openURL("https://play.google.com/store/apps/details?id=aetherapps.picnic.panic")
        //fb shit

    },  
    website(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 

        cc.sys.openURL("https://www.facebook.com/aetherapps/")
    },
    shop(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        global.wentShop = 'realhome' 

        cc.director.loadScene('shop');
    },
    play(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 

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
        this.achvBtn.stopAllActions()
        this.achvBtn.rotation = 0
        this.achvBtn.position = this.achPos
        this.achvBtn.getComponent(cc.Widget).left = 20
            this.achvBtn.getComponent(cc.Widget).bottom = 130
        // this.achvBtn.position= cc.v2(-229.8, -279.8)
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.bcombo.getComponent(cc.Label).string = this.highestCombo
        this.bscore.getComponent(cc.Label).string = this.highestScore
        // this.achvPanel.opacity = 255
        // this.achvPanel.setLocalZOrder(10)
        this.achvPanel.position =cc.v2(0,0)
        this.achvPanel.setLocalZOrder(10)
        this.achvPanel.opacity = 255
        this.achvPanel.scale = cc.v2(0.69,0.69)
        var action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 0.69, 0.69).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        this.achvPanel.runAction(action)
        var done  = function(){ 
        this.achvPanel.opacity = 255
        this.achvPanel.scale = cc.v2(0.69,0.69)}

        
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
        if(a == "credits") this.creditPanel.opacity = 0, this.creditPanel.setLocalZOrder(-10) ,this.achvPanel.position =cc.v2(-900,-900)
        this.ss()
        this.achvPanel.opacity = 0
        this.achvPanel.setLocalZOrder(-10)
       
        // this.setAchievements()
        
    },
    credits(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.creditPanel.position = cc.v2(0,0) 
        this.creditPanel.setLocalZOrder(10) 
        this.creditPanel.opacity = 255
        this.creditPanel.scale = cc.v2(0.69,0.69)
        var action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 0.69, 0.69).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        this.creditPanel.runAction(action)
        var done  = function(){ 
        this.creditPanel.opacity = 255
        this.creditPanel.scale = cc.v2(0.69,0.69)}

        

        


    },
    showQuit(){
        this.quitNode.position = cc.v2(0,0)

    },
    cancelQuit(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.quitNode.position = cc.v2(-1000,-1000)
    },
    reallyQuit(){
        cc.game.end()
    },

   




    // update (dt) {},
});
