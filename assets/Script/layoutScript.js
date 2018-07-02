 

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Node,
        highScoreLabel:cc.Node,
        highComboLabel:cc.Node,
        resetBtn:cc.Node,
        homeBtn:cc.Node
 
    },
 

    onLoad () {
        this.resetBtn.on('click', this.onReset, this);
        this.homeBtn.on('click', this.onHome, this);
    },

    start () {

    },
    showPanel(score, highCombo    ){
        var show = cc.spawn(
            cc.moveTo(0.4, 0,-92 ),
            cc.fadeIn(0.2)

        )

       this.node.runAction(show)

        this.scoreLabel.getComponent(cc.Label).string = "SCORE: "  + String(score) 
        var highestScore = (cc.sys.localStorage.getItem('highestScore')); 
          this.highScoreLabel.getComponent(cc.Label).string = "HIGHSCORE: " + String(highestScore  ) 
        this.highComboLabel.getComponent(cc.Label).string = "HIGH COMBO: " + String(highCombo) 
    },
    onHome(){
        cc.director.loadScene('home');
    },
    onReset(){

        cc.director.loadScene('main');
    },

    update (dt) {},
});
