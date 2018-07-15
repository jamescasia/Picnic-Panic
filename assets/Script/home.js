 

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
        realcoins:5,
        buyBoosters:cc.Node,
        currencies:cc.Node,
        usingFreeze:false,
        usingFrenzy:false,
        usingSpawn:false,
        useFreezeBtn:cc.Node,
        useFrenzyBtn:cc.Node,
        useSpawnBtn:cc.Node

 
    }, 

    onLoad () {  
        cc.director.loadScene("main");
        if (   parseInt(cc.sys.localStorage.getItem('frenzy'))  != null ) this.frenzyBoosts =  parseInt (cc.sys.localStorage.getItem('frenzy'))
        else this.frenzyBoosts = 0, cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
        if ( parseInt(cc.sys.localStorage.getItem('freeze')) != null ) this.freezeBoosts =  parseInt (cc.sys.localStorage.getItem('freeze')) 
        else this.freezeBoosts = 0, cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
        if ( parseInt(cc.sys.localStorage.getItem('spawn')) != null ) this.spawnBoosts =  parseInt (cc.sys.localStorage.getItem('spawn')) 
        else this.spawnBoosts = 0, cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
        if ( parseInt(cc.sys.localStorage.getItem('coins') )!= null ) this.coins =  parseInt (cc.sys.localStorage.getItem('coins'))
        else this.coins = 0, cc.sys.localStorage.setItem('coins',  this.coins); 
        if ( parseInt(cc.sys.localStorage.getItem('realcoins')) != null ) this.realcoins =  parseInt (cc.sys.localStorage.getItem('realcoins'))
        else this.realcoins = 0, cc.sys.localStorage.setItem('realcoins',  this.realcoins); 
        console.log('frenzy ' , this.frenzyBoosts ,'freeze' , this.freezeBoosts , 'spawn' , this.spawnBoosts)
        cc.sys.localStorage.setItem('usingFrenzy',  false); 
        cc.sys.localStorage.setItem('usingFreeze', false); 
        cc.sys.localStorage.setItem('usingSpawn', false); 
        

        this.playBtn.on('click', this.play, this);
    },

    start () { 

    },
 
    play(){
        cc.director.loadScene('main');
    },
    addFrenzyBoost(){
        this.frenzyBoosts+=1 
        cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
    },
    addSpawnBoost(){
        this.spawnBoosts+=1
        cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
    },
    addFreezeBoost(){
        this.freezeBoosts+=1
        cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
    },
    useFrenzy(){
        if(this.frenzyBoosts>=1){
            this.usingFrenzy = ! this.usingFrenzy

            this.useFrenzyBtn.getChildByName('Label').getComponent(cc.Label).string = 'frenzy' + this.usingFrenzy
            this.frenzyBoosts-=1
            cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
            cc.sys.localStorage.setItem('usingFrenzy',  this.usingFrenzy); 
        }
        else console.log(this.frenzyBoosts)

    },
    useFreeze(){
        if(this.freezeBoosts>=1){
            this.usingFreeze = !this.usingFreeze
            this.useFreezeBtn.getChildByName('Label').getComponent(cc.Label).string ='freeze'+  this.usingFreeze
            this.freezeBoosts-=1 
            cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
            cc.sys.localStorage.setItem('usingFreeze',  this.usingFreeze); 
        }
        else console.log(this.freezeBoosts)
    },
    useSpawn(){
        if(this.spawnBoosts>=1){
            this.usingSpawn = !this.usingSpawn
            this.useSpawnBtn.getChildByName('Label').getComponent(cc.Label).string ='spawn' + this.usingSpawn
            this.spawnBoosts-=1 
            cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
            cc.sys.localStorage.setItem('usingSpawn',  this.usingSpawn); 
        }
        else console.log(this.spawnBoosts)
    },
});
