 
var global = require('global')  

cc.Class({
    extends: cc.Component,

    properties: { 
        pauseHome:cc.Button,
        pausePlay:cc.Button,
        hud:cc.Node,
        matrix:cc.Node, 
        pausemenu:cc.Node,
        score:0, 
        hsLabel:cc.Node,
        time:2,
        comboctr:0,
        gameTimer:0,
        gameover:false,
        timebar:cc.Node, 
        prev:null,
        bg:cc.Node,
        list:[],
        scoreLabel:cc.Node,
        comboLabel:cc.Node,
        timeLabel:cc.Node,
        oneone:cc.Node,
        onetwo:cc.Node,
        onethree:cc.Node,
        onefour:cc.Node,
        twoone:cc.Node,
        twotwo:cc.Node,
        twothree:cc.Node,
        twofour:cc.Node,
        threeone:cc.Node,
        threetwo:cc.Node,
        threethree:cc.Node,
        threefour:cc.Node,
        fourone:cc.Node,
        fourtwo:cc.Node,
        fourthree:cc.Node,
        fourfour:cc.Node,
        actZin:null,
        actZout:null,
        selectAnim:null,
        correct:true,
        endPanel:cc.Node,
        highestCombo:0,
        highestScore:0,
        burgEffect:1,
        panEffect:1,
        pizEffect:1,
        indics:cc.Node,
        burstEffect:cc.Prefab,
        threeBurstEffect:cc.Prefab, 
        lapse:60,  
        frenzying:false,
        freezing:false, 
        freezeonce:false, 
        spawning:false,
        numOfGames:0, 
        usingFrenzy:false,
        usingFreeze:false,
        usingSpawn:false,
        boostHeal:cc.Prefab, 
        pizzing:false,
        panzing:false,
        burging:false,
        everything:cc.Node, 
        timelmt:60,
        pauseBtn:cc.Node,
        frenzyburn:cc.Prefab,

        passiveComboBoost:0 , 
        passiveTimeBoost:0, 
        passiveFrenzyBoost:0,
        coins:0,
        prize:0,
        enemyPic:cc.Node,

        bu1:cc.SpriteFrame,
        pa1:cc.SpriteFrame,
        pi1:cc.SpriteFrame,

        bu1s:cc.SpriteFrame,
        pa1s:cc.SpriteFrame,
        pi1s:cc.SpriteFrame,

        bu2:cc.SpriteFrame,
        pa2:cc.SpriteFrame,
        pi2:cc.SpriteFrame,

        bu2s:cc.SpriteFrame,
        pa2s:cc.SpriteFrame,
        pi2s:cc.SpriteFrame,

        bu3:cc.SpriteFrame,
        pa3:cc.SpriteFrame,
        pi3:cc.SpriteFrame,

        bu3s:cc.SpriteFrame,
        pa3s:cc.SpriteFrame,
        pi3s:cc.SpriteFrame,
        storage: null ,
        ampopo:null,
        gb:cc.Node,
        gb1:cc.Node,
        bg1:cc.SpriteFrame,
        bg4:cc.SpriteFrame,
        bg3:cc.SpriteFrame, 
        timeBoostSprt:cc.Prefab,
        spawnBoostSpr:cc.Prefab,
        frenzyBoostSprt:cc.Prefab,
        boostersPanel:cc.Node,
        abText:cc.Node,
        d:cc.Node,
        boosterTime:cc.Node,
        boosterSpawn:cc.Node,
        boosterFrenzy:cc.Node,
        boosterPrompt:cc.Node,
        startVal:0,
        starParts:cc.Node,
        starFab:cc.Prefab

        
 
    }, 

    
    parseBoolean(x){
        if(x == 'false') return false
        if ( x== 'true') return true

    },
    
    retry(){
        //cc.director.loadScene('main')
    },
    setEnemy(){
        if (typeof FBInstant === 'undefined') return;  

        var enemyImage = new Image( );
        enemyImage.crossOrigin = 'anonymous'; 
        enemyImage.src =FBInstant.player.getPhoto();  
        cc.loader.load(enemyImage.src, (err, texture) => {
        this.enemyPic.getChildByName('pic').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        this.enemyPic.getChildByName('pic').width = 100 
        this.enemyPic.getChildByName('pic').height = 100 
        
        //this.enemyPic.getComponent(cc.Mask).type =  cc.Mask.Type.ELLIPSE 
    })

    }, 
    log(){
        
    },
    

    onLoad () {   
        // if(global.wentShop = 'shop') {
            
        //     this.gameover = true
        //     this.gameOver()}
        
        var randbg = parseInt(cc.rand()%3)
        var bgs = [this.bg1 , this.bg3, this.bg4]

        this.bg.getComponent(cc.Sprite).spriteFrame = bgs[randbg] 

        

        cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                console.log('pressed key: ' + keyCode);
            },
            onKeyReleased: function (keyCode, event) {
                if(keyCode ===cc.KEY.back) this.closePrompt()
                console.log('released key: ' + keyCode);
            }
        });
        
         


        
        //firebase.database().ref('/users/'+global.global_userID+'/activeContests/'+key).set(FBInstant.context.getID()) 
        
        //this.saveToDB()
        //this.setEnemy() 
        //console.log('globo here' , global.global_userID , global.global_userData.val().activeContests)
        //console.log('gonoing',global.global_activeContests.val()[FBInstant.context.getID()].ongoing )
        

       //   
        
        this.storage = JSON.parse (cc.sys.localStorage.getItem('ampopo'))  
        console.log('fiiirst ' , this.storage)
      /*   this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:22222 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0
                        }
                        cc.sys.localStorage.setItem('ampopo',JSON.stringify( this.storage)) */
                        
                        
                        
                
       
        if(  this.storage == null  ){
            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0, sfxVolume:1, bgVolume:1,sfxOn:true, bgOn:true 
                        }
                    
        cc.sys.localStorage.setItem('ampopo',JSON.stringify( this.storage)) 
        } 
     console.log(this.storage)
     /*
      this.ampopo = ( JSON.parse (cc.sys.localStorage.getItem('ampopo')) )
      console.log(this.ampopo)
      this.ampopo.tangina = 'd1231'
      cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.ampopo) )
      this.ampopo = ( JSON.parse (cc.sys.localStorage.getItem('ampopo')) )
      console.log('babababbaboyka' , this.ampopo)
      //console.log  (JSON.parse(this.ampopo.tangina))
       console.log( JSON.parse (cc.sys.localStorage.getItem('ampopo')) ) */

 
      
        
 
        this.usingFreeze = JSON.parse ( this.storage.usingFreeze)
        this.freezeBoosts = JSON.parse  (parseInt( this.storage.freezeBoosts))
        this.frenzyBoosts = JSON.parse (parseInt ( this.storage.frenzyBoosts))
        this.spawnBoosts = JSON.parse (parseInt ( this.storage.spawnBoosts))
        this.usingFrenzy =    JSON.parse(this.storage.usingFrenzy)
        this.usingSpawn =    JSON.parse(this.storage.usingSpawn) 
        this.coins =  JSON.parse(parseInt( this.storage.coins) )
        this.passiveComboBoost = JSON.parse (parseInt(this.storage.passiveComboBoost))
        this.passiveTimeBoost = JSON.parse( parseInt(this.storage.passiveTimeBoost))
        this.passiveFrenzyBoost = (parseInt( this.storage.passiveFrenzyBoost))
        this.highestCombo =JSON.parse  (parseInt(this.storage.highestCombo))
        this.highestScore =JSON.parse (parseInt( this.storage.highestScore))
        this.hsLabel.getComponent(cc.Label).string =  String(this.highestScore) 
        this.ss()
        this.boosterShow()
        this.setLabels()
        
 

        
        

       // this.storage.numOfGames = 23;
        
 
        

    
 

        
    },
    boosterShow(){
            var aa = cc.sequence(cc.delayTime(0.15) ,cc.spawn (cc.fadeIn(1),  cc.moveBy(1, 0, 155)).easing(cc.easeCubicActionOut()) ,
                cc.moveBy(1, 0 , 0),cc.spawn (cc.fadeOut(1) , cc.moveBy(1, 0, -155)).easing(cc.easeQuinticActionIn()) 
                ).speed(2)
            var ssf = cc.sequence(cc.delayTime(0.3), cc.spawn (cc.fadeIn(1),  cc.moveBy(1, 0, 155)).easing(cc.easeCubicActionOut()) ,
                cc.moveBy(1, 0 , 0), cc.spawn (cc.fadeOut(1) , cc.moveBy(1, 0, -155)).easing(cc.easeQuinticActionIn()) 
                ).speed(2)
            var bb = cc.sequence( cc.spawn (cc.fadeIn(1),  cc.moveBy(1, 0, 155)).easing(cc.easeCubicActionOut()) ,
                cc.moveBy(1, 0 , 0),cc.spawn (cc.fadeOut(1) , cc.moveBy(1, 0, -155)).easing(cc.easeQuinticActionIn()) 
                ).speed(2)
            var flash = cc.sequence( cc.spawn (cc.fadeIn(1),  cc.moveBy(1, 759, 0)).easing(cc.easeCubicActionOut()) ,
                cc.moveBy(1, 0 , 0),cc.spawn (cc.fadeOut(1) , cc.moveBy(1, 759, 0)).easing(cc.easeQuinticActionIn()) 
                ).speed(2)
            let children = []
            if(this.usingFrenzy){
            
                var frenzyBoostSprt = cc.instantiate( this.frenzyBoostSprt); 
                this.boostersPanel.addChild(frenzyBoostSprt);
                children.push(frenzyBoostSprt)
            } 
        
            if (this.usingFreeze){
            var timeBoostSprt = cc.instantiate( this.timeBoostSprt); 
            this.boostersPanel.addChild(timeBoostSprt);  
            this.useFreezeBoost() 
            children.push(timeBoostSprt)
        
        }
             
            if(this.usingSpawn){
            var spawnBoostSpr = cc.instantiate( this.spawnBoostSpr); 
            this.boostersPanel.addChild(spawnBoostSpr); 
            children.push(spawnBoostSpr)
         }
         if(children.length>=1)this.abText.runAction(flash)
         if(children.length==1 ) children[0].position = cc.v2(0,0)
         if(children.length==2 ) children[0].position = cc.v2(-80,0), children[1].position = cc.v2(80,0)
         if(children.length==3 ) children[0].position = cc.v2(-160,0), children[1].position = cc.v2(0,0), children[2].position = cc.v2(160,0)

            
        
        if (this.usingFrenzy) frenzyBoostSprt.runAction(bb) 
        if(this.usingSpawn)spawnBoostSpr.runAction(ssf)
        if(this.usingFreeze)timeBoostSprt.runAction(aa)

        
        console.log('my child', this.boostersPanel.childrenCount )
    },
    onHome(){
        cc.director.resume()
        this.pauseBtn.interactable = true
        cc.director.loadScene('realhome'); 
    },
    onPause(){
        this.pausemenu.setLocalZOrder(10)
        this.pausemenu.opacity=255
        this.pausemenu.position = cc.v2(0, 0)
        if(this.pauseBtn.getComponent(cc.Toggle).isChecked) {
            this.pauseBtn.interactable = false
            cc.director.pause()  
        }
        else {
            cc.director.resume()
            this.pauseBtn.interactable = true
            this.pausemenu.opacity=0
            this.pausemenu.position = cc.v2(-800,-800)
             
        }
    },
    retry(){  
        
        cc.director.resume()
        this.pauseBtn.interactable = true
         cc.director.loadScene('main')
    },

    start () {   

        this.endPanel.setLocalZOrder(-10)
        
        
        

        console.log("GAME" , this.storage  )

        this.highestCombo = 0
        this.comboctr  = 0
        var timectr =0
        var t= this  
        var left = 60
        

        var gameTimer = t.schedule(function() { 

           
            

              
            if (t.usingFreeze  )   t.timelmt = 55  +t.passiveTimeBoost
            else t.timelmt = 50+t.passiveTimeBoost 
                 
            left =  (t.timelmt- timectr  ) 
        //     t.gb.x -= 40
        //     t.gb1.x -= 40
        //  //   t.gb.position= cc.v2(t.bg.x+2208,t.bg.y)
            // if(t.gb.x <= 775){
            //       t.bg.x= t.gb.x+2208 
                this.scoreLabel.getComponent(cc.Label).string = this.score
        this.comboLabel.getComponent(cc.Label).string = this.comboctr 
        if(this.comboctr >= this.highestCombo) this.highestCombo = this.comboctr
            //     }
            if(t.bg.x <= 800){
                t.gb.x= t.bg.x+2208 
                t.gb1.x = t.gb.x+2208
            }
            else if(t.gb1.x <= 800){
                t.bg.x= t.gb1.x+2208 
                t.gb.x = t.bg.x+2208
            }
            else if(t.gb.x <= 800){
                t.gb1.x= t.gb.x+2208 
                t.bg.x = t.gb1.x+2208
            }
            //t.bg.position.x += timectr*3
            
            t.timebar.getComponent(cc.ProgressBar).progress = left/t.timelmt
            timectr+= 0.05
            //0.05
            t.lapse = timectr
            

            if(left <=0 && !this.gameover  ){ 
                this.gameOver()
                
                
            } 

            if(this.lapse >=   this.timelmt-6 &&  this.lapse!=60 && !this.gameover ) {
                 
            
                var shake = cc.sequence(cc.moveTo(0.1 , cc.randomMinus1To1()*2 ,-55+  cc.randomMinus1To1()*4 )  , cc.moveTo(0.1 , 0,-55 ) ) 
                this.matrix .runAction(shake)}

            t.timeLabel.getComponent(cc.Label).string = String(left).replace("." , ':')


        }, 0.05, 1500,1.5);
        
        
         
    },  
    gameOver(){ 
        var hideHud = cc.sequence(
            cc.delayTime(0.5),
            cc.moveBy(0.16, 0, -6).easing(cc.easeCubicActionOut()) ,
            cc.moveBy(0.28, 0, 400).easing(cc.easeExponentialIn()) 

            )
        this.hud.runAction(hideHud)
        this.pauseBtn.interactable = false
                this.pauseBtn.position =cc.v2(-800,-800)
               // this.sdkWork() 
                var prize =  Math.round(Math.random()*200) 
                if(prize <= 100) prize = 100+ Math.floor(Math.random()*22)
                
                
                
                if(this.score >= this.highestScore){ this.highestScore = this.score
                    prize+= 80
 
                }
                this.coins +=prize
                this.prize = prize 
                this.storage.coins = this.coins
                this.storage.highestScore = this.highestScore
                
                this.gameover = true
                this.numOfGames+=1
                 
                this.usingFrenzy = false
                this.usingFreeze = false
                this.usingSpawn = false
                this.storage.usingFrenzy = false
                this.storage.usingFreeze = false
                this.storage.usingSpawn = false

                this.storage.numOfGames = this.numOfGames 
                this.gameOverAnim()
                //this.endPanel.getComponent('layoutScript').showPanel(this.score ,this.highestCombo,this.prize ,this.highestScore)
                
                this.ss()
                
    },
    numAnim(score){
        // this.endPanel.getChildByName('combo').string = 
        // this.endPanel.getChildByName('score').string = 
        // this.endPanel.getChildByName('coins').string =
        var proceed = function(){
            if(this.startVal <=  score) this.numAnim(score)
            else {
                //this.numAnim(this.highestCombo)
                this.startVal = 0
                this.endPanel.getChildByName('score').getComponent(cc.Label).string =  this.score  
                var call = function(){this.comboAnim(this.highestCombo)}
                var action =cc.sequence(  
                    cc.spawn(
                        cc.fadeOut(0.100),
                        cc.scaleTo(0.1,1.4,1.4)
                    )
                    ,
                    cc.spawn(
                        cc.fadeIn(0.100),
                        cc.scaleTo(0.1,1,1)
                    )
                    ,cc.callFunc(call,this)
                
                )
                this.endPanel.getChildByName('score').runAction(action)
                }
        }
        var add =  Math.floor( score/30)
         if(add <=1) add =1
        var anim = cc.sequence(cc.delayTime(0.025) , cc.callFunc(proceed, this)) 
        this.endPanel.runAction(anim)
        this.startVal+=add
        this.endPanel.getChildByName('score').getComponent(cc.Label).string = this.startVal 
    },
    comboAnim(score){
        // this.endPanel.getChildByName('combo').string = 
        // this.endPanel.getChildByName('score').string = 
        // this.endPanel.getChildByName('coins').string =
        var proceed = function(){
            if(this.startVal <=  score) this.comboAnim(score)
            else {
                
                this.startVal = 0
                this.endPanel.getChildByName('combo').getComponent(cc.Label).string =  this.highestCombo  
                var call = function(){this.coinAnim(this.prize)}
                var action =cc.sequence(  
                    cc.spawn(
                        cc.fadeOut(0.100),
                        cc.scaleTo(0.1,1.4,1.4)
                    )
                    ,
                    cc.spawn(
                        cc.fadeIn(0.100),
                        cc.scaleTo(0.1,1,1)
                    ),
                    cc.callFunc(call,this)
                
                )
                this.endPanel.getChildByName('combo').runAction(action)
                
                }
        }
        var add =  Math.floor( score/15)
         if(add <=1) add =1
        var anim = cc.sequence(cc.delayTime(0.025) , cc.callFunc(proceed, this)) 
        this.endPanel.runAction(anim)
        this.startVal+=add
        this.endPanel.getChildByName('combo').getComponent(cc.Label).string = this.startVal 
    },
    coinAnim(score){
        // this.endPanel.getChildByName('combo').string = 
        // this.endPanel.getChildByName('score').string = 
        // this.endPanel.getChildByName('coins').string =
        var proceed = function(){
            if(this.startVal <=  score) this.coinAnim(score)
            else {
                //this.numAnim(this.highestCombo)
                this.afterInc()
                this.startVal = 0
                this.endPanel.getChildByName('coins').getComponent(cc.Label).string =  this.prize  
                
                
                }
        }
        var add =  Math.floor( score/15)
         if(add <=1) add =1
        var anim = cc.sequence(cc.delayTime(0.025) , cc.callFunc(proceed, this)) 
        this.endPanel.runAction(anim)
        this.startVal+=add
        this.endPanel.getChildByName('coins').getComponent(cc.Label).string = this.startVal 
    },
    afterInc(){
        var star =  cc.instantiate (this.starFab); 
        
        
        star.position = cc.v2(-110,46)
        var star2 =  cc.instantiate (this.starFab); 
        star2.position = cc.v2(110,46)
          
        var emit = function(){
            this.starParts.addChild(star2); 
            this.starParts.addChild(star);  
            this.starParts.getChildByName('a').opacity =255
            this.starParts.getChildByName('b').opacity =255
        }
        var action =cc.sequence(  
            // cc.moveBy(0.05, 8,6),
            // cc.moveBy(0.05, -4,6),
            // cc.moveBy(0.05, 0,3),
            // cc.moveTo(0.1, 0,0),
            // cc.moveBy(0.05, 3,-6),
            cc.callFunc(emit , this),
            // cc.moveBy(0.05, 3,0),
            // cc.moveBy(0.05, -1,5),
            // cc.moveTo(0.1, 0,0),
            cc.spawn(
                cc.fadeOut(0.100),
                cc.scaleTo(0.1,1.7,1.7)
            )
            ,
            cc.spawn(
                cc.fadeIn(0.100),
                cc.scaleTo(0.1,1,1)
            )
        
        )
        this.endPanel.getChildByName('coins').runAction(action)
        
        


    },
    gameOverAnim(){
        //this.endPanel.position =cc.v2(0,0)
        
        //animation 
        var funcs = function(){
            console.log('hoyotoy')
            this.matrix.destroy() 
            this.startVal = 0
            //animation for showing panel make this better later include score movement animations and coins
            var panel = cc.sequence(cc.delayTime(0.1),
                cc.spawn(
                    cc.scaleTo(0.4,1,1),
                    cc.rotateBy(0.4,720),
                    cc.fadeIn(0.4)
                ),
                cc.delayTime(500),
                cc.callFunc(this.numAnim(this.score),this))
            this.endPanel.runAction(panel)
        }
        var end = cc.sequence(
            //animatiom explosion here  for the table
            cc.spawn(
                cc.delayTime(0.01),
                cc.scaleTo(0.3, 1.4,1.4).easing(cc.easeExponentialIn() ), 
            ),
            cc.delayTime(0.3),
            cc.spawn(
                cc.scaleTo(0.6, 0.4,0.4), 
                cc.moveBy(0.6, 0 , -1000),
                cc.rotateBy(0.6, 200)

            ),
            
            cc.callFunc(funcs, this)
        )
        this.matrix.getChildByName('table').runAction(end)

        
    },

    shop(){
        global.wentShop = 'main'
        cc.director.pushScene('shop')
    },
    frenzyEffect(){ 
        console.log('whyy')
        this.cameraShake()
        var frenzyburn = cc.instantiate( this.frenzyburn); 
        this.node.addChild(frenzyburn);  
        
        var slowburn =   cc.moveTo(4.8,0, -1200 ) .easing(cc.easeQuarticActionIn())
        //this.node.getChildByName('frenzyburn').runAction(slowburn)

        
 
        var t = this
        t.frenzying = true
        
        t.burgEffect =3+t.passiveFrenzyBoost
        t.panEffect = 3+t.passiveFrenzyBoost
        t.pizEffect = 3+t.passiveFrenzyBoost
        if(t.usingFrenzy  ){ 
            t.burgEffect =4+t.passiveFrenzyBoost
            t.panEffect = 4+t.passiveFrenzyBoost
            t.pizEffect = 4+t.passiveFrenzyBoost

        }
        var ends = function(){
            this.node.getChildByName('frenzyburn').stopAllActions()
            this.node.getChildByName('frenzyburn').destroy()
            t.frenzying = false
            t.burgEffect =1 
            t.panEffect = 1
            t.pizEffect = 1 
            //this.everything.position = cc.v2(0,0)

            t.oneone.getComponent('unit').frenzySoloEnd()
            t.onetwo.getComponent('unit').frenzySoloEnd()
            t.onethree.getComponent('unit').frenzySoloEnd()
            t.onefour.getComponent('unit').frenzySoloEnd()
            t.twoone.getComponent('unit').frenzySoloEnd()
            t.twotwo.getComponent('unit').frenzySoloEnd()
            t.twothree.getComponent('unit').frenzySoloEnd()
            t.twofour.getComponent('unit').frenzySoloEnd()
            t.threeone.getComponent('unit').frenzySoloEnd()
            t.threetwo.getComponent('unit').frenzySoloEnd()
            t.threethree.getComponent('unit').frenzySoloEnd()
            t.threefour.getComponent('unit').frenzySoloEnd()
            t.fourone.getComponent('unit').frenzySoloEnd()
            t.fourtwo.getComponent('unit').frenzySoloEnd()
            t.fourthree.getComponent('unit').frenzySoloEnd()
            t.fourfour.getComponent('unit').frenzySoloEnd()
        }
        var frenzyTime =cc.sequence(  cc.delayTime(5 ) ,cc.callFunc(ends,t)) 
        this.matrix.runAction(frenzyTime)
            t.oneone.getComponent('unit').frenzySolo()
            t.onetwo.getComponent('unit').frenzySolo()
            t.onethree.getComponent('unit').frenzySolo()
            t.onefour.getComponent('unit').frenzySolo()
            t.twoone.getComponent('unit').frenzySolo()
            t.twotwo.getComponent('unit').frenzySolo()
            t.twothree.getComponent('unit').frenzySolo()
            t.twofour.getComponent('unit').frenzySolo()
            t.threeone.getComponent('unit').frenzySolo()
            t.threetwo.getComponent('unit').frenzySolo()
            t.threethree.getComponent('unit').frenzySolo()
            t.threefour.getComponent('unit').frenzySolo()
            t.fourone.getComponent('unit').frenzySolo()
            t.fourtwo.getComponent('unit').frenzySolo()
            t.fourthree.getComponent('unit').frenzySolo()
            t.fourfour.getComponent('unit').frenzySolo()

 
    }, 

    useFreezeBoost(){  
        this.freezeonce = true
            this.freezing =true  
            var unfreeze = function(){ 
                this.freezing = false
            }
            this.matrix.runAction(  cc.sequence(cc.delayTime(5), cc.callFunc(unfreeze, this) )) 
         
    },

     
    
    showIndic(t){ 
        
        var fadeInOut =cc.sequence ( cc.fadeIn(0),  cc.fadeOut(4.98)  )
        switch(t.mode){
            case 'bu': 
                this.indics.getChildByName('indicBurg').runAction(fadeInOut)
                break
            case 'pi': 
                this.indics.getChildByName('indicPiz').runAction(fadeInOut)
                break
            case 'pa': 
                this.indics.getChildByName('indicPan').runAction(fadeInOut)
                break
            


        } 
        
          
    
    },
    ss(){
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
    },
    pizTwoing(){ 
        this.pizzing = true
        this.healPizz()
        if(!this.frenzying &&   this.pizzing && this.panzing && this.burging) this.frenzyEffect()
        if(!this. frenzying)this.pizEffect = 2
        var pizEnd  = function(){ 
            this.pizzing = false
            if(!this.frenzying) this .pizEffect = 1
            this.oneone.getComponent('unit').turnOnHeal()
            this.onetwo.getComponent('unit').turnOnHeal()
            this.onethree.getComponent('unit').turnOnHeal()
            this.onefour.getComponent('unit').turnOnHeal()
            this.twoone.getComponent('unit').turnOnHeal()
            this.twotwo.getComponent('unit').turnOnHeal()
            this.twothree.getComponent('unit').turnOnHeal()
            this.twofour.getComponent('unit').turnOnHeal()
            this.threeone.getComponent('unit').turnOnHeal()
            this.threetwo.getComponent('unit').turnOnHeal()
            this.threethree.getComponent('unit').turnOnHeal()
            this.threefour.getComponent('unit').turnOnHeal()
            this.fourone.getComponent('unit').turnOnHeal()
            this.fourtwo.getComponent('unit').turnOnHeal()
            this.fourthree.getComponent('unit').turnOnHeal()
            this.fourfour.getComponent('unit').turnOnHeal()}
        var t = this
        var t3 = cc.sequence( cc.delayTime(5),cc.callFunc( pizEnd, t)  )
        t.matrix.runAction(t3 )
    },
    panTwoing(){
        this.panzing = true 
        this.healPan()
        if(!this.frenzying &&   this.pizzing && this.panzing && this.burging) this.frenzyEffect()
        if(!this. frenzying)this.panEffect =2
        var panEnd  = function(){
            this.panzing = false
            if(!this. frenzying)  this. panEffect = 1  
            this.oneone.getComponent('unit').turnOnHeal()
            this.onetwo.getComponent('unit').turnOnHeal()
            this.onethree.getComponent('unit').turnOnHeal()
            this.onefour.getComponent('unit').turnOnHeal()
            this.twoone.getComponent('unit').turnOnHeal()
            this.twotwo.getComponent('unit').turnOnHeal()
            this.twothree.getComponent('unit').turnOnHeal()
            this.twofour.getComponent('unit').turnOnHeal()
            this.threeone.getComponent('unit').turnOnHeal()
            this.threetwo.getComponent('unit').turnOnHeal()
            this.threethree.getComponent('unit').turnOnHeal()
            this.threefour.getComponent('unit').turnOnHeal()
            this.fourone.getComponent('unit').turnOnHeal()
            this.fourtwo.getComponent('unit').turnOnHeal()
            this.fourthree.getComponent('unit').turnOnHeal()
            this.fourfour.getComponent('unit').turnOnHeal()} 
        var t = this
        var t2 = cc.sequence( cc.delayTime(5),cc.callFunc( panEnd, t)  )
        t.matrix.runAction(t2 )
    },
    burgTwoing(){ 
            this.burging = true
            this.healBurg()
            if(!this.frenzying &&   this.pizzing && this.panzing && this.burging) this.frenzyEffect()
       // console.log('sana is pabo')
        if(!this. frenzying)this.burgEffect =2
        var burgEnd  = function(){  
            this.burging = false 
            this.oneone.getComponent('unit').turnOnHeal()
            this.onetwo.getComponent('unit').turnOnHeal()
            this.onethree.getComponent('unit').turnOnHeal()
            this.onefour.getComponent('unit').turnOnHeal()
            this.twoone.getComponent('unit').turnOnHeal()
            this.twotwo.getComponent('unit').turnOnHeal()
            this.twothree.getComponent('unit').turnOnHeal()
            this.twofour.getComponent('unit').turnOnHeal()
            this.threeone.getComponent('unit').turnOnHeal()
            this.threetwo.getComponent('unit').turnOnHeal()
            this.threethree.getComponent('unit').turnOnHeal()
            this.threefour.getComponent('unit').turnOnHeal()
            this.fourone.getComponent('unit').turnOnHeal()
            this.fourtwo.getComponent('unit').turnOnHeal()
            this.fourthree.getComponent('unit').turnOnHeal()
            this.fourfour.getComponent('unit').turnOnHeal()
            if(!this. frenzying) this  .burgEffect = 1 
            
        
        }
        var t = this
        var t1 = cc.sequence( cc.delayTime(5),cc.callFunc( burgEnd, t)  )
        t.matrix.runAction(t1 )
    },
    cameraShake(){
        //let cameraShakeA = cc.sequence(cc.moveTo( 0.1, 0, cc.randomMinus1To1()*24) ,cc.moveTo(0.1, 0, -cc.random0To1()*24)).repeat(10)
        //this.everything.runAction(cameraShakeA)
    }, 
    healPan(){ 
            this.oneone.getComponent('unit').turnOffHeal('pa')
            this.onetwo.getComponent('unit').turnOffHeal('pa')
            this.onethree.getComponent('unit').turnOffHeal('pa')
            this.onefour.getComponent('unit').turnOffHeal('pa')
            this.twoone.getComponent('unit').turnOffHeal('pa')
            this.twotwo.getComponent('unit').turnOffHeal('pa')
            this.twothree.getComponent('unit').turnOffHeal('pa')
            this.twofour.getComponent('unit').turnOffHeal('pa')
            this.threeone.getComponent('unit').turnOffHeal('pa')
            this.threetwo.getComponent('unit').turnOffHeal('pa')
            this.threethree.getComponent('unit').turnOffHeal('pa')
            this.threefour.getComponent('unit').turnOffHeal('pa')
            this.fourone.getComponent('unit').turnOffHeal('pa')
            this.fourtwo.getComponent('unit').turnOffHeal('pa')
            this.fourthree.getComponent('unit').turnOffHeal('pa')
            this.fourfour.getComponent('unit').turnOffHeal('pa')
         
    },
    healPizz(){ 
            this.oneone.getComponent('unit').turnOffHeal('pi')
            this.onetwo.getComponent('unit').turnOffHeal('pi')
            this.onethree.getComponent('unit').turnOffHeal('pi')
            this.onefour.getComponent('unit').turnOffHeal('pi')
            this.twoone.getComponent('unit').turnOffHeal('pi')
            this.twotwo.getComponent('unit').turnOffHeal('pi')
            this.twothree.getComponent('unit').turnOffHeal('pi')
            this.twofour.getComponent('unit').turnOffHeal('pi')
            this.threeone.getComponent('unit').turnOffHeal('pi')
            this.threetwo.getComponent('unit').turnOffHeal('pi')
            this.threethree.getComponent('unit').turnOffHeal('pi')
            this.threefour.getComponent('unit').turnOffHeal('pi')
            this.fourone.getComponent('unit').turnOffHeal('pi')
            this.fourtwo.getComponent('unit').turnOffHeal('pi')
            this.fourthree.getComponent('unit').turnOffHeal('pi')
            this.fourfour.getComponent('unit').turnOffHeal('pi') 
    },
    healBurg(){  
        this.oneone.getComponent('unit').turnOffHeal('bu')
        this.onetwo.getComponent('unit').turnOffHeal('bu')
        this.onethree.getComponent('unit').turnOffHeal('bu')
        this.onefour.getComponent('unit').turnOffHeal('bu')
        this.twoone.getComponent('unit').turnOffHeal('bu')
        this.twotwo.getComponent('unit').turnOffHeal('bu')
        this.twothree.getComponent('unit').turnOffHeal('bu')
        this.twofour.getComponent('unit').turnOffHeal('bu')
        this.threeone.getComponent('unit').turnOffHeal('bu')
        this.threetwo.getComponent('unit').turnOffHeal('bu')
        this.threethree.getComponent('unit').turnOffHeal('bu')
        this.threefour.getComponent('unit').turnOffHeal('bu')
        this.fourone.getComponent('unit').turnOffHeal('bu')
        this.fourtwo.getComponent('unit').turnOffHeal('bu')
        this.fourthree.getComponent('unit').turnOffHeal('bu')
        this.fourfour.getComponent('unit').turnOffHeal('bu') 
    
     
},

   
   update (dt) {    
  
        
       //console.log(this.burgEffect , this.pizEffect , this.panEffect , this.frenzying)
        
         
        

 
       

        

      
    //console.log(this.panEffect , this.pizEffect , this.burgEffect)
    
   },
   toggled(x ){   
    
       this.toggling(x)     
        this.list.push(x)   
        
        if(this.list.length >2){
           this.list.shift()
        } 
        this.prev = this.list[0] 

        if(this.list.length ==2){

            if(this.prev === x){
                this.list = []
                x.selected = false
                this.correct = false 
                this.comboctr = 0

            }
        
            else if(this.prev.level === x.level && this.prev.mode === x.mode && this.prev !=x &&x.selected      ){ 
                if(this.comboctr>=5){

                    var barstu = cc.instantiate(this.burstEffect); 
                   x.node.addChild(barstu);  
                  // this.prev.node.addChild(barstu); 
                  barstu.position = cc.v2(0,0 ) 
                  if(x.level ==2){
                  var ass = cc.instantiate(this.burstEffect); 
                  this.prev.node.addChild(ass);  
                  // this.prev.node.addChild(barstu); 
                  ass.position = cc.v2(0,0 ) }

                  this.comboLabel.position =x.node.position
                  var comboFade = cc.sequence( cc.fadeIn(0), cc.spawn( cc.moveBy(0.6, 0, 90) , cc.fadeOut(0.6)))
                  this.comboLabel.runAction(comboFade)

                   
                  


              } 
                
                this.correct = true
                if(this.prev.level < 2){this.prev.death()}
                x.fuse()  
                this.comboctr+=1
                this.list = []  

 
                this.node.stopAllActions() 
                var comboEnd  = function(){
                    this.comboctr = 0

                }
                var t = this
                var times = cc.sequence( cc.delayTime(1),cc.callFunc( comboEnd, t)  )
                this.node.runAction(times )
                 
                
                
                

 
            }

            else if(this.prev.level !== x.level || this.prev.mode !== x.mode){
                this.correct = false
                x.selected = false
                this.vibrate(x)
               this.list = []  
               this.comboctr=0

                

            }
        }
       else{

           //x.selected = false
       }

     // x.node.addComponent(cc.ParticleSystem).file = 
        
       

    
 
   },
  
   vibrate(x){
   

    
    var wrong = cc.sequence( 
        cc.spawn(
        cc.tintTo(0.3 , 222 , 0 ,0 ),
        cc.fadeTo(0.3, 144), 
        cc.scaleTo(0.3, 1.2, 1.2).easing(cc.easeExponentialIn()),
        ),

        cc.sequence(
            cc.moveTo(0.1 , 3 , 4).easing(cc.easeExponentialIn()),
            cc.moveTo(0.1 , -2 , -3).easing(cc.easeExponentialIn()),
            cc.moveTo(0.1 , 3 , -4).easing(cc.easeExponentialIn()),
            cc.moveTo(0.1 , -2 , 2).easing(cc.easeExponentialIn()), ),
    cc.moveTo(0.1 , 0,0),
    cc.fadeTo(0.3 , 255),
    cc.tintTo(0.3 , 255 , 255 ,255 ),
    
     
        //callabck func
)
    var wrongs = cc.sequence( 
            cc.spawn(
            cc.tintTo(0.3 , 222 , 0 ,0 ),
            cc.fadeTo(0.3, 144), 
            cc.scaleTo(0.3, 1.2, 1.2).easing(cc.easeExponentialIn()),
            ),

            cc.sequence(
                cc.moveTo(0.1 , 3 , 4).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , -2 , -3).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , 3 , -4).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , -2 , 2).easing(cc.easeExponentialIn()), ),
        cc.moveTo(0.1 , 0,0),
        cc.fadeTo(0.3 , 255),
        cc.tintTo(0.3 , 255 , 255 ,255 ),
        
         
            //callabck func
    )
    this.prev.frame.node.runAction(wrong) 
    x.frame.node.runAction(wrongs)
    


   },
   setScoreBoardCntxtfl(score)
   { //worked for global contexts
       if (typeof FBInstant === 'undefined') return;  
       FBInstant
           .getLeaderboardAsync('cntxtLdrbrd.'+FBInstant.context.getID())
           .then(leaderboard => {
               console.log(leaderboard.getName());
               return leaderboard.setScoreAsync(  score  );
                               })
           .then(() => console.log('Score saveds'))
           .catch(error => console.error(error));
   },
   postBoard(){ //worked
    if (typeof FBInstant === 'undefined') return; 
    FBInstant.updateAsync({
        action: 'LEADERBOARD',
        name: 'cntxtLdrbrd.' + FBInstant.context.getID()
      })
        .then(() => console.log('Update Posted'))
        .catch(error => console.error(error));
},
getIMG(){

    let canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    let ctx = canvas.getContext('2d');      
    return canvas.toDataURL('image/png');

}, 
    resume(){
        cc.director.resume()
        this.pauseBtn.interactable = true
        this.pausemenu.opacity=255
        this.pausemenu.position=cc.v2(-800, -800)


    },
    showPrompt(){
        this.boosterPrompt.setLocalZOrder(10)
       if(this.frenzyBoosts == 0) this.boosterFrenzy.getChildByName("New Sprite").color = new cc.Color(110, 110,110);
       if(this.freezeBoosts == 0) this.boosterTime.getChildByName("New Sprite").color = new cc.Color(110, 110,110);
       if(this.spawnBoosts == 0) this.boosterSpawn.getChildByName("New Sprite").color = new cc.Color(110, 110,110);
        this.boosterPrompt.position = cc.v2(0,0)
    },
    closePrompt(){
        //insert closing action here
        this.boosterPrompt.position = cc.v2(-1000,-1000)
        this.boosterPrompt.setLocalZOrder(-10)
    },
     
    Goplay(){

        cc.director.loadScene('main');
    },

      //==============================================================================
