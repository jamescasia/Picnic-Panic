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
        sakura:cc.Node,
        grass:cc.Node,
        blossom:cc.Node,
        bong:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.sakura.getComponent(cc.ParticleSystem).resetSystem()
        //     this.bong.getComponent(cc.ParticleSystem).resetSystem()
        //     this.blossom.getComponent(cc.ParticleSystem).resetSystem()
        //     this.grass.getComponent(cc.ParticleSystem).resetSystem()
        var fun = function(){

            this.sakura.getComponent(cc.ParticleSystem).resetSystem()
            this.bong.getComponent(cc.ParticleSystem).resetSystem()
            this.blossom.getComponent(cc.ParticleSystem).resetSystem()
            this.grass.getComponent(cc.ParticleSystem).resetSystem()
        }

        var a = cc.repeatForever(
            cc.sequence(
                cc.delayTime(2),
                cc.callFunc(fun, this)  
            ) 
        )
        
        this.node.runAction(a)
    },

    // update (dt) {},
});
