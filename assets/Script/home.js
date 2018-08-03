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
        this.scrnLabel.getComponent(cc.Label).string = String(cc.director.getVisibleSize() ) 
        cc.director.preloadScene("main"); 
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
        cc.director.loadScene('home');
    
        
    },
    setLabels(){
        this.coinsLabel.getComponent(cc.Label).string = this.coins
        this.boostLabels.getChildByName('spawn').getComponent(cc.Label).string  = this.spawnBoosts
        this.boostLabels.getChildByName('frenzy').getComponent(cc.Label).string   = this.frenzyBoosts
        this.boostLabels.getChildByName('freeze').getComponent(cc.Label).string  = this.freezeBoosts
        
        this.useFrenzyBtn.getChildByName('Label').getComponent(cc.Label).string = 'frenzy' + this.usingFrenzy
        this.useFreezeBtn.getChildByName('Label').getComponent(cc.Label).string ='freeze'+  this.usingFreeze
        this.useSpawnBtn.getChildByName('Label').getComponent(cc.Label).string ='spawn' + this.usingSpawn
        
        this.upgradeFrenzyNode.getChildByName('level').getComponent(cc.Label).string = this.passiveFrenzyLvl
        this.upgradeTimeNode.getChildByName('level').getComponent(cc.Label).string = this.passiveTimeLvl
        this.upgradeComboNode.getChildByName('level').getComponent(cc.Label).string = this.passiveComboLvl

        this.upgradeFrenzyNode.getChildByName('price').getComponent(cc.Label).string =  this.upgradePrice(this.passiveFrenzyLvl,'frenzy')
        this.upgradeTimeNode.getChildByName('price').getComponent(cc.Label).string =this.upgradePrice( this.passiveTimeLvl , 'time')
        this.upgradeComboNode.getChildByName('price').getComponent(cc.Label).string = this.upgradePrice(this.passiveComboLvl,'combo')

        this.upgradeFrenzyNode.getChildByName('defn').getComponent(cc.Label).string =  this.upgradeChange(this.passiveFrenzyBoost, "frenzy")
        this.upgradeTimeNode.getChildByName('defn').getComponent(cc.Label).string =this.upgradeChange( this.passiveTimeBoost,"time")
        this.upgradeComboNode.getChildByName('defn').getComponent(cc.Label).string = this.upgradeChange(this.passiveComboBoost, 'combo')




          

 
    },
    addFrenzyBoost(){ 
        if(this.coins <50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("frenzyBoost" , 50))return

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
        if(this.coins <50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("spawnBoost" , 50))return
        
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
        if(this.coins <50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("freezeBoost" , 50)) return
        
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
        
        this.promptLayout.opacity = 255
        this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Are you sure you want to buy "+ name+" for " + price
        this.promptLayout.position = cc.v2( 7, 30)
        this.buying = name



    },
    closePrompt(){
        this.promptLayout.opacity = 0
        this.promptLayout.position = cc.v2(-300 , -300)
    },
    reject(){   
        this.closePrompt()

    },
    accept(){ 
        switch (this.buying){
            case "freezeBoost":
                this.addedFreeze()
                break
            case "frenzyBoost":
            this.addedFrenzy()
                break
            case "spawnBoost":
                this.addedSpawn()
                break
            case "upgradeTime":
                this.upgradedTIME()
                break
            case "upgradeFrenzy":
                this.upgradedFRENZY()
                break
            case "upgradeCombo":
                this.upgradedCOMBO()
                break

        }

        this.closePrompt()
        
    },
    showerrorPrompt(text){
        this.errorPrompt.position = cc.v2( 7, 30)
        this.errorPrompt.opacity = 255
        this.errorPrompt.getChildByName('text').getComponent(cc.Label).string = text
    },
    oked(){
        this.errorPrompt.position = cc.v2(-300 , -300)

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
                return '+1'
                break
            case 'time':
                return '+0.5'
                break
            case 'combo':
                return '+2'
                break
        } 

    },

    upgradeFrenzy(){ 
        if(this.coins < this.upgradePrice(this.passiveFrenzyLvl , 'frenzy'))   this.showerrorPrompt('Insufficient Funds') 
        else if(!(this.passiveFrenzyLvl <3) )   this.showerrorPrompt('Maxed Out') 
         
        else if(!this.confirmPrompt("upgradeFrenzy" , this.upgradePrice(this.passiveFrenzyLvl , 'frenzy')))return

    },
    upgradedFRENZY(){
        this.passiveFrenzyBoost+=1
        this.storage.passiveFrenzyBoost = this.passiveFrenzyBoost
        this.passiveFrenzyLvl+=1  
        this.storage.passiveFrenzyLvl = this.passiveFrenzyLvl
        this.coins-= this.upgradePrice( this.passiveFrenzyLvl , 'frenzy')
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },

    upgradeTime(){ 
        if(this.coins <  this.upgradePrice(this.passiveTimeLvl , 'time') )   this.showerrorPrompt('Insufficient Funds') 
        else if(!(this.passiveTimeLvl <10) )   this.showerrorPrompt('Maxed Out') 
        
        else if(!this.confirmPrompt("upgradeTime" , this.upgradePrice(this.passiveTimeLvl , 'time')))return

    },
    upgradedTIME(){
        this.passiveTimeBoost+=0.5
        this.storage.passiveTimeBoost = this.passiveTimeBoost
        this.passiveTimeLvl+=1  
        this.storage.passiveTimeLvl = this.passiveTimeLvl
        this.coins-= this.upgradePrice( this.passiveTimeLvl , 'time')
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },

    upgradeCombo(){  
        if(this.coins <  this.upgradePrice(this.passiveComboLvl , 'combo') )   this.showerrorPrompt('Insufficient Funds') 
        else if(!(this.passiveComboLvl <10) )   this.showerrorPrompt('Maxed Out')  
        else if(!this.confirmPrompt("upgradeCombo" , this.upgradePrice(this.passiveComboLvl , 'combo')))return

    },
    upgradedCOMBO(){
        this.passiveComboBoost+=2
        this.storage.passiveComboBoost = this.passiveComboBoost
        this.passiveComboLvl+=1  
        this.storage.passiveComboLvl = this.passiveComboLvl
        this.coins-= this.upgradePrice( this.passiveComboLvl , 'combo')
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },



});