useSpawn(){
    
     
        var usingAction = cc.repeatForever(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(1, 0, 15),
                    cc.scaleTo(1, 0.21,0.21)
            ),
                cc.spawn(
                    cc.moveBy(1, 0, -15),
                    cc.scaleTo(1, 0.17 ,0.17 )
                ),
            
                 
            ));
        if(this.spawnBoosts>=1){
            this.boosterSpawn.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string =  "using"
            this.usingSpawn = !this.usingSpawn
             
            
        if(this.usingSpawn) this.spawnBoosts-=1
        else this.spawnBoosts+=1
        //this.setLabels()
        this.storage.spawnBoosts = this.spawnBoosts 
        this.storage.usingSpawn = this.usingSpawn
        this.ss()
       // this.boosterSpawn.getChildByName("New Sprite").runAction(usingAction)
        }
        else if(this.usingSpawn) {spawnBoosts
            this.boosterSpawn.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string = this.freezeBoosts +" left"
            
        
   
         

            this.usingSpawn = !this.usingSpawn 
            if(this.usingSpawn) this.spawnBoosts-=1
            else this.spawnBoosts+=1
            this.setLabels()
            this.storage.spawnBoosts = this.spawnBoosts 
            this.storage.usingSpawn = this.usingSpawn
            this.ss() 
        }
    },

    useFreeze(){ 
        
        
        var usingAction = cc.repeatForever(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(1, 0, 15),
                    cc.scaleTo(1, 0.21,0.21)
            ),
                cc.spawn(
                    cc.moveBy(1, 0, -15),
                    cc.scaleTo(1, 0.17 ,0.17 )
                ),
            
                 
            ));
        if(this.freezeBoosts>=1){
            this.boosterTime.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string =  "using"
            this.usingFreeze = !this.usingFreeze 
        if(this.usingFreeze) this.freezeBoosts-=1
        else this.freezeBoosts+=1
        //this.setLabels()
        this.storage.freezeBoosts = this.freezeBoosts
        this.storage.usingFreeze = this.usingFreeze
        this.ss()
       // this.boosterTime.getChildByName("New Sprite").runAction(usingAction)
        }
        else if(this.usingFreeze) {
            this.boosterTime.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string = this.boosterTime +" left"
            
          

            this.usingFreeze = !this.usingFreeze 
            if(this.usingFreeze) this.freezeBoosts-=1
            else this.freezeBoosts+=1
            this.setLabels()
            this.storage.freezeBoosts = this.freezeBoosts
            this.storage.usingFreeze = this.usingFreeze
            this.ss() 
        }
    },
    useFrenzy(){

        
        var usingAction = cc.repeatForever(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(1, 0, 15),
                    cc.scaleTo(1, 0.21,0.21)
            ),
                cc.spawn(
                    cc.moveBy(1, 0, -15),
                    cc.scaleTo(1, 0.17 ,0.17 )
                ),
            
                 
            ));
            
        
        
        console.log('frboosts ' ,this.frenzyBoosts)
        if(this.frenzyBoosts>=1){
            this.boosterFrenzy.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string =  "using" 
            //his.frenzy.getChildByName("New Sprite").runAction(usingAction)
            
            this.usingFrenzy = !this.usingFrenzy
          
        console.log(this.usingFrenzy , "using Frenzy")
        if(this.usingFrenzy) this.frenzyBoosts-=1
        else this.frenzyBoosts+=1
        //this.setLabels()
        this.storage.frenzyBoosts = this.frenzyBoosts
        
        this.storage.usingFrenzy = this.usingFrenzy
        this.ss()


        //this.boosterFrenzy.getChildByName("New Sprite").runAction(usingAction)
        }
        else if(this.usingFrenzy) {
            this.boosterFrenzy.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string = this.boosterFrenzy +" left" 
            this.usingFrenzy = !this.usingFrenzy 
          
        console.log(this.usingFrenzy , "using Frenzy")
        if(this.usingFrenzy) this.frenzyBoosts-=1
        else this.frenzyBoosts+=1
        this.setLabels()
        this.storage.frenzyBoosts = this.frenzyBoosts
        
        this.storage.usingFrenzy = this.usingFrenzy
        this.ss()


        }
    },

    setLabels(){
        if(this.freezeBoosts ==0 ) this.boosterTime.getChildByName("New Button").getComponent(cc.Button).interactable = false
        if(this.spawnBoosts ==0 ) this.boosterSpawn.getChildByName("New Button").getComponent(cc.Button).interactable = false
        if(this.frenzyBoosts ==0 ) this.boosterFrenzy.getChildByName("New Button").getComponent(cc.Button).interactable = false
        this.boosterTime.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string = this.freezeBoosts +" left"
        this.boosterSpawn.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string = this.spawnBoosts +" left"
        this.boosterFrenzy.getChildByName("New Button").getChildByName("left").getComponent(cc.Label).string = this.frenzyBoosts +" left"

    },
    //==============================================================================
   toggling(x){ 
       if(x.isEmpty ) return
    switch(x){
        case this.oneone.getComponent('unit'):
            x.selected = !x.selected 
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.onetwo.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false 
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break 
        case this.onethree.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false 
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.onefour.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false 
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.twoone.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false 
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.twotwo.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false 
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break 
        case this.twothree.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false 
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.twofour.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false 
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.threeone.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false 
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.threetwo.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false 
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break 
        case this.threethree.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false 
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.threefour.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false 
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.fourone.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false 
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break
        case this.fourtwo.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false 
            this.fourthree.getComponent('unit').selected = false
            this.fourfour.getComponent('unit').selected = false
            break 
        case this.fourthree.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false 
            this.fourfour.getComponent('unit').selected = false
            break
        case this.fourfour.getComponent('unit'):
            x.selected = !x.selected
            this.oneone.getComponent('unit').selected = false
            this.onetwo.getComponent('unit').selected = false
            this.onethree.getComponent('unit').selected = false
            this.onefour.getComponent('unit').selected = false
            this.twoone.getComponent('unit').selected = false
            this.twotwo.getComponent('unit').selected = false
            this.twothree.getComponent('unit').selected = false
            this.twofour.getComponent('unit').selected = false
            this.threeone.getComponent('unit').selected = false
            this.threetwo.getComponent('unit').selected = false
            this.threethree.getComponent('unit').selected = false
            this.threefour.getComponent('unit').selected = false
            this.fourone.getComponent('unit').selected = false
            this.fourtwo.getComponent('unit').selected = false
            this.fourthree.getComponent('unit').selected = false 
            break

   }
   }
});
