 var global= require('global')  
cc.Class({
    extends: cc.Component,

    properties: { 

        game:cc.Node,
        choices:[], 
        frame:cc.Sprite,
        usedParticle:"",
        bongTex:null,
        sakuraTex:null,
        blossomTex:null,
        leafTex:null,
         
        customBurst:cc.Prefab,

        level:2,
        isEmpty:true,
        mode:'a',
        selected:false, 
        gameover:false,
        selectAnim:null,
        initctr:0,  
        callonce:false, 
        spawnFactor:1,
        addc:false,
        boostactn:null,
        frenzySoloFx:null,
        boostonce:false,
        healOnce:false,
        healactn:null,
        runonce:false,
        barstu:null, 
        custo:null, 
        
        

    },
 

    onLoad () { 
        this.healactn = cc.sequence( cc.fadeTo(0.2, 150) , cc.fadeTo(0.2, 255)).repeat(15)
        this.frenzySoloFx =   
            cc.sequence( 
                cc.scaleTo(0.3, 1.125, 1.125),  
                cc.scaleTo(4.5 , 1.125, 1.125),
                cc.scaleTo(0.2 , 1,1) 

                ) 
        this.choices = [ this.game.getComponent('Game').bu1 , this.game.getComponent('Game').pa1, this.game.getComponent('Game').pi1]
        this.node.on('click', this.clicked, this);
        this.boostactn = cc.sequence(
            cc.scaleTo(0.3  , 1.1 , 1.1) ,
            cc.scaleTo(4.4 , 1.125 , 1.125),
            cc.scaleTo(0.3 , 1 ,1)   
        )  
    },
    preloadParts(){
         this.barstu =cc.instantiate( this.game.getComponent('Game').burstEffect); 
         if(this.game.getComponent('Game').usedParticle != null) {this.custo = cc.instantiate(this.customBurst)
                    switch(this.usedParticle){
                        case "leaf":
                            this.custo .getComponent(cc.ParticleSystem).texture = this.leafTex 

                        break
                        case "pinkLeaf":
                        this.custo .getComponent(cc.ParticleSystem).texture = this.blossomTex 

                        break
                        case "sakura":
                        this.custo .getComponent(cc.ParticleSystem).texture = this.sakuraTex 

                        break
                        case "bong":
                        this.custo .getComponent(cc.ParticleSystem).texture = this.bongTex 

                        break

                    }
                    this.node.addChild(this.custo);  }

                    this.node.addChild(this.barstu); 
                    
    },

    startNow () {
        this.customBurst = this.game.getComponent('Game').customBurst
        this.usedParticle = this.game.getComponent('Game').usedParticle
        this.leafTex =  this.game.getComponent('Game').leafTex
        this.sakuraTex =  this.game.getComponent('Game').sakuraTex
        this.blossomTex =  this.game.getComponent('Game').blossomTex
        this.bongTex =  this.game.getComponent('Game').bongTex
        this.frame.node.opacity = 0
        this.initialize() 

        
        

    },
    initialize(){  
        this.preloadParts()
        
        if(!this.gameover){
        this.level = 0
        this.addFood() 
        }
        this.initctr +=1

    },
    indicated(){

        
    },
    death(){
        this.isEmpty = true
        this.turnOnHeal()
        
        this.mode = null
        
        this.level = 0
        if(this.level <2){
            this.frame.spriteFrame = null

        }
        
        
        this.mode = null

        this.scheduleOnce(function() {
            this.initialize()
        },   ( this.spawnFactor*(Math.round(cc.rand() )  %3 )+ (1.8*this.spawnFactor))   );
            
    },
    frenzySoloEnd(){
        this.frame.node.stopAction(this.frenzySoloFx)

    },
    frenzySolo(){  
        this.frame.node.runAction(this.frenzySoloFx)
    }, 
    fuse(){
        // cc.audioEngine.playEffect( this.game.getComponent('Game').fuseFX,false,global.bgVolume) 
        this.selected = false
        
        var a = Math. abs( Math.random () )

        
        var pumpUp = cc.sequence(
            cc.spawn(
                cc.moveTo(0.1  , 0 ,a* 8.5) ,
                cc.scaleTo(0.1, 1.4, 1.4) ,
                cc.skewTo(0.1  , 0,  cc.randomMinus1To1 ()*6) ,
                //cc.tintTo(0.2 ,300,300  ,300)
            )   ,
            cc.moveBy(0.04,0,0),
            cc.spawn(
                //cc.tintTo(0.2 , 255, 255 ,255),
                cc.moveTo(0.3 , 0 , 0) ,
                cc.scaleTo(0.3, 1 , 1 )  , 
                cc.skewTo(0.3 , 0,0) , 
            )
                //cc.delayTime(0.5),  
        ).speed(2 ) 

 
 


        this.frame.node.runAction(pumpUp) 

        if(this.game.getComponent('Game').comboctr >=5 ){
            this.game.getComponent('Game').score += this.game.getComponent('Game').passiveComboBoost + Math.round (this.game.getComponent('Game').comboctr /2 )
        }
        if(this.level ==0){
        
            switch(this.mode){
                case 'bu':
                this.game.getComponent('Game').score+=4*this.game.getComponent('Game').burgEffect
                
                    break
                case 'pa':
                this.game.getComponent('Game').score+=4*this.game.getComponent('Game').panEffect
                    break
                case 'pi':
                this.game.getComponent('Game').score+=4*this.game.getComponent('Game').pizEffect
                    break
            }
        }
        else if(this.level ==1){
        
            switch(this.mode){
                case 'bu':
                this.game.getComponent('Game').score+=8*this.game.getComponent('Game').burgEffect
                    break
                case 'pa':
                this.game.getComponent('Game').score+=8*this.game.getComponent('Game').panEffect
                    break
                case 'pi':
                this.game.getComponent('Game').score+=8*this.game.getComponent('Game').pizEffect
                    break
            }
        }
        else if(this.level==2){ 
             
             

            var prevNode = this.game.getComponent('Game').prev
           var t  = this 
           var kill = function(){ 
            cc.audioEngine.playEffect( this.game.getComponent('Game').burstSound,false,0.7*global.bgVolume) 
               t.isEmpty =true
            switch(this.mode){
                case 'bu': 
                    this.game.getComponent('Game').score+=16*this.game.getComponent('Game').burgEffect  
                    this.game.getComponent('Game').burgTwoing()
                    
                    break
                case 'pa': 
                    this.game.getComponent('Game').score+=16*this.game.getComponent('Game').panEffect  
                    this.game.getComponent('Game').panTwoing()
                    break
                case 'pi': 
                    this.game.getComponent('Game').score+=16*this.game.getComponent('Game').pizEffect 
                    this.game.getComponent('Game').pizTwoing()
                    break
            }  
          
            
            this.game.getComponent('Game').showIndic(t) 
            this.barstu.position =    cc.v2( -0.5*( t.node.x -prevNode.node.x) ,-0.5*(t.node.y -prevNode.node.y))
            this.barstu.getComponent(cc.ParticleSystem).resetSystem() 
            //   this.barstu.position = cc.v2(0,0 ) 
            if(this.game.getComponent('Game').usedParticle != null) {
            this.custo.position =    cc.v2( -0.5*( t.node.x -prevNode.node.x) ,-0.5*(t.node.y -prevNode.node.y))
            this.custo.getComponent(cc.ParticleSystem).resetSystem() }
            //   this.barstu.position = cc.v2(0,0 ) 
            
            t.death() 
            prevNode.death() 
            
            t.frame.spriteFrame = null
            prevNode.frame.spriteFrame = null

            //this.game.getComponent('Game').boostEm() 

        } 

            var explode = cc.sequence(  
                cc.spawn(
                    // cc.follow(1, prevNode.node), 
                    cc.moveTo(0.52,  (prevNode.node.x -t.node.x)/2, (prevNode.node.y -t.node.y)/2 ).easing(cc.easeExponentialIn()),                  
                    cc.fadeTo(0.3 , 145)
                ) ,cc.scaleTo(0.13, 1.5, 1.5).easing(cc.easeExponentialIn()),
                
                      
            ) 
            var explode2 = cc.sequence(  
                cc.spawn(
                    cc.moveTo(0.52 ,    0.5*( t.node.x -prevNode.node.x) ,0.5*(t.node.y -prevNode.node.y)).easing(cc.easeExponentialIn()),
                    cc.fadeTo(0.3 ,145)
                ) ,
                    cc.scaleTo(0.13, 1.5 ,1.5).easing(cc.easeExponentialIn()), 
                     //cc.callFunc(kill , t)
                     cc.callFunc(kill , t)
            ) 
            t.isEmpty = true
            t.frame.node.runAction(explode)
            prevNode.frame.node.runAction(explode2)
            
            
            
        } 
        
        this.level+=1



    },  
    turnOffHeal(x){

        if(x == this.mode&& !this.healOnce) {
            this.node.runAction(this.healactn)
            this.healOnce = true
            var healu = cc.instantiate( this.game.getComponent('Game').boostHeal); 
            this.node.addChild(healu);  
            //console.log(this.node.getChildByName('healu'))

        }
    },
    turnOnHeal(){
        this.healOnce = false  
        if(this.node.getChildByName('boostHeal')!=null)  {
            this.node.getChildByName('boostHeal').destroy()
            this.node.stopAction(this.healactn)
            this.node.opacity =255
    
    }


    },

    gmvrFx(){//animation for gameover right after gameover
        this.runonce = true

        //this.frame.node.stopAllActions()
        var as = [1,-1]
        var gmvr = cc.sequence(
            cc.delayTime(0.2),

            cc.spawn(
                cc.scaleTo(2, 2,2),
                cc.moveBy(2,   as[ parseInt(cc.rand())%2]* (500+cc.rand()%400) ,  as[parseInt(cc.rand())%2]*(500+cc.rand()%400)).easing(cc.easeCircleActionOut())
            ),
            cc.spawn(
                cc.moveBy(0.4,0,-1000 ).easing(cc.easeExponentialIn()),
                cc.scaleTo(2, 2,2),
            )
            
        )

        this.frame.node.runAction(gmvr)


    },
    
    
     
    

    update (dt) {  
        if(this.game.getComponent('Game').burgEffect >=2) this.spawnFactor = 0.2
        else this.spawnFactor = 1  
        
        if(this.game.getComponent('Game').lapse >=   this.game.getComponent('Game').timelmt-6 &&  this.game.getComponent('Game').lapse!=60 && !this.gameover ){ 
            var shake = cc.sequence(cc.skewTo(0.1 ,  cc.randomMinus1To1    ()*16 , cc.randomMinus1To1 ()*16 )  , cc.skewTo(0.1 , 0,0 ) ) 
            this.frame.node.runAction(shake)

        }
  
        this.gameover = this.game.getComponent('Game').gameover 
        if(this.gameover && !this.runonce) this.gmvrFx()
        //effect on level three burst
         
      
        if(this.selected){ 
            this.frame.node.scale = cc.v2(1.15,1.15) 
            
            if(this.level ===0){
                switch(this.mode){
                    case 'bu': 
                        this.frame.spriteFrame = this.game.getComponent('Game').bu1s
                        break
                    case 'pa': 
                        this.frame.spriteFrame = this.game.getComponent('Game').pa1s
                        break
                    case 'pi': 
                        this.frame.spriteFrame = this.game.getComponent('Game').pi1s
                        break
                }
            }
                if(this.level ===1){
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.game.getComponent('Game').bu2s
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pa2s
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pi2s
                            break
                    }
        
                }
                if(this.level ===2){
                    
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.game.getComponent('Game').bu3s
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pa3s
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pi3s
                            break
                    }
        
                }
        }
        else {
            
            this.frame.node.scale = cc.v2(1 ,1 )
            if(this.level ===0){
                switch(this.mode){
                    case 'bu': 
                        this.frame.spriteFrame = this.game.getComponent('Game').bu1
                        break
                    case 'pa': 
                        this.frame.spriteFrame = this.game.getComponent('Game').pa1
                        break
                    case 'pi': 
                        this.frame.spriteFrame = this.game.getComponent('Game').pi1
                        break
                }
            }
                if(this.level ===1){
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.game.getComponent('Game').bu2
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pa2
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pi2
                            break
                    }
        
                }
                if(this.level ===2){
                    
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.game.getComponent('Game').bu3
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pa3
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.game.getComponent('Game').pi3
                            break
                    }
        
                }

        }
         
    },
    addFood(){
        if(this.isEmpty){ 
            

        var rand =  parseInt( cc.rand() )%3 
        //console.log("random" + rand) 0 1 2 3 4 5 
        if (this.game.getComponent('Game').usingSpawn ) {
            var r= parseInt( cc.rand() )%11
            if(r===3) this.level =2
        }
        //this. frame.spriteFrame = this.choices[Math.floor(Math.random()) % (this.choices.length)]
        switch(rand){
            case 0:
                this.mode = 'bu'
                break
            case 1:
                this.mode = 'pa'
                break
            case 2:
                this.mode = 'pi'
                break
        } 
        this.isEmpty = false
        this.frame.node.scale = cc.v2(0,0)
        this.frame.node.position = cc.v2(0,0)
    
        
        var born =cc.spawn(
            cc.scaleTo(0.17 , 1,1)  ,
            cc.fadeIn(0.17  ).easing(cc.easeBackIn()),
             
        ) 
        var a =    Math.abs(    Math.random ())
        var b =   Math.abs( Math.random ())
         
        var sound = function(){ 
            // if(this.node._name == "oneone")cc.audioEngine.playEffect(this.game.getComponent('Game').startSound,false,0.7*global.bgVolume) 
        }
        var firstborn =cc.sequence(
            cc.fadeTo(0, 0),
            cc.moveBy(0.4 , 0, 660), 
            cc.spawn(
                
                cc.fadeIn(0),
                cc.moveTo(0.2 , 0,0).easing(cc.easeSineIn()), 
            ),
            cc.moveBy(0,0,0),
            
            
            cc.spawn(
                
                cc.skewTo(0.1 , 0, Math.random ()*7 ).easing(cc.easeCircleActionOut()),
                cc.moveBy(a *0.1 , 0 , a *80).easing(cc.easeCircleActionOut()),
            ),
            cc.moveTo(0.083 *a , 0 , 0).easing(cc.easeSineIn())  , 
            cc.spawn( 
                cc.skewTo(  0.2 , 0, Math.random ()*3.5  ).easing(cc.easeCircleActionOut()),
                cc.moveBy(b *0.06 , 0 , b *55).easing(cc.easeCircleActionOut()), 
            ),
            cc.moveBy(0,0,0),
            cc.spawn(   
                cc.moveTo(0.042*b  , 0 , 0).easing(cc.easeSineIn()), 
                cc.skewTo(0.083*b , 0,0).easing(cc.easeSineIn()), 
            ) ,cc.callFunc(sound, this)
            

            
        ) 

        if(this.initctr == 0){  
             this.frame.node.runAction(firstborn)
            // this.frame.node.position =cc.v2(0,0)       
            // this.frame.node.opacity = 256;             
            // this.frame.node.scale =cc.v2(1,1)    
          // this.frame.node.runAction(born)

        }
        else{
            this.frame.node.runAction(born)
            // this.frame.node.position =cc.v2(0,0)       
            // this.frame.node.opacity = 256;             
            // this.frame.node.scale =cc.v2(1,1)  
        } 
         // not completed the loop gotta make isEmpty true again
        
         if(this.game.getComponent('Game').panzing )this.turnOffHeal('pa')
         else if(this.game.getComponent('Game').pizzing )this.turnOffHeal('pi')
         else if(this.game.getComponent('Game').burging )this.turnOffHeal('bu')
        


        }
        
        


    },
    clicked(){
        console.log(cc.director.isPaused())
           
        if(!this.gameover && !this.isEmpty && !cc.director.isPaused() ) {this.game.getComponent('Game').toggled(this   )}
        
        

    }
});
