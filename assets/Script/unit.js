 
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

    },
 

    onLoad () {
        this.choices = [ this.bu1 , this.pa1, this.pi1]
        this.node.on('click', this.clicked, this);
        
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
    death(){
        this.level = 0
        if(this.level <2){
            this.frame.spriteFrame = null

        }
        
        this.isEmpty = true
        this.mode = null

        this.scheduleOnce(function() {
            this.initialize()
        },   ( Math.round(cc.rand() )  %3 )+1.35 );
            
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
             
            switch(this.mode){
                case 'bu':
                    this.game.getComponent('Game').burgEffect = 2
                    this.game.getComponent('Game').score+=16*this.game.getComponent('Game').burgEffect 
                    var burgEnd  = function(){this.game.getComponent('Game').burgEffect = 1}
                    var t = this
                    var t1 = cc.sequence( cc.delayTime(5),cc.callFunc( burgEnd, t)  )
                    this.node.runAction(t1 )

                    break
                case 'pa':
                    this.game.getComponent('Game').panEffect = 2
                    this.game.getComponent('Game').score+=16*this.game.getComponent('Game').panEffect 
                    var panEnd  = function(){this.game.getComponent('Game').panEffect = 1}
                    var t = this
                    var t2 = cc.sequence( cc.delayTime(5),cc.callFunc( panEnd, t)  )
                    this.node.runAction(t2 )
                    break
                case 'pi':
                    this.game.getComponent('Game').pizEffect = 2
                    this.game.getComponent('Game').score+=16*this.game.getComponent('Game').pizEffect 
                    var panEnd  = function(){this.game.getComponent('Game').pizEffect = 1}
                    var t = this
                    var t3 = cc.sequence( cc.delayTime(5),cc.callFunc( panEnd, t)  )
                    this.node.runAction(t3 )
                    break
            } 
           //this.game.getComponent('Game').prev
            var prevNode = this.game.getComponent('Game').prev

           
           var t  = this 
           var kill = function(){
            
            this.game.getComponent('Game').showIndic(t)
            if(this.game.getComponent('Game').pizEffect ==2 && this.game.getComponent('Game').panEffect ==2 &&this.game.getComponent('Game').burgEffect ==2 ){

                this.game.getComponent('Game').frenzying = true 
                var notf = function(){
                    this.game.getComponent('Game').frenzying = false 
                 }
                var timernotf = cc.sequence (cc.delayTime(4) , cc.callFunc(notf, this))
                this.node.runAction(timernotf)
                
            } 
            
            var barstu = cc.instantiate( this.game.getComponent('Game').threeBurstEffect); 
            prevNode.node.addChild(barstu);  
            barstu.position = cc.v2( 0.5*( t.node.x -prevNode.node.x) ,0.5*(t.node.y -prevNode.node.y))
            t.death() 
            prevNode.death() 
            
            t.frame.spriteFrame = null
            prevNode.frame.spriteFrame = null
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
    levelFrenzy(){
      // this.game.getComponent('Game').frenzying = false
      this.game.getComponent('Game').pizEffect =3
        this.game.getComponent('Game').panEffect =3
        this.game.getComponent('Game').burgEffect =3
      var frenzyFx =cc.sequence(  cc.spawn(cc.scaleTo(0.4 ,0.22 ,0.22) , cc.tintTo(0.4, 180,255,223)   ) , cc.spawn(cc.scaleTo(0.4 ,0.2 ,0.2) , cc.tintTo(0.4, 255,255,255)  )) 
      //var frenzyFx =cc.sequence( cc.scaleTo(0 , 0.22, 0.22),cc.delayTime(3.5), cc.scaleTo(0.2 , 0.2 , 0.2) ) 
      this.frame.node.runAction(frenzyFx) 
        //var frenzyFx =cc.sequence(  cc.scaleTo(0.3 ,0.228 ,0.228)   , cc.scaleTo(0.3 ,0.2 ,0.2)  )

      /**  var frenzyFx =cc.sequence(  cc.scaleTo(0.4 ,0.228 ,0.228)   , cc.scaleTo(0.4 ,0.2 ,0.2)  ).repeat(10)
        this.frame.node.runAction(frenzyFx)
         this.game.getComponent('Game').frenzying = true
         var notf = function(){
            this.game.getComponent('Game').frenzying = false
            this.game.getComponent('Game').burgEffect =1
            this.game.getComponent('Game').pizEffect = 1
            this.game.getComponent('Game').panEffect = 1}
        var timernotf = cc.sequence (cc.delayTime(4) , cc.callFunc(notf, this))
        
        this.node.runAction(timernotf)
        this.game.getComponent('Game').burgEffect = 3
        this.game.getComponent('Game').pizEffect = 3
       this.game.getComponent('Game').panEffect = 3*/

            
        //var frenzyFx =cc.sequence(  cc.spawn(cc.scaleTo(0.3 ,0.228 ,0.228) , cc.fadeTo(0.3, 200)) , cc.spawn(cc.scaleTo(0.3 ,0.2 ,0.2) , cc.fadeTo(0.3, 255)))
        

       
       
   
    },

    update (dt) {
        //if(this.game.getComponent('Game').frenzying){}
       // if(this.game.getComponent('Game').pizEffect ==2 && this.game.getComponent('Game').panEffect ==2 &&this.game.getComponent('Game').burgEffect ==2  &&!this.game.getComponent('Game').frenzying){this.levelFrenzy()}
        if(this.game.getComponent('Game').frenzying == true  )this.levelFrenzy()
        else {
            this.game.getComponent('Game').pizEffect =1
        this.game.getComponent('Game').panEffect =1
        this.game.getComponent('Game').burgEffect =1
        }
       
        if(this.game.getComponent('Game').lapse >=57 && this.game.getComponent('Game').lapse <60   ){ 
            var shake = cc.sequence(cc.skewTo(0.1 , cc.randomMinus1To1()*16 , cc.randomMinus1To1()*16 )  , cc.skewTo(0.1 , 0,0 ) ) 
            this.frame.node.runAction(shake)

        }
 

        this.gameover = this.game.getComponent('Game').gameover 
        //effect on level three burst
         
      
        if(this.selected){ 
            this.frame.node.scale = cc.v2(0.23,0.23)
            
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
        var rand =  Math.round( cc.rand() )%3 
        //console.log("random" + rand)
        this. frame.spriteFrame = this.choices[rand]
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
           
        if(!this.gameover && !this.isEmpty) {this.game.getComponent('Game').toggled(this   )}
        
        

    }
});
