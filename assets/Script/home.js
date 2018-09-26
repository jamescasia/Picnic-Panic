var global = require('global')  
cc.Class({
    extends: cc.Component, 

    properties: {
        playBtn:cc.Node,
        addBoostBtn:cc.Node,
        boosterNum:cc.Node,
        frenzyBoosts:0,
        freezeBoosts:0,
        spawnBoosts:0,
        coins:100,
        coinsLabel:cc.Node, 
        realcoins:5,
        buyBoosters:cc.Node,
        currencies:cc.Node,
        usingFreeze:false,
        usingFrenzy:false,
        usingSpawn:false,
        useFreezeBtn:cc.Node,
        useFrenzyBtn:cc.Node,
        useSpawnBtn:cc.Node,
        passiveComboBoost:0 , 
        passiveTimeBoost:0, 
        passiveFrenzyBoost:0,
        boostLabels:cc.Node,
        promptLayout:cc.Node,
        errorPrompt:cc.Node,
        buying:null,
        storage:null,
        upgradeTimeNode:cc.Node,
        upgradeComboNode:cc.Node,
        upgradeFrenzyNode:cc.Node,
        passiveTimeLvl:0,
        passiveFrenzyLvl:0,
        passiveComboLvl:0,
        scrnLabel:cc.Node

 
    }, 
    parseBoolean(x){
        if(x == 'false') return false
        if ( x== 'true') return true

    },

    onLoad () {      

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode === cc.KEY.back) {

                        cc.director.loadScene('realhome')
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
        cc.director.preloadScene("main"); 
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        if( this.storage==null  ){
            var a0={collected:false,prize:100,achieved:false,desc:"score 100" }
            var a1={collected:false,prize:100,achieved:false ,desc:"combo 20" }
            var a2={collected:false,prize:200,achieved:false ,desc:"score 200" }
            var a3={collected:false,prize:200,achieved:false ,desc:"combo 30" }
            var a4={collected:false,prize:500,achieved:false ,desc:"score 500" }
            var a5={collected:false,prize:500,achieved:false ,desc:"combo 40" }
            var a6={collected:false,prize:1000,achieved:false ,desc:"score 1000" }
            var a7={collected:false,prize:1000,achieved:false, desc:"combo 60" }
            var a8={collected:false,prize:2000,achieved:false ,desc:"score 2000" } 
            var a9={collected:false,prize:3000,achieved:false,desc:"play 50"  }
            
            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0, sfxVolume:1, bgVolume:1,sfxOn:true, bgOn:true, 
                achievements:[a0,a1,a2,a3,a4,a5,a6,a7,a8,a9],usedParticle:"none",leaf:false,pinkLeaf:false, sakura:false
                        }
                    
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        } 
        this.frenzyBoosts =JSON.parse( parseInt(this.storage.frenzyBoosts))
        this.freezeBoosts =JSON.parse( parseInt(this.storage.freezeBoosts))
        this.spawnBoosts = JSON.parse(parseInt(this.storage.spawnBoosts))
        console.log('huy amputa')
        this.usingFreeze =false
        this.usingFrenzy = false
        this.usingSpawn = false
        this.coins =JSON.parse(parseInt( this.storage.coins))
        this.realcoins=JSON.parse( parseInt(this.storage.realcoins))
        this.passiveComboBoost =JSON.parse( parseInt(this.storage.passiveComboBoost))
        this.passiveTimeBoost =JSON.parse( parseInt(this.storage.passiveTimeBoost))
        this.passiveFrenzyBoost =JSON.parse(parseInt( this.storage.passiveFrenzyBoost))
        this.highestCombo = JSON.parse(parseInt(this.storage.highestCombo))
        this.highestScore =JSON.parse(parseInt( this.storage.highestScore))
        this.passiveFrenzyLvl =JSON.parse( parseInt(this.storage.passiveFrenzyLvl))
        this.passiveTimeLvl =JSON.parse( parseInt(this.storage.passiveTimeLvl))
        this.passiveComboLvl =JSON.parse(parseInt( this.storage.passiveComboLvl))
        this.usingFrenzy = false
                this.usingFreeze = false
                this.usingSpawn = false
                this.storage.usingFrenzy = false
                this.storage.usingFreeze = false
                this.storage.usingSpawn = false
        this.ss()
 
       

        this.playBtn.on('click', this.play, this);
         
    },

    start () { 
        
        
        this.setLabels() 
        

    },
    ss(){
        console.log('called')
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        console.log(this.storage)
        
    },
 
    play(){ 

        cc.director.loadScene(global.wentShop);
        global.wentShop = 'shop'
    
        
    },  
    setLabels(){
        this.coinsLabel.getComponent(cc.Label).string = this.coins
        this.boostLabels.getChildByName('spawn').getComponent(cc.Label).string  = this.spawnBoosts
        this.boostLabels.getChildByName('frenzy').getComponent(cc.Label).string   = this.frenzyBoosts
        this.boostLabels.getChildByName('freeze').getComponent(cc.Label).string  = this.freezeBoosts
          

        if((this.passiveComboLvl <10) )  this.upgradeComboNode.getChildByName('btn').getChildByName('Label').getComponent(cc.Label).string =  this.upgradePrice(this.passiveComboLvl,'combo')
        else {this.upgradeComboNode.getChildByName('btn').getChildByName('Label').getComponent(cc.Label).string = "Maxed Out" 
        this.upgradeComboNode.getChildByName('btn').getComponent(cc.Button).interactable = false}

        if((this.passiveTimeLvl <10) )   this.upgradeTimeNode.getChildByName('btn').getChildByName('Label').getComponent(cc.Label).string = this.upgradePrice( this.passiveTimeLvl , 'time')
        else{ this.upgradeTimeNode.getChildByName('btn').getChildByName('Label').getComponent(cc.Label).string = "Maxed Out"
        this.upgradeTimeNode.getChildByName('btn').getComponent(cc.Button).interactable = false}

        if((this.passiveFrenzyLvl <3) )   this.upgradeFrenzyNode.getChildByName('btn').getChildByName('Label').getComponent(cc.Label).string = this.upgradePrice(this.passiveFrenzyLvl,'frenzy')
        else{ this.upgradeFrenzyNode.getChildByName('btn').getChildByName('Label').getComponent(cc.Label).string = "Maxed Out"
        this.upgradeFrenzyNode.getChildByName('btn').getComponent(cc.Button).interactable = false}

        if((this.passiveFrenzyLvl <3) ) this.upgradeFrenzyNode.getChildByName('defn').getComponent(cc.Label).string =  "Upgrading this would increase frenzy bonus score by "+ String(this.upgradeChange(this.passiveFrenzyBoost, "frenzy")*(1+this.passiveFrenzyLvl))
        else this.upgradeFrenzyNode.getChildByName('defn').getComponent(cc.Label).string =  "Your Frenzy bonus is already in maximum power! Awesome!"
        if((this.passiveTimeLvl <10) )  this.upgradeTimeNode.getChildByName('defn').getComponent(cc.Label).string ="Upgrading this would increase time bonus by "+ String(this.upgradeChange( this.passiveTimeBoost,"time")*(1+this.passiveTimeLvl))
        else this.upgradeTimeNode.getChildByName('defn').getComponent(cc.Label).string =  "Your Time bonus is already in maximum power! Awesome!"
        if((this.passiveComboLvl <10) )  this.upgradeComboNode.getChildByName('defn').getComponent(cc.Label).string = "Upgrading this would increase combo bonus score by "+String(this.upgradeChange(this.passiveComboBoost, "combo")* (1+this.passiveComboLvl ))
        else this.upgradeComboNode.getChildByName('defn').getComponent(cc.Label).string =  "Your Combo bonus is already in maximum power! Awesome!"
        this.ss()



          

 
    },
    addFrenzyBoost(){ 
        if(this.coins <=50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("Frenzy Booster" , 50))return

    },
    addedFrenzy(){
        this.frenzyBoosts+=1  
        this.storage.frenzyBoosts = this.frenzyBoosts
        this.coins-=50 
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },
    addSpawnBoost(){
        if(this.coins <=50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("Spawn Booster" , 50))return
        
    },
    addedSpawn(){
        this.spawnBoosts+=1
        this.storage.spawnBoosts = this.spawnBoosts
        this.coins-=50
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()

    },

    addFreezeBoost(){
        if(this.coins <=50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("Freeze Booster" , 50)) return
        
    },
    addedFreeze(){
        this.freezeBoosts+=1
        this.storage.freezeBoosts = this.freezeBoosts
        this.coins-=50
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()
    },
    useFrenzy(){
        
        console.log('frboosts ' ,this.frenzyBoosts)
        if(this.frenzyBoosts>=1){
            this.usingFrenzy = !this.usingFrenzy
          
        console.log(this.usingFrenzy , "using Frenzy")
        if(this.usingFrenzy) this.frenzyBoosts-=1
        else this.frenzyBoosts+=1
        this.setLabels()
        this.storage.frenzyBoosts = this.frenzyBoosts
        
        this.storage.usingFrenzy = this.usingFrenzy
        this.ss()
        }
        else if(this.usingFrenzy) {
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
    useFreeze(){ 
        if(this.freezeBoosts>=1){
            this.usingFreeze = !this.usingFreeze 
        if(this.usingFreeze) this.freezeBoosts-=1
        else this.freezeBoosts+=1
        this.setLabels()
        this.storage.freezeBoosts = this.freezeBoosts
        this.storage.usingFreeze = this.usingFreeze
        this.ss()
        }
        else if(this.usingFreeze) {
            this.usingFreeze = !this.usingFreeze 
            if(this.usingFreeze) this.freezeBoosts-=1
            else this.freezeBoosts+=1
            this.setLabels()
            this.storage.freezeBoosts = this.freezeBoosts
            this.storage.usingFreeze = this.usingFreeze
            this.ss() 
        }
    },
    useSpawn(){
        if(this.spawnBoosts>=1){
            this.usingSpawn = !this.usingSpawn
             
            
        if(this.usingSpawn) this.spawnBoosts-=1
        else this.spawnBoosts+=1
        this.setLabels()
        this.storage.spawnBoosts = this.spawnBoosts 
        this.storage.usingSpawn = this.usingSpawn
        this.ss()
        }
        else if(this.usingSpawn) {
            this.usingSpawn = !this.usingSpawn 
            if(this.usingSpawn) this.spawnBoosts-=1
            else this.spawnBoosts+=1
            this.setLabels()
            this.storage.spawnBoosts = this.spawnBoosts 
            this.storage.usingSpawn = this.usingSpawn
            this.ss() 
        }
    },
    confirmPrompt(name, price){
        this.promptLayout.setLocalZOrder(10)
        
        this.promptLayout.opacity = 255
        if(  name.includes("bonus" )){
            this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Really want to upgrade "+ name+" for " + price  +" ?"
        
        }
        else this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Really want to buy "+ name+" for " + price +" ?"
        this.promptLayout.position = cc.v2( 7, 30)
        this.buying = name



    },
    closePrompt(){
        this.promptLayout.opacity = 0
        this.promptLayout.setLocalZOrder(-10)
        this.promptLayout.position = cc.v2(-900 , -900)
    },
    reject(){   
        this.closePrompt()

    },
    accept(){ 
        switch (this.buying){
            case "Freeze Booster":
                this.addedFreeze()
                break
            case "Frenzy Booster":
            this.addedFrenzy()
                break
            case "Spawn Booster":
                this.addedSpawn()
                break
            case "time bonus":
                this.upgradedTIME()
                break
            case "frenzy bonus":
                this.upgradedFRENZY()
                break
            case "combo bonus":
                this.upgradedCOMBO()
                break 

        }

        this.closePrompt()
        
    },
    showerrorPrompt(text){
        this.errorPrompt.position = cc.v2( 7, 30)
        this.errorPrompt.opacity = 255
        this.errorPrompt.setLocalZOrder(10)
        this.errorPrompt.getChildByName('text').getComponent(cc.Label).string = text
    },
    oked(){
        this.errorPrompt.position = cc.v2(-900 , -900)

        this.errorPrompt.opacity = 0
    },
    upgradePrice(lvl,name){
        switch(name){
            case 'frenzy':
                return 1000 + lvl*1000
                break
            case 'time':
                return 200 + lvl*200
                break
            case 'combo':
                return 250 + lvl*250
                break
        } 
    },
    upgradeChange(val , name){

        switch(name){
            case 'frenzy':
                return 1
                break
            case 'time':
                return 0.5
                break
            case 'combo':
                return 2
                break
        } 

    },

    upgradeFrenzy(){ 
        if(!(this.passiveFrenzyLvl <3) )   this.showerrorPrompt('Maxed Out') 
        else if(this.coins < this.upgradePrice(this.passiveFrenzyLvl , 'frenzy'))   this.showerrorPrompt('Insufficient Funds')  
         
        else if(!this.confirmPrompt("frenzy bonus" , this.upgradePrice(this.passiveFrenzyLvl , 'frenzy')))return

    },
    upgradedFRENZY(){
        this.passiveFrenzyBoost+=1
        this.storage.passiveFrenzyBoost = this.passiveFrenzyBoost
        this.coins-= this.upgradePrice( this.passiveFrenzyLvl , 'frenzy')
        this.passiveFrenzyLvl+=1  
        this.storage.passiveFrenzyLvl = this.passiveFrenzyLvl
        
        
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },

    upgradeTime(){ 
         if(!(this.passiveTimeLvl <10) )   this.showerrorPrompt('Maxed Out') 
         else if(this.coins <  this.upgradePrice(this.passiveTimeLvl , 'time') )   this.showerrorPrompt('Insufficient Funds') 
        
        
        else if(!this.confirmPrompt("time bonus" , this.upgradePrice(this.passiveTimeLvl , 'time')))return

    },
    upgradedTIME(){
        this.passiveTimeBoost+=0.5
        this.storage.passiveTimeBoost = this.passiveTimeBoost
        this.coins-= this.upgradePrice( this.passiveTimeLvl , 'time')
        this.passiveTimeLvl+=1  
        this.storage.passiveTimeLvl = this.passiveTimeLvl
       
        
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },

    upgradeCombo(){  
        if(!(this.passiveComboLvl <10) )   this.showerrorPrompt('Maxed Out')  
        else if(this.coins <  this.upgradePrice(this.passiveComboLvl , 'combo') )   this.showerrorPrompt('Insufficient Funds') 
        
        else if(!this.confirmPrompt("combo bonus" , this.upgradePrice(this.passiveComboLvl , 'combo')))return

    },
    upgradedCOMBO(){
        this.passiveComboBoost+=2
        this.storage.passiveComboBoost = this.passiveComboBoost
        this.coins-= this.upgradePrice( this.passiveComboLvl , 'combo')
        this.passiveComboLvl+=1 
        this.storage.passiveComboLvl = this.passiveComboLvl
        
         
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },



});
