 

cc.Class({
    extends: cc.Component,

    properties: {
 
        boosterPrompt:cc.Node,
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


 
    }, 
    onLoad () {      
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
        this.setLabels()
        this.preloadScenes()
        
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        if( this.storage==null  ){
            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0
                        }
                    
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
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
        this.setLabels()

        if(this.frenzyBoosts == 0) this.frenzy.getChildByName("New Sprite").color = new cc.Color(110, 110,110);
        if(this.freezeBoosts == 0) this.freeze.getChildByName("New Sprite").color = new cc.Color(110, 110,110);
        if(this.spawnBoosts == 0) this.spawn.getChildByName("New Sprite").color = new cc.Color(110, 110,110);
 
        
         
    },

    start () {

    },
    preloadScenes(){

        cc.director.preloadScene("main"); 
        cc.director.preloadScene("shop"); 
    },


    showBoosterPrompt(){
        this.boosterPrompt.position = cc.v2(0,0)
    },
    closePrompt(){
        //insert closing action here
        this.boosterPrompt.position = cc.v2(-1000,-1000)
    },
    shop(){

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
        
    },

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
            this.usingSpawn = !this.usingSpawn
             
            
        if(this.usingSpawn) this.spawnBoosts-=1
        else this.spawnBoosts+=1
        this.setLabels()
        this.storage.spawnBoosts = this.spawnBoosts 
        this.storage.usingSpawn = this.usingSpawn
        this.ss()
        this.spawn.getChildByName("New Sprite").runAction(usingAction)
        }
        else if(this.usingSpawn) {
            
        
   
        this.spawn.getChildByName("New Sprite").stopAllActions()
        this.spawn.getChildByName("New Sprite").position = cc.v2(0,0)
        this.spawn.getChildByName("New Sprite").scale = cc.v2(0.17,0.17)

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
            this.usingFreeze = !this.usingFreeze 
        if(this.usingFreeze) this.freezeBoosts-=1
        else this.freezeBoosts+=1
        this.setLabels()
        this.storage.freezeBoosts = this.freezeBoosts
        this.storage.usingFreeze = this.usingFreeze
        this.ss()
        this.freeze.getChildByName("New Sprite").runAction(usingAction)
        }
        else if(this.usingFreeze) {
            
        
   
        this.freeze.getChildByName("New Sprite").stopAllActions()
        this.freeze.getChildByName("New Sprite").position = cc.v2(0,0)
        this.freeze.getChildByName("New Sprite").scale = cc.v2(0.17,0.17)

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
            //his.frenzy.getChildByName("New Sprite").runAction(usingAction)
            
            this.usingFrenzy = !this.usingFrenzy
          
        console.log(this.usingFrenzy , "using Frenzy")
        if(this.usingFrenzy) this.frenzyBoosts-=1
        else this.frenzyBoosts+=1
        this.setLabels()
        this.storage.frenzyBoosts = this.frenzyBoosts
        
        this.storage.usingFrenzy = this.usingFrenzy
        this.ss()


        this.frenzy.getChildByName("New Sprite").runAction(usingAction)
        }
        else if(this.usingFrenzy) {
            this.frenzy.getChildByName("New Sprite").stopAllActions()
            this.frenzy.getChildByName("New Sprite").position = cc.v2(0,0)
            this.frenzy.getChildByName("New Sprite").scale = cc.v2(0.17,0.17)
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

        this.freeze.getChildByName("left").getComponent(cc.Label).string = this.freezeBoosts
        this.spawn.getChildByName("left").getComponent(cc.Label).string = this.spawnBoosts
        this.frenzy.getChildByName("left").getComponent(cc.Label).string = this.frenzyBoosts

    },
    




    // update (dt) {},
});
