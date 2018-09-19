 

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Node,
        highScoreLabel:cc.Node,
        highComboLabel:cc.Node,
        prizeLable:cc.Node, 
 
    },
 

    onLoad () { 
    },

    start () {

    },
    showPanel(score, highCombo  ,prize ,highest ){
        var show = cc.spawn(
            cc.moveTo(0.4, 0,0 ),
            cc.fadeIn(0.2)

        )

       this.node.runAction(show)
       this.prizeLable.getComponent(cc.Label).string =  String(prize) 

        this.scoreLabel.getComponent(cc.Label).string =  String(score) 
        var highestScore =highest
          this.highScoreLabel.getComponent(cc.Label).string =   String(highestScore  ) 
        this.highComboLabel.getComponent(cc.Label).string =  String(highCombo) 
    },
    onHome(){
        cc.director.loadScene('shop');
    },
    onReset(){

        cc.director.loadScene('main');
    },

    update (dt) {},
});
