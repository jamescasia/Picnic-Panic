// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        script:[],
        arrowPos:[ ],
        arrow:cc.Node,
        label:cc.Node,
        pager:0,
        mask:cc.Node,
        btn:cc.Node,


      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.4, 0.9, 0.9),cc.scaleBy(0.4, 0.85, 0.85))))
        this.script = [  "These are the boosters, they help you gain more points in different ways",
        "time booster, gives additional 5 seconds", "frenzy booster, increases the frenzy multiplier to 4 times",
        "spawn booster, randomly spawns complete Pizza, Burgers, or Pancakes", 
        "This is the shop, upgrade passive bonuses, buy boosters, and buy awesome effects here!", "Touch this button to proceed",
        "Good luck!"]
        // "Match two similar food by tapping both of them", "As you can see, the food levelled up! We are now closer to getting our delicious pizza, burger, or pancake",
        // "Do the same for all the other food", "Try matching complete food", "Matching complete food activates a score booster for that food",
        // "Score boosts for each food is indicated in this panel", "This shows the time you have left. Make sure to score your highest before the time ends!",
        //  ],
        
        // this.label.getComponent(cc.Label).string = this.script[0]
        this.arrowPos= [  [ 180,cc.v2(0,300)]  , [ 180,cc.v2(-163,184)], [ 180,cc.v2(0,184)], 
        [ 180,cc.v2(146,184)] , [ 0,cc.v2(124,-273)], [ 0,cc.v2(0,-276)]]
        this.arrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.4, 0, 30),cc.moveBy(0.4, 0, -30))))
        // this.arrow.rotation = this.arrowPos[this.pager][0]
        // this.arrow.position = this.arrowPos[this.pager][1]
        this.onNext()
    },
    onNext(){
        // this.btn.stopAllActions()
        this.label.getComponent(cc.Label).string = this.script[this.pager]
        this.arrow.rotation = this.arrowPos[this.pager][0]
        this.arrow.position = this.arrowPos[this.pager][1]
        // this.btn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.4, 0.9, 0.9),cc.scaleBy(0.4, 0.85, 0.85))))

        
        this.pager+=1
        if(this.pager == 6) this.mask.destroy(), this.btn.destroy()  ,this.label.position = cc.v2(7,-395)
        // if(this.page == 6)this.btn.destroy()
    
    },

    start () {

    },

    // update (dt) {},
});
