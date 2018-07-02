 

cc.Class({
    extends: cc.Component,

    properties: {
        playBtn:cc.Node,
        addBoostBtn:cc.Node,
        boosterNum:cc.Node,
        boosts:0

 
    }, 

    onLoad () {
         //cc.sys.localStorage.setItem('boosts', 0); 
        if (cc.sys.localStorage.getItem('frenzy') !=null){
            this.boosts =  parseInt (cc.sys.localStorage.getItem('frenzy'))
        }
        else {
            this.boosts = 0
            cc.sys.localStorage.setItem('frenzy',  this.boosts); 
        }

        this.playBtn.on('click', this.play, this);
        this.addBoostBtn.on('click', this.addBoost, this);
    },

    start () {
        this.boosterNum.getComponent(cc.Label).string = this.boosts

    },

    // update (dt) {},
    play(){

        cc.director.loadScene('main');
    },
    addBoost(){
        this.boosts+=1
        this.boosterNum.getComponent(cc.Label).string = this.boosts
        cc.sys.localStorage.setItem('frenzy',  this.boosts); 

    }
});
