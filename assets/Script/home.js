 

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
        passiveFrenzyDuration:0,
        boostLabels:cc.Node,
        promptLayout:cc.Node,
        errorPrompt:cc.Node,
        buying:null

 
    }, 

    onLoad () {  
        cc.director.preloadScene("main");
        if (   parseInt(cc.sys.localStorage.getItem('frenzy'))  != null ) this.frenzyBoosts =  parseInt (cc.sys.localStorage.getItem('frenzy'))
        else this.frenzyBoosts = 0 
        if ( parseInt(cc.sys.localStorage.getItem('freeze')) != null ) this.freezeBoosts =  parseInt (cc.sys.localStorage.getItem('freeze')) 
        else this.freezeBoosts = 0 
        if ( parseInt(cc.sys.localStorage.getItem('spawn')) != null ) this.spawnBoosts =  parseInt (cc.sys.localStorage.getItem('spawn')) 
        else this.spawnBoosts = 0 
        if ( parseInt(cc.sys.localStorage.getItem('coins') )!= null ) this.coins =  parseInt (cc.sys.localStorage.getItem('coins'))
        else this.coins = 0 
        if ( parseInt(cc.sys.localStorage.getItem('realcoins')) != null ) this.realcoins =  parseInt (cc.sys.localStorage.getItem('realcoins'))
        else this.realcoins = 0 
        if(cc.sys.localStorage.getItem('passiveComboBoost')!= null ) this.passiveComboBoost = parseInt(cc.sys.localStorage.getItem('passiveComboBoost'))
        else this.passiveComboBoost= 0 
        if(cc.sys.localStorage.getItem('passiveTimeBoost')!= null ) this.passiveTimeBoost = parseFloat(cc.sys.localStorage.getItem('passiveTimeBoost'))
        else this.passiveTimeBoost= 0 
        if(cc.sys.localStorage.getItem('passiveFrenzyDuration')!= null ) this.passiveFrenzyDuration = parseFloat(cc.sys.localStorage.getItem('passiveFrenzyDuration'))
        else this.passiveFrenzyDuration= 0 
        cc.sys.localStorage.setItem('usingFrenzy',  false); 
        cc.sys.localStorage.setItem('usingFreeze', false); 
        cc.sys.localStorage.setItem('usingSpawn', false); 
        

        this.playBtn.on('click', this.play, this);
    },

    start () { 
        this.setLabels()
        

    },
 
    play(){
        cc.director.loadScene('main');
    
        
    },
    setLabels(){
        this.coinsLabel.getComponent(cc.Label).string = this.coins
        this.boostLabels.getChildByName('spawn').getComponent(cc.Label).string  = this.spawnBoosts
        this.boostLabels.getChildByName('frenzy').getComponent(cc.Label).string   = this.frenzyBoosts
        this.boostLabels.getChildByName('freeze').getComponent(cc.Label).string  = this.freezeBoosts
        
        this.useFrenzyBtn.getChildByName('Label').getComponent(cc.Label).string = 'frenzy' + this.usingFrenzy
        this.useFreezeBtn.getChildByName('Label').getComponent(cc.Label).string ='freeze'+  this.usingFreeze
        this.useSpawnBtn.getChildByName('Label').getComponent(cc.Label).string ='spawn' + this.usingSpawn

        cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
        cc.sys.localStorage.setItem('usingSpawn',  this.usingSpawn); 
        cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
            cc.sys.localStorage.setItem('usingFrenzy',  this.usingFrenzy); 
            cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
            cc.sys.localStorage.setItem('usingFreeze',  this.usingFreeze); 
    },
    addFrenzyBoost(){
        if(this.coins <50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("frenzyBoost" , 50))return
        
         

    },
    addedFrenzy(){
        this.frenzyBoosts+=1 
        cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
        this.coins-=50
        cc.sys.localStorage.setItem('coins',  this.coins)
        this.setLabels()

    },
    addSpawnBoost(){
        if(this.coins <50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("spawnBoost" , 50))return
        
    },
    addedSpawn(){
        this.spawnBoosts+=1
        cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
        this.coins-=50
        cc.sys.localStorage.setItem('coins',  this.coins) 
        this.setLabels()

    },

    addFreezeBoost(){
        if(this.coins <50) {this.showerrorPrompt('Insufficient Funds') 
        return}
        if(!this.confirmPrompt("freezeBoost" , 50)) return
        
    },
    addedFreeze(){
        this.freezeBoosts+=1
        cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
        this.coins-=50
        cc.sys.localStorage.setItem('coins',  this.coins) 
        this.setLabels()
    },
    useFrenzy(){
        if(this.frenzyBoosts>=1){
            this.usingFrenzy = ! this.usingFrenzy

            
            
        }
        else console.log(this.frenzyBoosts)

        if(this.usingFrenzy) this.frenzyBoosts-=1
        else this.frenzyBoosts+=1
        this.setLabels()

    },
    useFreeze(){
        if(this.freezeBoosts>=1){
            this.usingFreeze = !this.usingFreeze
             
            
        }
        else console.log(this.freezeBoosts)
        if(this.usingFreeze) this.freezeBoosts-=1
        else this.freezeBoosts+=1
        this.setLabels()
    },
    useSpawn(){
        if(this.spawnBoosts>=1){
            this.usingSpawn = !this.usingSpawn
             
           
        }
        else console.log(this.spawnBoosts)
        if(this.usingSpawn) this.spawnBoosts-=1
        else this.spawnBoosts+=1
        this.setLabels() 
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


});
