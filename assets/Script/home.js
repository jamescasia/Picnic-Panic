var global = require('global')  
cc.Class({
    extends: cc.Component, 

    properties: {
        Ngrass:cc.Node,
        Nblossom:cc.Node,
        Nsakura:cc.Node,
        Nbong:cc.Node,
        useS:cc.SpriteFrame,
        usingS:cc.SpriteFrame, 
        done:cc.SpriteFrame,
        upgrades:cc.Node,
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
        scrnLabel:cc.Node,
        uiSound:cc.AudioClip, 
        buysound:cc.AudioClip

 
    }, 
    parseBoolean(x){
        if(x == 'false') return false
        if ( x== 'true') return true

    },

    onLoad () {      

       
        cc.director.preloadScene("main"); 
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))
        if(  this.storage == null  ){
            var a0={collected:false,prize:100,achieved:false,desc:"Score 100 points!", type:"score", req:100 }
            var a1={collected:false,prize:100,achieved:false ,desc:"Achieve a 20-long combo" , type:"combo", req:20 }
            var a2={collected:false,prize:200,achieved:false ,desc:"Score 500 points!", type:"score", req:500 }
            var a3={collected:false,prize:200,achieved:false ,desc:"Achieve a 30-long combo" , type:"combo", req:30 }
            var a4={collected:false,prize:500,achieved:false ,desc:"Score 1000 points!" , type:"score", req:1000 }
            var a5={collected:false,prize:500,achieved:false ,desc:"Achieve a 40-long combo" , type:"combo", req:40 }
            var a6={collected:false,prize:1000,achieved:false ,desc:"Score 2000 points!" , type:"score", req:2000 }
            var a7={collected:false,prize:1000,achieved:false, desc:"Achieve a 60-long combo" , type:"combo", req:60 }
            var a8={collected:false,prize:2000,achieved:false ,desc:"Score 5000 points!" , type:"score", req:5000 }
            var a9={collected:false,prize:3000,achieved:false,desc:"Play 100 games" , type:"games", req:100 }
            var a10={collected:false,prize:5000,achieved:false,desc:"Play 200 games" , type:"games", req:200 }
            var a11={collected:false,prize:7000,achieved:false,desc:"Play 500 games" , type:"games", req:500 }
            var a12={collected:false,prize:10000,achieved:false,desc:"Play 1000 games" , type:"games", req:1000 }
            
            this.storage = {frenzyBoosts : 0, freezeBoosts:0 , spawnBoosts:0 , usingFrenzy:false , usingFreeze:false,
                usingSpawn:false , coins:0 , realcoins :0 , passiveComboBoost:0 , passiveTimeBoost:0 , 
                passiveFrenzyBoost:0,highestScore:0 , highestCombo:0,numOfGames:0,passiveComboLvl:0 , passiveFrenzyLvl:0,
                passiveTimeLvl:0, bgVolume:1, bgVolume:1,sfxOn:true, bgOn:true, 
                achievements:[a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12],usedParticle:null,leaf:false,pinkLeaf:false, sakura:false,bong:false
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
        // usedParticle:"none",leaf:false,pinkLeaf:false, sakura:false,bong:false 
        this.usedParticle =  (  (this.storage.usedParticle))
        console.log(this.usedParticle , "FROM GENSAN")
        this.leaf =  (  (this.storage.usedParticle))
        this.pinkLeaf =  (  (this.storage.pinkLeaf))
        this.sakura =  (  (this.storage.sakura))
        this.bong =  (  (this.storage.bong))
        this.usingFrenzy = false
                this.usingFreeze = false
                this.usingSpawn = false
                this.storage.usingFrenzy = false
                this.storage.usingFreeze = false
                this.storage.usingSpawn = false
        this.ss()
 
       

        this.playBtn.on('click', this.play, this);

        this.upgrades.getComponent("levels").onLoads()
        this.setButtons()
         
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
        // cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.node.opacity = 0
        this.node.setLocalZOrder(-10)
        this.node.scale = cc.v2(0,0) 
        this.node.emit('destroyed')
        this.node.destroy()
        
 
    
        
    },  
    setLabels(){
        this.coinsLabel.getComponent(cc.Label).string = this.coins
        this.boostLabels.getChildByName('spawn').getComponent(cc.Label).string  = this.spawnBoosts
        this.boostLabels.getChildByName('frenzy').getComponent(cc.Label).string   = this.frenzyBoosts
        this.boostLabels.getChildByName('freeze').getComponent(cc.Label).string  = this.freezeBoosts
          

        if((this.passiveComboLvl <10) )  this.upgradeComboNode. getChildByName('Label').getComponent(cc.Label).string =  this.upgradePrice(this.passiveComboLvl,'combo')
        else  {this.upgradeComboNode.getChildByName('btn').getComponent(cc.Button).interactable = false
                this.upgradeComboNode.getChildByName('btn').getComponent(cc.Sprite).spriteFrame = this.done }

        if((this.passiveTimeLvl <10) )   this.upgradeTimeNode.getChildByName('Label').getComponent(cc.Label).string = this.upgradePrice( this.passiveTimeLvl , 'time')
        else  {this.upgradeTimeNode.getChildByName('btn').getComponent(cc.Button).interactable = false 
            this.upgradeTimeNode.getChildByName('btn').getComponent(cc.Sprite).spriteFrame = this.done }

        if((this.passiveFrenzyLvl <3) )   this.upgradeFrenzyNode.getChildByName('Label').getComponent(cc.Label).string = this.upgradePrice(this.passiveFrenzyLvl,'frenzy')
        else{    this.upgradeFrenzyNode.getChildByName('btn').getComponent(cc.Button).interactable = false
                this.upgradeFrenzyNode.getChildByName('btn').getComponent(cc.Sprite).spriteFrame = this.done }

        // if((this.passiveFrenzyLvl <3) ) this.upgradeFrenzyNode.getChildByName('defn').getComponent(cc.Label).string =  "Upgrading this would increase frenzy bonus score by "+ String(this.upgradeChange(this.passiveFrenzyBoost, "frenzy")*(1+this.passiveFrenzyLvl))
        // else this.upgradeFrenzyNode.getChildByName('defn').getComponent(cc.Label).string =  "Your Frenzy bonus is already in maximum power! Awesome!"
        // if((this.passiveTimeLvl <10) )  this.upgradeTimeNode.getChildByName('defn').getComponent(cc.Label).string ="Upgrading this would increase time bonus by "+ String(this.upgradeChange( this.passiveTimeBoost,"time")*(1+this.passiveTimeLvl))
        // else this.upgradeTimeNode.getChildByName('defn').getComponent(cc.Label).string =  "Your Time bonus is already in maximum power! Awesome!"
        // if((this.passiveComboLvl <10) )  this.upgradeComboNode.getChildByName('defn').getComponent(cc.Label).string = "Upgrading this would increase combo bonus score by "+String(this.upgradeChange(this.passiveComboBoost, "combo")* (1+this.passiveComboLvl ))
        // else this.upgradeComboNode.getChildByName('defn').getComponent(cc.Label).string =  "Your Combo bonus is already in maximum power! Awesome!"
        this.ss()



          

 
    },
    addFrenzyBoost(){ 
        if(this.coins <100) {this.showerrorPrompt('Insufficient Stars') 
        return}
        if(!this.confirmPrompt("Frenzy Booster" , 100))return

    },
    addedFrenzy(){
        this.frenzyBoosts+=1  
        this.storage.frenzyBoosts = this.frenzyBoosts
        this.coins-=100 
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()


    },
    addSpawnBoost(){
        if(this.coins <100) {this.showerrorPrompt('Insufficient stars') 
        return}
        if(!this.confirmPrompt("Spawn Booster" , 100))return
        
    },
    addedSpawn(){
        this.spawnBoosts+=1
        this.storage.spawnBoosts = this.spawnBoosts
        this.coins-=100
        this.storage.coins = this.coins
        this.setLabels()
        this.ss()

    },

    addFreezeBoost(){
        if(this.coins <100) {this.showerrorPrompt('Insufficient sTaRs') 
        return}
        if(!this.confirmPrompt("Freeze Booster" , 100)) return
        
    },
    addedFreeze(){
        this.freezeBoosts+=1
        this.storage.freezeBoosts = this.freezeBoosts
        this.coins-=100
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
            if( name.includes("frenzy" ))  this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Increases frenzy bonus score by "+ String(this.upgradeChange(this.passiveFrenzyBoost, "frenzy")*(1+this.passiveFrenzyLvl))+ " points for " + price  +" stars. Proceed?"
            if( name.includes("time" ))  this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Increases time bonus by "+ String(this.upgradeChange(this.passiveTimeBoost, "time")*(1+this.passiveTimeLvl))+ " s for " + price  +" stars. Proceed?"
            if( name.includes("combo" ))  this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Increases combo bonus score by "+ String(this.upgradeChange(this.passiveComboBoost, "combo")*(1+this.passiveComboLvl))+ " points for " + price  +" stars. Proceed?"
       
        }
        else this.promptLayout.getChildByName('text').getComponent(cc.Label).string = "Really want to buy "+ name+" for " + price +" stars?"
        this.promptLayout.position = cc.v2( 7, 30)
        this.buying = name
        


    },
    closePrompt(){
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.promptLayout.opacity = 0
        this.promptLayout.setLocalZOrder(-14)
        this.promptLayout.position = cc.v2(-1800 , -1800)
    },
    reject(){   
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        this.closePrompt()

    },
    accept(){ 
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        
        
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
        if(this.buying.includes("effect")) this.earnEffect(this.buying)
        console.log('HUY INATAYY')
        this.upgrades.getComponent("levels").onLoads()

        this.closePrompt()
        
    },
    showerrorPrompt(text){
        this.errorPrompt.position = cc.v2( 7, 30)
        this.errorPrompt.opacity = 255
        this.errorPrompt.setLocalZOrder(10)
        this.errorPrompt.getChildByName('text').getComponent(cc.Label).string = text
    },
    oked(){
        this.errorPrompt.position = cc.v2(-1800 , -1800)
        this.errorPrompt.setLocalZOrder(-10)
        this.errorPrompt.opacity = 0
    },
    upgradePrice(lvl,name){
        switch(name){
            case 'frenzy':
                return 1000 + lvl*1000
                break
            case 'time':
                return 500 + lvl*500
                break
            case 'combo':
                return 700 + lvl*700
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
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        if(!(this.passiveFrenzyLvl <3) )   this.showerrorPrompt('Maxed Out') 
        else if(this.coins < this.upgradePrice(this.passiveFrenzyLvl , 'frenzy'))   this.showerrorPrompt('Insufficient Stars')  
         
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
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
         if(!(this.passiveTimeLvl <10) )   this.showerrorPrompt('Maxed Out') 
         else if(this.coins <  this.upgradePrice(this.passiveTimeLvl , 'time') )   this.showerrorPrompt('Insufficient stars') 
        
        
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
        cc.audioEngine.playEffect( this.uiSound,false,global.bgVolume) 
        if(!(this.passiveComboLvl <10) )   this.showerrorPrompt('Maxed Out')  
        else if(this.coins <  this.upgradePrice(this.passiveComboLvl , 'combo') )   this.showerrorPrompt('Insufficient stars') 
        
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
    buyEffect(e, name){
        
        name = name + " effect"
        console.log("BUY", name)
        switch(name){
            case "leaf effect": 
                if(this.leaf) {
                this.storage.usedParticle = "leaf"
                this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.usingS
                this.Ngrass.getChildByName('grass').getComponent(cc.Button).interactable =false

                this.Nblossom.getChildByName('blossom').getComponent(cc.Button).interactable =true
                this.Nsakura.getChildByName('sakura').getComponent(cc.Button).interactable =true
                this.Nbong.getChildByName('bong').getComponent(cc.Button).interactable =true 
                if(this.pinkLeaf) this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.sakura)this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.bong)this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.useS
                 }

                //  if(this.leaf && "leaf" != this.usedParticle) this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.useS
                //  if(this.pinkLeaf && "pinkLeaf" != this.usedParticle) this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.useS
                //  if(this.sakura && "sakura" != this.usedParticle)this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.useS
                //  if(this.bong && "bong" != this.usedParticle)this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.useS

                else {
                    if(this.coins <4000) {this.showerrorPrompt('Insufficient STars') }
                    else this.confirmPrompt(name, 4000) 
                     return}
                    break


            case "blossom effect": 
            if(this.pinkLeaf) {this.storage.usedParticle = "pinkLeaf"
            this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.usingS
            this.Nblossom.getChildByName('blossom').getComponent(cc.Button).interactable =false

            this.Ngrass.getChildByName('grass').getComponent(cc.Button).interactable =true
                this.Nsakura.getChildByName('sakura').getComponent(cc.Button).interactable =true
                this.Nbong.getChildByName('bong').getComponent(cc.Button).interactable =true
               if(this.leaf) this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.sakura)this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.bong)this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.useS
                 }
                 else {
                    if(this.coins <6000) {this.showerrorPrompt('Insufficient STars') }
                    else this.confirmPrompt(name, 6000) 
                     return}
                    break


            case "sakura effect":
            console.log("SAKURA", this.sakura)
             
            if(this.sakura) {
                
                this.storage.usedParticle = "sakura"
            this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.usingS
            this.Nsakura.getChildByName('sakura').getComponent(cc.Button).interactable =false

            this.Ngrass.getChildByName('grass').getComponent(cc.Button).interactable =true
                this.Nblossom.getChildByName('blossom').getComponent(cc.Button).interactable =true
                this.Nbong.getChildByName('bong').getComponent(cc.Button).interactable =true
                if(this.leaf)this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.pinkLeaf)this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.bong)this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.useS
                 }
                 else {
                    if(this.coins <10000) {this.showerrorPrompt('Insufficient STars') }
                    else this.confirmPrompt(name, 10000) 
                     return}
                    break



            case "bong effect":
            
            if(this.bong) {
                this.storage.usedParticle = "bong"
            this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.usingS
            this.Nbong.getChildByName('bong').getComponent(cc.Button).interactable =false

            this.Ngrass.getChildByName('grass').getComponent(cc.Button).interactable =true
                this.Nblossom.getChildByName('blossom').getComponent(cc.Button).interactable =true
                this.Nsakura.getChildByName('sakura').getComponent(cc.Button).interactable =true
                if(this.leaf)this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.pinkLeaf)this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.useS
                 if(this.sakura)this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.useS
                 }
                else {
                if(this.coins <20000) {this.showerrorPrompt('Insufficient STars') }
                else this.confirmPrompt(name, 20000) 
                 return}
                break
        }
        global.usingPart = this.storage.usedParticle
        this.ss()

        

    },
    earnEffect(name){  
        // usedParticle:"none",leaf:false,pinkLeaf:false, sakura:false,bong:false 
        switch(name){ 
            case "leaf effect":
                this.coins-= 4000 
                this.storage.leaf = true
                this.leaf = true
                 this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.useS
                 
                 
                break
            case "blossom effect":
                this.coins-= 6000 
                this.storage.pinkLeaf = true
                this.pinkLeaf = true
                 this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.useS
                break
            case "sakura effect":
                this.coins-= 10000 
                this.storage.sakura = true
                this.sakura = true
                 this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.useS
                break
            case "bong effect":
                this.coins-= 20000 
                this.storage.bong = true
                this.bong = true
                this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.useS
                break
        }

        this.storage.coins = this.coins 
        this.ss()
        this.setLabels()
    },
  setButtons(){
      //set buttons to parts used
      //set use for unused if bought(this.sakura etc)
      console.log(this.usedParticle,"galing sa setBUttons")
      switch(this.usedParticle){

        case "leaf": 
            this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.usingS
            this.Ngrass.getChildByName('grass').getComponent(cc.Button).interactable =false
  
 
            break
        case "pinkLeaf": 
            this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.usingS
            this.Nblossom.getChildByName('blossom').getComponent(cc.Button).interactable =false
    
            break
        case "sakura": 
         
        this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.usingS
        this.Nsakura.getChildByName('sakura').getComponent(cc.Button).interactable =false
 
            break
        case "bong": 

            this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.usingS
            this.Nbong.getChildByName('bong').getComponent(cc.Button).interactable =false
 
            break
    }
    if(this.leaf && "leaf" != this.usedParticle) this.Ngrass.getChildByName('grass').getComponent(cc.Sprite).spriteFrame = this.useS
    if(this.pinkLeaf && "pinkLeaf" != this.usedParticle) this.Nblossom.getChildByName('blossom').getComponent(cc.Sprite).spriteFrame = this.useS
    if(this.sakura && "sakura" != this.usedParticle)this.Nsakura.getChildByName('sakura').getComponent(cc.Sprite).spriteFrame = this.useS
    if(this.bong && "bong" != this.usedParticle)this.Nbong.getChildByName('bong').getComponent(cc.Sprite).spriteFrame = this.useS
  }



});
