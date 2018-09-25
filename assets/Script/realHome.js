 
var global = require('global')  
cc.Class({
    extends: cc.Component,

    properties: {
  
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


 
    }, 
     
    onLoad () {        
        console.log(global.wentShop+'jahahaha')  

        
       
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode === cc.KEY.back) {
                    cc.game.end()
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
        this.preloadScenes()
        
        
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        //this.storage = null
        if(  this.storage == null  ){
            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0, sfxVolume:1, bgVolume:1,sfxOn:true, bgOn:true 
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

         
 
        
         
    },
    goToSDK(){
        cc.game.end()
        // cc.director.loadScene('sdk')
    },

    start () {

    },
    preloadScenes(){

        cc.director.preloadScene("main"); 
        cc.director.preloadScene("shop"); 
    },
    goSettings(){
        cc.director.loadScene("settings")

    }, 
    goLdrbrd(){
        //cc.director.loadScene("settings")
    },
    goAchvmnts(){

    },
    share(){
        //fb shit

    },  
    shop(){
        global.wentShop = 'realhome' 

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

   




    // update (dt) {},
});
