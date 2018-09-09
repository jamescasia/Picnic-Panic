 
var global = require('global')  
cc.Class({
    extends: cc.Component,

    properties: {
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

        timeBoostSprt:cc.Prefab,
        spawnBoostSpr:cc.Prefab,
        frenzyBoostSprt:cc.Prefab,
        boostersPanel:cc.Node,
        abText:cc.Node,
        d:cc.Node
 
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
    readDB(){},

    onLoad () {        
        
        //firebase.database().ref('/users/'+global.global_userID+'/activeContests/'+key).set(FBInstant.context.getID()) 
        
        //this.saveToDB()
        //this.setEnemy() 
        //console.log('globo here' , global.global_userID , global.global_userData.val().activeContests)
        //console.log('gonoing',global.global_activeContests.val()[FBInstant.context.getID()].ongoing )
        

       // cc.director.setDisplayStats ( false )  
        
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
                passiveTimeLvl:0
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
        this.usingFrenzy =    JSON.parse(this.storage.usingFrenzy)
        this.usingSpawn =    JSON.parse(this.storage.usingSpawn)
        console.log(this.usingSpawn, "TBGIII", this.usingFreeze, this.usingFrenzy)
        this.coins =  JSON.parse(parseInt( this.storage.coins) )
        this.passiveComboBoost = JSON.parse (parseInt(this.storage.passiveComboBoost))
        this.passiveTimeBoost = JSON.parse( parseInt(this.storage.passiveTimeBoost))
        this.passiveFrenzyBoost = (parseInt( this.storage.passiveFrenzyBoost))
        this.highestCombo =JSON.parse  (parseInt(this.storage.highestCombo))
        this.highestScore =JSON.parse (parseInt( this.storage.highestScore))
        this.hsLabel.getComponent(cc.Label).string =  String(this.highestScore)
        console.log('HIGHESST', this.highestScore)
        this.ss()
        this.boosterShow()
        
 

        
        

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
        cc.director.loadScene('shop');
    },
    onPause(){
        this.pausemenu.opacity=255
        this.pausemenu.position = cc.v2(-42, 110)
        if(this.pauseBtn.getComponent(cc.Toggle).isChecked) {
            cc.director.pause()  
        }
        else {
            cc.director.resume()
            this.pausemenu.opacity=0
            this.pausemenu.position = cc.v2(400, 110)
             
        }
    },
    retry(){ 
        cc.director.resume()
         cc.director.loadScene('main')
    },

    start () {   
        console.log("GAME" , this.storage  )

        this.highestCombo = 0
        this.comboctr  = 0
        var timectr = 0
        var t= this  
        var left = 60

        var gameTimer = t.schedule(function() { 
            

              
            if (t.usingFreeze  )   t.timelmt = 70  +t.passiveTimeBoost
            else t.timelmt = 60+t.passiveTimeBoost 
                 
            left =  (t.timelmt- timectr  ).toFixed(2)  
            t.timebar.getComponent(cc.ProgressBar).progress = left/t.timelmt
            timectr+= 0.1
            
            t.lapse = timectr
            

            if(left <=0 && !this.gameover  ){ 
               // t.sdkWork() 
                var prize =  Math.round(Math.random()*200) 
                if(prize <= 100) prize = 100+ Math.floor(Math.random()*22)
                
                if(this.comboctr >= this.highestCombo) this.highestCombo = this.comboctr
                
                if(t.score >= t.highestScore){ t.highestScore = t.score
                    prize+= 80
 
                }
                t.coins +=prize
                this.prize = prize 
                this.storage.coins = t.coins
                this.storage.highestScore = t.highestScore
                t.endPanel.getComponent('layoutScript').showPanel(t.score ,t.highestCombo,t.prize ,t.highestScore)
                t.gameover = true
                t.numOfGames+=1
                t.matrix.destroy()  
                this.usingFrenzy = false
                this.usingFreeze = false
                this.usingSpawn = false
                this.storage.usingFrenzy = false
                this.storage.usingFreeze = false
                this.storage.usingSpawn = false

                this.storage.numOfGames = t.numOfGames 
                this.ss()
                
            } 

            t.timeLabel.getComponent(cc.Label).string = String(left).replace("." , ':')


        }, 0.1, 750,1.5);
        
        
         
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
        console.log('fuckk')
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
        
         
        

 
       this.scoreLabel.getComponent(cc.Label).string = this.score
       this.comboLabel.getComponent(cc.Label).string = this.comboctr 

        

      
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
            cc.sequence(
                cc.moveTo(0.1 , 3 , 4).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , -2 , -3).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , 3 , -4).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , -2 , 2).easing(cc.easeExponentialIn()),
            ).speed(3).repeat(3)
        ) ,
        cc.moveTo(0.1 , 0,0),
        cc.fadeTo(0.3 , 255),
        cc.tintTo(0.3 , 255 , 255 ,255 ),
        
         
            //callabck func
    ).speed(1).repeat(1); 
    var wrongs = cc.sequence(
        cc.spawn(
            cc.tintTo(0.3 , 222 , 0 ,0 ),
            cc.fadeTo(0.3, 144), 
            
            cc.scaleTo(0.3, 1.2, 1.2).easing(cc.easeExponentialIn()),
            cc.sequence(
                cc.moveTo(0.1 , 3 , 4).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , -2 , -3).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , 3 , -4).easing(cc.easeExponentialIn()),
                cc.moveTo(0.1 , -2 , 2).easing(cc.easeExponentialIn()),
            ).speed(3).repeat(3)
        ) ,
        cc.moveTo(0.1 , 0,0),
        cc.fadeTo(0.3 , 255),
        cc.tintTo(0.3 , 255 , 255 ,255 ),
        
         
            //callabck func
    ).speed(1).repeat(1); 
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
    resume(){cc.director.resume()

        this.pausemenu.opacity=255
        this.pausemenu.position=cc.v2(-800, -800)


    },
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
