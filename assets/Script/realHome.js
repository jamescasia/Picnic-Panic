 
let global = require('global')  
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
        achPos:cc.v2,
        playBtn:cc.Node, 
        infBtn:cc.Node,
        setBtn:cc.Node,
        shopBtn:cc.Node,
        bonusBtn:cc.Node,
        bonusScene:cc.Node,
        pressesCtr:0,
        foodBtn:cc.Node,
        comboctr:0,
        pressRequired:0,
        tapsLabel:cc.Node,
        tapsReqLabel:cc.Node,
        pressSound:cc.AudioClip,
        bonusTaps:0,
        bonusCollected:false,
        soundArr:[],
        subtrahend:0,
        bu1: cc.SpriteFrame,
        pa1: cc.SpriteFrame,
        pi1: cc.SpriteFrame, 

        bu2: cc.SpriteFrame,
        pa2: cc.SpriteFrame,
        pi2: cc.SpriteFrame,
  
        bu3: cc.SpriteFrame,
        pa3: cc.SpriteFrame,
        pi3: cc.SpriteFrame,
        c1:cc.AudioClip,
        c2:cc.AudioClip,
        c3:cc.AudioClip,
        c4:cc.AudioClip,
        c5:cc.AudioClip,
        c6:cc.AudioClip,
        c7:cc.AudioClip,
        c8:cc.AudioClip,
        foodArr:[],
        explode:cc.Prefab,
        prizeSfx:cc.AudioClip,
        prizeStar:cc.Node,
        prizeSpawn:cc.Node,
        prizeFrenzy:cc.Node,
        prizeFreeze:cc.Node,
        collectBtn:cc.Node,
        collectSfx:cc.AudioClip, 





        



 
    }, 
     
    onLoad () {        
        this.foodArr = [this.bu1, this.bu2, this.bu3, this.pi1, this.pi2, this.pi3, this.pa1, this.pa2, this.pa3]
        this.soundArr = [this.c1, this.c2, this.c3, this.c4, this.c5, this.c6, this.c7, this.c8] 
        // this.achvBtn.scale = cc.v2(0,0)
        // this.playBtn.scale = cc.v2(0,0)
        // this.infBtn.scale = cc.v2(0,0)
        // this.setBtn.scale = cc.v2(0,0)
        // this.infBtn.scale = cc.v2(0,0)
        // this.shopBtn.scale = cc.v2(0,0)   
        // this.titleNode.scale = cc.v2(0,0)
        this.titleNode.position  = cc.v2(0 ,700)    
        
        if (cc.sys.os == cc.sys.OS_ANDROID)jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "dismissLoader", "()V");
        this.numOfAchv = 13
        let t = this
       
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
        let breathing = cc.repeatForever(
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
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 1, 1).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        this.shap.runAction(action)
        let done  = function(){ 
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
                passiveTimeLvl:0, bgVolume:1, bgVolume:1,sfxOn:true, bgOn:true, 
                achievements:[a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12],usedParticle:null,leaf:false,pinkLeaf:false, sakura:false,bong:false
                ,bonusTaps:0,bonusCollected:false,        } 
                    
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
        this.bonusCollected =JSON.parse(this.storage.bonusCollected) 
        this.bonusTaps = JSON.parse(parseInt( this.storage.bonusTaps)) 
        this.highestCombo =JSON.parse  (parseInt(this.storage.highestCombo))
        this.highestScore =JSON.parse (parseInt( this.storage.highestScore))
        this.usingFrenzy = false
        this.usingFreeze = false
        this.usingSpawn = false
        
        this.storage.usingFrenzy = false
        this.storage.usingFreeze = false
        this.storage.usingSpawn = false 
        // this.pressesCtr = this.bonusTaps
        this.pressesCtr = 4982

        this.subtrahend = (5000*(1+ Math.floor(this.pressesCtr/5000)))
        this.foodBtn.getChildByName('a').getComponent(cc.Sprite).spriteFrame =this.foodArr[ Math.floor(this.pressesCtr/5000)]

        // this.tapsLabel.getComponent(cc.Label).string = " TAPS left until\n bonus: "+ (this.subtrahend- this.pressesCtr)  
        this.ss() 
        this.achvPanel.opacity = 0
        this.achvPanel.setLocalZOrder(-10)


    },
    shakeAchv(){ 
         
            let shake = cc.repeatForever(
                cc.sequence(
                    cc.spawn(
                            cc.fadeTo(0.7,155)  ,
                            cc.delayTime(0)
                            // cc.scaleTo(0.7, 1.34, 1.34)
                        ),
                            
                    cc.spawn( 
                        cc.fadeTo(0.7, 255)  ,
                            // cc.scaleBy(0.7, 1.3, 1.3),
                        cc.delayTime(0)),
                ), 

                
            )
            this.achvBtn.runAction(shake)

         
    },

    start () {

        let a = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4), cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,0.76271,0.76271).easing(cc.easeCubicActionOut()))  )
        let b = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4), cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,1.3,1.3).easing(cc.easeCubicActionOut()) ) )
        let c = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4),  cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,1.3,1.3).easing(cc.easeCubicActionOut()) )  )
        let d = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4),  cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,1.3,1.3).easing(cc.easeCubicActionOut()) )  )
        let e = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4),  cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,1.3,1.3).easing(cc.easeCubicActionOut()) ) )
        let zz = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4),  cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,1.17,1.17).easing(cc.easeCubicActionOut()) ) )
        
        

        this.playBtn.runAction(a)
        this.achvBtn.runAction(b)
        this.setBtn.runAction(c)
        this.shopBtn.runAction(d)
        this.infBtn.runAction(e)
        this.bonusBtn.runAction(zz)

        // let f = cc.sequence(    
        //     cc.scaleTo(0,0.5,0.5),
        //     cc.delayTime(0.4), 
        //     cc.spawn(cc.delayTime(0),cc.moveTo(0.4 , 0 , 160*(cc.director.getWinSize().height/cc.director.getWinSize().width) + 20).easing(cc.easeCubicActionOut()), 
        //     // cc.scaleTo(0.4,0.5,0.5).easing(cc.easeCubicActionOut())
        // )  
        // )
        
        this.titleNode.position  = cc.v2(0 , 160*(cc.director.getWinSize().height/cc.director.getWinSize().width) + 20)
        let f = cc.sequence(   cc.scaleTo(0,0,0), cc.delayTime(0.4),  cc.spawn(cc.fadeIn(0.4),cc.scaleTo(0.4,.5,.5).easing(cc.easeCubicActionOut())   ))
            
        this.titleNode.runAction(f)


    },
    setAchievements(){ 
        
        console.log("gitaya achieve ba", this.storage)

        for (let ach in this.storage.achievements) {
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
        let arrayLength = this.achievelist.length;
        for (let i = 0; i < arrayLength; i++) {
            console.log("ASD", this.achievelist[i].collected , this.achievelist[i].achieved )
            if(   this.achievelist[i].achieved   && !this.achievelist[i].collected) this.hasOneUncollected = true
            //Do something
        }
        console.log(this.hasOneUncollected)
        // this.achPos = this.achvBtn.position
        // if(this.hasOneUncollected) this.shakeAchv() 

    },
    preloadScenes(){

        cc.director.preloadScene("main");  
    },
    goSettings(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        let set = cc.instantiate(this.settingsFab)
        this.node.addChild(set)
        set.setLocalZOrder(10) 
        set.opacity = 255
        set.scale = cc.v2(1,1)
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 1, 1).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        set.runAction(action)
        let done  = function(){ 
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
        // this.achvBtn.rotation = 0
        // this.achvBtn.position = this.achPos
        // this.achvBtn.getComponent(cc.Widget).left = 20
        //     this.achvBtn.getComponent(cc.Widget).bottom = 130
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
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 0.69, 0.69).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        this.achvPanel.runAction(action)
        let done  = function(){ 
        this.achvPanel.opacity = 255
        this.achvPanel.scale = cc.v2(0.69,0.69)}

        
        let pos = -40
        for(let a in Array.from(Array(this.numOfAchv).keys())){
            let item = cc.instantiate(this.itemFab)
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
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.2, 0.69, 0.69).easing(cc.easeExponentialIn()),
                cc.fadeIn(0.2).easing(cc.easeExponentialIn())
            ), 
            cc.callFunc(done, this)
        )
        this.creditPanel.runAction(action)
        let done  = function(){ 
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
    goToBonus(){
        this.bonusScene.runAction(cc.moveTo(0.4,0,77).easing(cc.easeCubicActionOut()))

        this.switchScreen()
    },
    resetPrizes(){

        this.prizeSpawn.stopAllActions()
        this.prizeSpawn.scale = cc.v2(0.08,0.08)
        this.prizeSpawn.position = cc.v2(0,0)
        this.prizeSpawn.opacity = 0

        this.prizeFreeze.stopAllActions()
        this.prizeFreeze.scale = cc.v2(0.08,0.08)
        this.prizeFreeze.position = cc.v2(0,0)
        this.prizeFreeze.opacity = 0

        this.prizeFrenzy.stopAllActions()
        this.prizeFrenzy.scale = cc.v2(0.08,0.08)
        this.prizeFrenzy.position = cc.v2(0,0)
        this.prizeFrenzy.opacity = 0

        this.prizeStar.stopAllActions()
        this.prizeStar.scale = cc.v2(0.14,0.14)
        this.prizeStar.position = cc.v2(0,0)
        this.prizeStar.opacity = 0

    },
    collectPrize(){ 
        cc.audioEngine.playEffect( this.collectSfx,false,global.bgVolume) 
        this.collectBtn.stopAllActions()
        this.collectBtn.runAction(  cc.sequence(cc.delayTime(0),cc.scaleTo(0.15,0, 0).easing(cc.easeCubicActionOut())  ))
        let suyop = function(){this.resetPrizes()
            this.foodBtn.getComponent(cc.Button).interactable  = true
            this.foodBtn.getComponent(cc.Button).disabled = false}
        // let suyop = cc.spawn(cc.scaleTo(0.4,0,0),cc.moveTo(0.4, this.collectBtn.position.x, this.collectBtn.position.y)).easing(cc.easeCubicActionOut())  
        let kolekta = cc.sequence(cc.moveBy(0.2, 0, -16), cc.spawn(cc.moveBy(0.4, 0 ,64), cc.sequence(cc.delayTime(0 ),cc.fadeOut(0.3)))).easing(cc.easeQuadraticActionIn())  
        let kolekta1 = cc.sequence(cc.moveBy(0.2, 0, -16), cc.spawn(cc.moveBy(0.4, 0 ,64), cc.sequence(cc.delayTime(0 ),cc.fadeOut(0.3)))).easing(cc.easeQuadraticActionIn())  
        let kolekta2= cc.sequence(cc.moveBy(0.2, 0, -16), cc.spawn(cc.moveBy(0.4, 0 ,64), cc.sequence(cc.delayTime(0 ),cc.fadeOut(0.3)))).easing(cc.easeQuadraticActionIn())  
        let kolekta3 =cc.sequence(cc.moveBy(0.2, 0, -16), cc.spawn(cc.moveBy(0.4, 0 ,64), cc.sequence(cc.delayTime(0 ),cc.fadeOut(0.3)))).easing(cc.easeQuadraticActionIn  ())   
        this.prizeStar.runAction( kolekta )
        this.prizeFreeze.runAction(kolekta1 )
        this.prizeFrenzy.runAction(kolekta2  )
        this.prizeSpawn.runAction(kolekta3  )
        this.node.runAction(cc.sequence(cc.delayTime(0.8), cc.callFunc(suyop, this)))
        // let done = function(){
            
    // }
        let spewOut = cc.sequence(
            cc.scaleTo(0.8, 0 ,0).easing(cc.easeSineIn()) ,
            cc.delayTime(0.6),
            cc.scaleTo(0.07 , 1.87,1.87)  ,
            // cc.callFunc(done, this)


        )
        this.ss()
        // this.foodBtn.getChildByName('a').runAction(spewOut)
    },
    spewPrizes(){ 
        let done = function(){
            this.prizeSpawn.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 8) ,cc.moveBy(1, 0, -8) ) ))
        }
        let spew = cc.sequence(
            cc.fadeIn(0),
            cc.spawn(
                cc.moveBy(0.2, 50,0),
                cc.moveBy(0.2, 0, 60).easing(cc.easeQuadraticActionOut()),

            ),
            
            cc.spawn(
                cc.moveBy(0.3, 50,0),
                cc.moveBy(0.3, 0, -100).easing(cc.easeQuadraticActionIn()),

            ),
            cc.delayTime(0.85),
            cc.callFunc(done, this)
        )

        let done2 = function(){
            this.prizeFreeze.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 8) ,cc.moveBy(1, 0, -8) ) ))
        }
        let spew2 = cc.sequence(
            cc.fadeIn(0),
            cc.spawn(
                cc.moveBy(0.2, -50,0),
                cc.moveBy(0.2, 0, 60).easing(cc.easeQuadraticActionOut()),

            ),
            
            cc.spawn(
                cc.moveBy(0.3, -50,0),
                cc.moveBy(0.3, 0, -100).easing(cc.easeQuadraticActionIn()),

            ),
            cc.delayTime(0.75),
            cc.callFunc(done2, this)
        )


        let done3 = function(){
            this.prizeFrenzy.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 8) ,cc.moveBy(1, 0, -8) ) ))
        }
        let spew3 = cc.sequence(
            cc.fadeIn(0),
            cc.spawn(
                cc.moveBy(0.2, 20,0),
                cc.moveBy(0.2, 0, 65).easing(cc.easeQuadraticActionOut()),

            ),
            
            cc.spawn(
                cc.moveBy(0.3, 20,0),
                cc.moveBy(0.3, 0, -100).easing(cc.easeQuadraticActionIn()),

            ),
            cc.delayTime(0.7),
            cc.callFunc(done3, this)
        )

        let done4 = function(){
            this.prizeStar.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 8) ,cc.moveBy(1, 0, -8) ) ))
        }
        let spew4 = cc.sequence(
            cc.fadeIn(0),
            cc.spawn(
                cc.moveBy(0.2, -20,0),
                cc.moveBy(0.2, 0, 65).easing(cc.easeQuadraticActionOut()),

            ),
            
            cc.spawn(
                cc.moveBy(0.3, -20,0),
                cc.moveBy(0.3, 0, -100).easing(cc.easeQuadraticActionIn()),

            ),
            cc.delayTime(0.8),
            cc.callFunc(done4, this)
        )

        
        
        // this.prizeSpawn.runAction(spew)
        // this.prizeFreeze.runAction(spew2)
        // this.prizeFrenzy.runAction(spew3)
        // this.prizeStar.runAction(spew4)
        
        var  p = Math.floor(cc.rand())%3 
        var prize = 0
        console.log("THIS IS THE PRIZE", p)
        if(p==0 ){
              prize = parseInt (2000* Math.floor(1+cc.rand()%4)) 
            this.coins += prize
            this.prizeStar.getChildByName('a').getComponent(cc.Label).string = prize
            this.prizeStar.getChildByName('b').getComponent(cc.Label).string = prize
            this.prizeStar.runAction(spew4)
        }
        if (p ==1){
            let a =1+Math.floor(cc.rand())%6
            let b = 1+Math.floor(cc.rand())%6
            let c= 1+Math.floor(cc.rand())%6
            this.frenzyBoosts +=a
            this.freezeBoosts +=b
            this.spawnBoosts +=c

            this.prizeSpawn.getChildByName('a').getComponent(cc.Label).string = a
            this.prizeFreeze.getChildByName('a').getComponent(cc.Label).string = b
            this.prizeFrenzy.getChildByName('a').getComponent(cc.Label).string = c
            this.prizeSpawn.getChildByName('b').getComponent(cc.Label).string = a
            this.prizeFreeze.getChildByName('b').getComponent(cc.Label).string = b
            this.prizeFrenzy.getChildByName('b').getComponent(cc.Label).string = c
             
            this.prizeSpawn.runAction(spew)
            this.prizeFreeze.runAction(spew2)
            this.prizeFrenzy.runAction(spew3) 

        }
        if(p == 2) {

            this.prizeSpawn.runAction(spew)
            this.prizeFreeze.runAction(spew2)
            this.prizeFrenzy.runAction(spew3)
            this.prizeStar.runAction(spew4)
            let a =1+Math.floor(cc.rand())%4
            let b = 1+Math.floor(cc.rand())%4
            let c= 1+Math.floor(cc.rand())%4
            this.frenzyBoosts +=a
            this.freezeBoosts +=b
            this.spawnBoosts += c
            prize = parseInt(500* Math.floor(1+cc.rand()%3))
            this.coins += prize
            this.prizeSpawn.getChildByName('a').getComponent(cc.Label).string = a
            this.prizeFreeze.getChildByName('a').getComponent(cc.Label).string = b
            this.prizeFrenzy.getChildByName('a').getComponent(cc.Label).string = c
            this.prizeStar.getChildByName('a').getComponent(cc.Label).string = prize
            this.prizeStar.getChildByName('b').getComponent(cc.Label).string = prize
            this.prizeSpawn.getChildByName('b').getComponent(cc.Label).string = a
            this.prizeFreeze.getChildByName('b').getComponent(cc.Label).string = b
            this.prizeFrenzy.getChildByName('b').getComponent(cc.Label).string = c
             
            
        }
        console.log(prize, "coins", this.coins)
        this.storage.coins = this.coins 
        this.storage.frenzyBoosts = this.frenzyBoosts
        this.storage.freezeBoosts = this.freezeBoosts
        this.storage.spawnBoosts = this.spawnBoosts
        
        this.ss()


        let a = cc.sequence(

            cc.scaleTo(0.03, 0.08, 0.08),
            cc.spawn(
                cc.moveBy(0.2, 500,500),
                cc.delayTime(0)

                // you know what it's gonna be fucking linear so what the hell do you have to do 
            ),
        )
    },
    transition(){
        console.log('wtf    ')
        this.foodBtn.getComponent(cc.Button).interactable  = false
        this.foodBtn.getComponent(cc.Button).disabled = true
        this.foodBtn.getChildByName('a').scale = cc.v2(0,0)
        cc.audioEngine.playEffect(this.prizeSfx, false, global.bgVolume)
        // this.foodBtn.getChildByName('a').getComponent(cc.Sprite).spriteFrame =this.foodArr[1+ Math.floor(this.pressesCtr/5000)]
        let oknow = function(){
            let s = cc.instantiate(this.explode)
            console.log("added child")
            s.scale = cc.v2(4,4)
            s.position = cc.v2(0,0)
            s.setLocalZOrder(10)
            // this.collectBtn.runAction(  cc.scaleTo(0.4, 1.08, 1.08).easing(cc.easeCubicActionOut()) )
            this.collectBtn.runAction(  cc.repeatForever(cc.sequence(cc.scaleTo(0.4, 1.1, 1.1) , cc.scaleTo(0.4, 1,1) )) )
            // s.getComponent(cc.ParticleSystem).texture = this.foodArr[ Math.floor(this.pressesCtr/5000)]
            s.getComponent(cc.ParticleSystem).resetSystem()
            this.foodBtn.getChildByName('a').addChild(s)
            this.spewPrizes()

            
            

        }
        let glowup = cc.sequence(
            cc.delayTime(0.6),
            cc.scaleTo(0.15, 1.87, 1.87), 
            cc.callFunc(oknow, this)
            


        )

        this.foodBtn.getChildByName('a').runAction(glowup)
    },
    pressFood(){
        this.pressesCtr+=1
        // cc.audioEngine.playEffect( this.pressSound, false, global.bgVolume)
        this.subtrahend = (5000*(1+ Math.floor(this.pressesCtr/5000)))
        this.foodBtn.getChildByName('a').getComponent(cc.Sprite).spriteFrame =this.foodArr[ Math.floor(this.pressesCtr/5000)]
        console.log(this.pressesCtr ,  Math.floor(this.pressesCtr/5000) , this.foodArr[ Math.floor(this.pressesCtr/5000)] )
        
        
        if(this.subtrahend- this.pressesCtr-5000 == 0)  this.transition(), console.log('otoy')
        this.tapsLabel.getComponent(cc.Label).string =  " TAPS left until\n bonus: "+ (this.subtrahend- this.pressesCtr)

        this.comboctr += 1 
        // console.log(this.comboctr)
        if(this.comboctr >=  32) cc.audioEngine.playEffect( this.soundArr[7],false ,global.bgVolume) 
        else  cc.audioEngine.playEffect( this.soundArr[Math.floor(this.comboctr/4) ],false ,global.bgVolume) 
                 
        this.node.stopAllActions()
        let comboEnd = function () {this.comboctr = 0} 
        let times = cc.sequence(cc.delayTime(0.35), cc.callFunc(comboEnd, this))
        this.node.runAction(times)
 
        this.storage.bonusTaps = this.pressesCtr
        if(this.pressesCtr >=45000 )this.pressesCtr = 0, this.foodBtn.getChildByName('a').getComponent(cc.Sprite).spriteFrame =this.foodArr[ 0]
        this.ss()



    },
    closeBonusScreen(){
        this.storage.bonusTaps = this.pressesCtr
        this.ss()

        this.achvBtn.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.playBtn.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.bonusBtn.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.setBtn.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.infBtn.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.shopBtn.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.titleNode.runAction(cc.moveBy(0.4, -800, 0).easing(cc.easeCubicActionOut()))
        this.bonusScene.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))


    },
    switchScreen(){
        this.achvBtn.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
        this.playBtn.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
        this.bonusBtn.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
        this.setBtn.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
        this.infBtn.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
        this.shopBtn.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
        this.titleNode.runAction(cc.moveBy(0.4, 800, 0).easing(cc.easeCubicActionOut()))
 
    }

   




    // update (dt) {},
});
