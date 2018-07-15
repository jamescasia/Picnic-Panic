 
cc.Class({
    extends: cc.Component,

    properties: { 

        game:cc.Node,
        choices:[], 
        frame:cc.Sprite,
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
         

        level:2,
        isEmpty:true,
        mode:'a',
        selected:false,
        actZin:null,
        actZout:null,
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
        healactn:null

    },
 

    onLoad () {
        this.healactn = cc.sequence( cc.fadeTo(0.2, 180) , cc.fadeTo(0.2, 255)).repeat(15)
        this.frenzySoloFx =   
            cc.sequence( 
                cc.scaleTo(0.3, 0.225, 0.225),
                cc.scaleTo(4.5 , 0.225, 0.225),
                cc.scaleTo(0.2 , 0.2, 0.2) 

                ) 
        this.choices = [ this.bu1 , this.pa1, this.pi1]
        this.node.on('click', this.clicked, this);
        this.boostactn = cc.sequence(
            cc.scaleTo(0.3  , 0.22 , 0.22) ,
            cc.scaleTo(4.4 , 0.225 , 0.225),
            cc.scaleTo(0.3 , 0.2 ,0.2)   
        )  
    },

    start () {
        this.initialize()
        this.actZin =  cc.scaleTo(0.6, 0.24,0.24)
        this.actZout =  cc.scaleTo(0.6, 0.2 ,0.2 )
        this.selectAnim = (cc.sequence(this.actZin, this.actZout)).repeatForever();
        
        

    },
    initialize(){  
        
        if(!this.gameover){
        this.level = 0
        this.addFood() 
        }
        this.initctr +=1

    },
    indicated(){

        
    },
    death(){
        this.turnOnHeal()
        
        this.mode = null
        
        this.level = 0
        if(this.level <2){
            this.frame.spriteFrame = null

        }
        
        this.isEmpty = true
        this.mode = null

        this.scheduleOnce(function() {
            this.initialize()
        },   ( this.spawnFactor*(Math.round(cc.rand() )  %2 )+ (1.35*this.spawnFactor))   );
            
    },
    frenzySoloEnd(){
        this.frame.node.stopAction(this.frenzySoloFx)

    },
    frenzySolo(){  
        this.frame.node.runAction(this.frenzySoloFx)
    }, 
    fuse(){
        this.selected = false
        
        var a = Math.random()

        
        var pumpUp = cc.sequence(
            cc.spawn(
                cc.moveTo(0.2*a , 0 ,a* 8.5).easing(cc.easeExponentialInOut()),
                cc.scaleTo(0.3, 0.28, 0.28).easing(cc.easeExponentialInOut()),
                cc.skewTo(0.2 , 0,cc.randomMinus1To1()*6).easing(cc.easeExponentialInOut()),
                //cc.tintTo(0.2 ,300,300  ,300)
            ).speed(0.5).repeat(1)  ,
            cc.spawn(
                //cc.tintTo(0.2 , 255, 255 ,255),
                cc.moveTo(0.2 , 0 , 0).easing(  cc.easeQuarticActionIn()),
                cc.scaleTo(0.3, 0.2 , 0.2 ).easing(cc.easeExponentialOut())  , 
                cc.skewTo(0.2 , 0,0).easing(  cc.easeQuarticActionIn()), 
            ).speed(1)
                //cc.delayTime(0.5),  
        ).speed(2 ).repeat(1); 
        this.frame.node.runAction(pumpUp) 

        if(this.game.getComponent('Game').comboctr >=5 ){
            this.game.getComponent('Game').score += Math.round (this.game.getComponent('Game').comboctr /2 )
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
            
            var barstu = cc.instantiate( this.game.getComponent('Game').threeBurstEffect); 
            prevNode.node.addChild(barstu);  
            barstu.position = cc.v2( 0.5*( t.node.x -prevNode.node.x) ,0.5*(t.node.y -prevNode.node.y))
            t.death() 
            prevNode.death() 
            
            t.frame.spriteFrame = null
            prevNode.frame.spriteFrame = null

            //this.game.getComponent('Game').boostEm() 

        } 

            var explode = cc.sequence(  
                cc.spawn(
                    // cc.follow(1, prevNode.node), 
                    cc.moveTo(1.2 ,  (prevNode.node.x -t.node.x)/2, (prevNode.node.y -t.node.y)/2 ).easing(cc.easeExponentialIn()),                  
                    cc.fadeTo(0.7 , 145)
                ) ,cc.scaleTo(0.3, 0.3, 0.3).easing(cc.easeExponentialIn()),
                
                      cc.callFunc(kill , t)
            ).speed(2)
            var explode2 = cc.sequence(  
                cc.spawn(
                    cc.moveTo(1.2 ,    0.5*( t.node.x -prevNode.node.x) ,0.5*(t.node.y -prevNode.node.y)).easing(cc.easeExponentialIn()),
                    cc.fadeTo(0.7 ,145)
                ) ,
                    cc.scaleTo(0.3, 0.3, 0.3).easing(cc.easeExponentialIn()), 
                     //cc.callFunc(kill , t)
            ).speed(2)
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
    
    
     
    

    update (dt) { 
       // console.log(this.node.getChildByName('boostHeal') , 'haha')
        if(this.game.getComponent('Game').burgEffect >=2) this.spawnFactor = 0.2
        else this.spawnFactor = 1  
        
        if(this.game.getComponent('Game').lapse >=   this.game.getComponent('Game').timelmt-3 &&  this.game.getComponent('Game').lapse!=60 ){ 
            var shake = cc.sequence(cc.skewTo(0.1 , cc.randomMinus1To1()*16 , cc.randomMinus1To1()*16 )  , cc.skewTo(0.1 , 0,0 ) ) 
            this.frame.node.runAction(shake)

        }
 

        this.gameover = this.game.getComponent('Game').gameover 
        //effect on level three burst
         
      
        if(this.selected){ 
            this.frame.node.scale = cc.v2(0.23,0.23)
            this.frame.node.z= 100
            
            if(this.level ===0){
                switch(this.mode){
                    case 'bu': 
                        this.frame.spriteFrame = this.bu1s
                        break
                    case 'pa': 
                        this.frame.spriteFrame = this.pa1s
                        break
                    case 'pi': 
                        this.frame.spriteFrame = this.pi1s
                        break
                }
            }
                if(this.level ===1){
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.bu2s
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.pa2s
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.pi2s
                            break
                    }
        
                }
                if(this.level ===2){
                    
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.bu3s
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.pa3s
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.pi3s
                            break
                    }
        
                }
        }
        else {
            
            this.frame.node.scale = cc.v2(0.2 ,0.2 )
            if(this.level ===0){
                switch(this.mode){
                    case 'bu': 
                        this.frame.spriteFrame = this.bu1
                        break
                    case 'pa': 
                        this.frame.spriteFrame = this.pa1
                        break
                    case 'pi': 
                        this.frame.spriteFrame = this.pi1
                        break
                }
            }
                if(this.level ===1){
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.bu2
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.pa2
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.pi2
                            break
                    }
        
                }
                if(this.level ===2){
                    
                    switch(this.mode){
                        case 'bu': 
                            this.frame.spriteFrame = this.bu3
                            break
                        case 'pa': 
                            this.frame.spriteFrame = this.pa3
                            break
                        case 'pi': 
                            this.frame.spriteFrame = this.pi3
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
            if(r ===3) this.level =2
        }
        this. frame.spriteFrame = this.choices[Math.floor(Math.random()*this.choices.length)]
        // 
        this.frame.node.scale = cc.v2(0,0) 
        var born =cc.spawn(
            cc.scaleTo(0.24 , 0.2)  ,
            cc.fadeIn(0.24  ).easing(cc.easeBackIn()),
        
        )
        var a = Math.random()
        var b = Math.random()

        var firstborn =cc.sequence(
            cc.fadeTo(0, 0),
            cc.moveBy(0.4 , 0, 660), 
            cc.spawn(
                
                cc.fadeIn(0),
                cc.moveTo(0.2 , 0,0).easing(cc.easeSineIn()), 
            ),
            
            
            cc.spawn(
                
                cc.skewTo(0.1 , 0,cc.randomMinus1To1()*7 ).easing(cc.easeCircleActionOut()),
                cc.moveBy(a *0.1 , 0 , a *80).easing(cc.easeCircleActionOut()),
            ),
            cc.moveTo(0.1 *a , 0 , 0).easing(cc.easeSineIn()).speed(1.2), 
            cc.spawn( 
                cc.skewTo(  0.2 , 0,cc.randomMinus1To1()*3.5  ).easing(cc.easeCircleActionOut()),
                cc.moveBy(b *0.06 , 0 , b *55).easing(cc.easeCircleActionOut()), 
            ),
            cc.spawn(   
                cc.moveTo(0.05*b  , 0 , 0).easing(cc.easeSineIn()), 
                cc.skewTo(0.1*b , 0,0).easing(cc.easeSineIn()), 
            ).speed(1.2)
            

            
        ).speed(1)

        if(this.initctr == 0){  
            this.frame.node.runAction(firstborn)

        }
        else{
            this.frame.node.runAction(born)
        }
        this.frame.node.position = cc.v2(0,0)   
        
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
        this.isEmpty = false // not completed the loop gotta make isEmpty true again

        }
        
        


    },
    clicked(){
        console.log(cc.director.isPaused())
           
        if(!this.gameover && !this.isEmpty && !cc.director.isPaused() ) {this.game.getComponent('Game').toggled(this   )}
        
        

    }
});
