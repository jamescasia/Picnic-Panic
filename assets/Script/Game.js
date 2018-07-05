 

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
        boosters:cc.Node,
        frenzyBoosts:0,
        spawnBoosts:0 ,
        freezeBoosts:0,
        frenzying:false,
        freezing:false,
        frenzyonce:false,
        freezeonce:false,
        spawnonce:false,
        spawning:false,
        numOfGames:0, 
 
    }, 

    onLoad () {
        if(cc.sys.localStorage.getItem('numOfGames')!= null ) this.numOfGames = parseInt(cc.sys.localStorage.getItem('highestScore'))
        else this.numOfGames= 0
        if(cc.sys.localStorage.getItem('highestScore')!= null ) this.highestScore = parseInt(cc.sys.localStorage.getItem('highestScore'))
        else this.highestScore= 0
        if(cc.sys.localStorage.getItem('frenzy') != null) this.frenzyBoosts = parseInt(cc.sys.localStorage.getItem('frenzy'))
        else  this.frenzyBoosts = 0
        if(cc.sys.localStorage.getItem('freeze') != null) this.freezeBoosts = parseInt(cc.sys.localStorage.getItem('freeze'))
        else  this.freezeBoosts = 0
        if(cc.sys.localStorage.getItem('spawn') != null) this.spawnBoosts = parseInt(cc.sys.localStorage.getItem('spawn'))
        else  this.spawnBoosts = 0

        this.boosters.getChildByName('frenzy').getChildByName('flabel').getComponent(cc.Label).string =this.frenzyBoosts
        this.boosters.getChildByName('freeze').getChildByName('flabel').getComponent(cc.Label).string =this.freezeBoosts
        this.boosters.getChildByName('spawn').getChildByName('flabel').getComponent(cc.Label).string =this.spawnBoosts

        
    },

    start () {

        this.highestCombo = 0
        this.comboctr  = 0
        var timectr = 0
        var t= this 
        var pauseAdd = 0
        var inc = 0.1
        var left = 60

        var gameTimer = t.schedule(function() { 
            

             
            
          
            
             if (this.freezing ) { 
                timectr+= 0.0
            }
            else timectr+= 0.1
            left =  (60- timectr  ).toFixed(2)  
            t.timebar.getComponent(cc.ProgressBar).progress = left/60
            this.lapse = timectr

            if(left <=0 &&!this.gameover){
                
                if(this.score >= this.highestScore) this.highestScore = this.score
                cc.sys.localStorage.setItem('highestScore',  (t.highestScore)); 
                t.endPanel.getComponent('layoutScript').showPanel(t.score ,t.highestCombo )
                t.gameover = true
                this.numOfGames+=1
                t.matrix.destroy()
                if(this.numOfGames% 3 == 0 && this.numOfGames >=3) {
                    this.frenzyBoosts+=1
                    this.freezeBoosts+=1
                    this.spawnBoosts+=1
                    cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
                    cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
                    cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 


                }
                cc.sys.localStorage.setItem('numOfGames',  this.numOfGames); 

                

                
            }
           
            



            t.timeLabel.getComponent(cc.Label).string = String(left).replace("." , ':')


        }, 0.1, 640,1.5);
        
        
         
    },
    useFrenzyBoost(){
        if(this.frenzyBoosts>=1 && !this.frenzyonce){
        this.frenzyBoosts-=1
        if(this.frenzyBoosts <= 0) this.frenzyBoosts = 0
        cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
        this.frenzyEffect()
        this.frenzyonce = true
        
        
        
        this.boosters.getChildByName('frenzy').getChildByName('flabel').getComponent(cc.Label).string =this.frenzyBoosts
        }
        



    },
    frenzyEffect(){
        var t = this
        //t.frenzying = true
        this.burgEffect =3
        this.panEffect = 3
        this.pizEffect = 3
        var ends = function(){
            this.burgEffect =1 
            this.panEffect = 1
            this.pizEffect = 1 
        }
        var frenzyTime =cc.sequence(  cc.delayTime(4) ,cc.callFunc(ends,t)) 
        this.matrix.runAction(frenzyTime)
            this.oneone.getComponent('unit').frenzySolo()
            this.onetwo.getComponent('unit').frenzySolo()
            this.onethree.getComponent('unit').frenzySolo()
            this.onefour.getComponent('unit').frenzySolo()
            this.twoone.getComponent('unit').frenzySolo()
            this.twotwo.getComponent('unit').frenzySolo()
            this.twothree.getComponent('unit').frenzySolo()
            this.twofour.getComponent('unit').frenzySolo()
            this.threeone.getComponent('unit').frenzySolo()
            this.threetwo.getComponent('unit').frenzySolo()
            this.threethree.getComponent('unit').frenzySolo()
            this.threefour.getComponent('unit').frenzySolo()
            this.fourone.getComponent('unit').frenzySolo()
            this.fourtwo.getComponent('unit').frenzySolo()
            this.fourthree.getComponent('unit').frenzySolo()
            this.fourfour.getComponent('unit').frenzySolo()

 
    }, 

    useFreezeBoost(){
        if(this.freezeBoosts>=1 && !this.freezeonce){
            this.freezeBoosts-=1
            if(this.freezeBoosts <= 0) this.freezeBoosts = 0
            cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
            this.freezing =true 
            this.freezeonce =true
            var unfreeze = function(){
                this.freezing = false
            }
            this.matrix.runAction(  cc.sequence(cc.delayTime(4), cc.callFunc(unfreeze, this) ))
            this.boosters.getChildByName('freeze').getChildByName('flabel').getComponent(cc.Label).string =this.freezeBoosts
        }
    },

    useSpawnBoost(){

        if(this.spawnBoosts>=1 && !this.spawnonce){
            this.spawnBoosts-=1
            if(this.spawnBoosts <= 0) this.spawnBoosts = 0
            cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
            this.spawnonce = true
            this.spawning =true
            var unspawn = function(){this.spawning = false}
            this.matrix.runAction(  cc.sequence(cc.delayTime(3), cc.callFunc(unspawn, this) ))

            
            
            
            this.boosters.getChildByName('spawn').getChildByName('flabel').getComponent(cc.Label).string =this.spawnBoosts
        }

        
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


   update (dt) {  
        
        this.boosters.getChildByName('spawn').getChildByName('flabel').getComponent(cc.Label).string =this.spawnBoosts
       

 
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
                  var comboFade = cc.sequence( cc.fadeIn(0), cc.spawn( cc.moveBy(0.4, 0, 90) , cc.fadeOut(0.4)))
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
