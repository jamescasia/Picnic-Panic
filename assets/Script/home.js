 

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
        currencies:cc.Node

 
    }, 

    onLoad () { 
        if (cc.sys.localStorage.getItem('frenzy') !=null) this.frenzyBoosts =  parseInt (cc.sys.localStorage.getItem('frenzy'))
        else this.frenzyBoosts = 0, cc.sys.localStorage.setItem('frenzy',  this.frenzyBoosts); 
        if (cc.sys.localStorage.getItem('freeze') !=null) this.freezeBoosts =  parseInt (cc.sys.localStorage.getItem('frenzy'))
        else this.freezeBoosts = 0, cc.sys.localStorage.setItem('freeze',  this.freezeBoosts); 
        if (cc.sys.localStorage.getItem('spawn') !=null) this.spawnBoosts =  parseInt (cc.sys.localStorage.getItem('frenzy'))
        else this.spawnBoosts = 0, cc.sys.localStorage.setItem('spawn',  this.spawnBoosts); 
        if (cc.sys.localStorage.getItem('coins') !=null) this.coins =  parseInt (cc.sys.localStorage.getItem('coins'))
        else this.coins = 0, cc.sys.localStorage.setItem('coins',  this.coins); 
        if (cc.sys.localStorage.getItem('realcoins') !=null) this.realcoins =  parseInt (cc.sys.localStorage.getItem('realcoins'))
        else this.realcoins = 0, cc.sys.localStorage.setItem('realcoins',  this.realcoins); 
        

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
    }
});
