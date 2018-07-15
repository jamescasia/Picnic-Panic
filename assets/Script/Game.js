 

cc.Class({
    extends: cc.Component,

    properties: {
        matrix:cc.Node, 
        score:0, 
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
        pauseBtn:cc.Node    
 
    }, 
    parseBoolean(x){
        if(x == 'false') return false
        if ( x== 'true') return true

    },

    onLoad () {
        if(cc.sys.localStorage.getItem('usingFrenzy')!= null ) this.usingFrenzy = this.parseBoolean(cc.sys.localStorage.getItem('usingFrenzy')) 
        else this.usingFrenzy= false
        if(cc.sys.localStorage.getItem('usingFreeze')!= null ) this.usingFreeze = this.parseBoolean(cc.sys.localStorage.getItem('usingFreeze'))
        else this.usingFreeze= false
        if(cc.sys.localStorage.getItem('usingSpawn')!= null ) this.usingSpawn = this.parseBoolean(cc.sys.localStorage.getItem('usingSpawn'))
        else this.usingSpawn= false
        if(cc.sys.localStorage.getItem('numOfGames')!= null ) this.numOfGames = parseInt(cc.sys.localStorage.getItem('highestScore'))
        else this.numOfGames= 0
        if(cc.sys.localStorage.getItem('highestScore')!= null ) this.highestScore = parseInt(cc.sys.localStorage.getItem('highestScore'))
        else this.highestScore= 0 
        if(this.usingFreeze  ){ 
            this.useFreezeBoost() 
        } 
        

    
 

        
    },
    onPause(){
        if(this.pauseBtn.getComponent(cc.Toggle).isChecked) {cc.director.pause() 
        this.everything.opacity = 150}
        else {cc.director.resume()
             this.everything.opacity = 255 }
    },

    start () {   

        this.highestCombo = 0
        this.comboctr  = 0
        var timectr = 0
        var t= this  
        var left = 60

        var gameTimer = t.schedule(function() { 
            

              
            if (t.usingFreeze  )   t.timelmt = 70  
            else t.timelmt = 60
                 
            left =  (t.timelmt- timectr  ).toFixed(2)  
            t.timebar.getComponent(cc.ProgressBar).progress = left/t.timelmt
            timectr+= 0.1
            
            t.lapse = timectr
            

            if(left <=0 && !this.gameover  ){ 
                
                if(t.score >= t.highestScore) t.highestScore = t.score
                cc.sys.localStorage.setItem('highestScore',  (t.highestScore)); 
                t.endPanel.getComponent('layoutScript').showPanel(t.score ,t.highestCombo )
                t.gameover = true
                t.numOfGames+=1
                t.matrix.destroy()  
                if(t.numOfGames% 3 == 0 && t.numOfGames >=3) {
                     
                }
                cc.sys.localStorage.setItem('numOfGames',  t.numOfGames);  
            } 

            t.timeLabel.getComponent(cc.Label).string = String(left).replace("." , ':')


        }, 0.1, 700,1.5);
        
        
         
    },  
    frenzyEffect(){ 

        console.log('frenzed')
        var t = this
        t.frenzying = true
        
        t.burgEffect =3
        t.panEffect = 3
        t.pizEffect = 3
        if(t.usingFrenzy  ){
            console.log('frenzy: ' , t.usingFrenzy)
            t.burgEffect =4
            t.panEffect = 4
            t.pizEffect = 4

        }
        var ends = function(){
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
        var frenzyTime =cc.sequence(  cc.delayTime(5) ,cc.callFunc(ends,t)) 
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
    pizTwoing(){
        //  console.log('green tea is green')
        this.pizzing = true
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
       // console.log('sana is pabo')
        if(!this. frenzying)this.burgEffect =2
        var burgEnd  = function(){  
            this.burging = false
            console.log('dfaa')
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

   
   update (dt) {   
        let cameraShake = cc.sequence(cc.moveTo(cc.random0To1()*0.3, cc.randomMinus1To1()*2 , cc.randomMinus1To1()*2) ,cc.moveTo(0.3,0,0))
       if(this.frenzying){
        
           this.everything.runAction(cameraShake)
       }
       else{ this.everything.stopAllActions()
        this.everything.position = cc.v2(0,0)
       }
       //console.log(this.burgEffect , this.pizEffect , this.panEffect , this.frenzying)
        if(!this.frenzying &&   this.pizzing && this.panzing && this.burging) this.frenzyEffect()
        if(!this.gameover){
        if(this.burging){ 
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
        } 
        if(this.pizzing){ 
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
        } 
        if(this.panzing){ 
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
        } 
            
 
    }
        

       if(this.comboctr >= this.highestCombo) this.highestCombo = this.comboctr

       
    
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
                var times = cc.sequence( cc.delayTime(1.25),cc.callFunc( comboEnd, t)  )
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
            
            cc.scaleTo(0.3, 0.24, 0.24).easing(cc.easeExponentialIn()),
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
            
            cc.scaleTo(0.3, 0.24, 0.24).easing(cc.easeExponentialIn()),
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
   toggling(x){ 
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
