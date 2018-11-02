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
        Pages:cc.Node,
        pages:[],
        tab:cc.Node,
        pageCtr:0,
        page1:cc.Node,
        page2:cc.Node,
        page3:cc.Node,
        page4:{ default:null,
                type:cc.Node},
        pos:[],
        currentBob:cc.Node,
        open:true,
        Game:cc.Node

       

         
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log("next pageee", this.page4)
        this.showPage() 
        this.pos = [-142, -48, 46, 139]
        if(this.page4 == null ) this.pos = [-97,-2.6, 92.6]
        this.currentBob.position  =cc.v2( this.pos[this.pageCtr], 3)
        

    },
    showPage(dir){
        
        
        if(this.page4 == null )this.pages = [this.page1, this.page2, this.page3 ] 
        else this.pages = [this.page1, this.page2, this.page3, this.page4] 
        let dis = 1000
        // var show = cc.sequence(cc.moveTo(0,0,-29),cc.fadeIn(0.5) , cc.delayTime(0.1)) 
        if(dir == "left")  dis = -1000
        else dis = 1000
        let show =   cc.sequence( 
            cc.spawn(
                cc.moveTo(0.2, 0,-29).easing(cc.easeExponentialIn()) ,
                cc.delayTime(0)
                //
            ), cc.delayTime(0)
            // cc.fadeOut(0.3), 
        )
        this.pages[this.pageCtr].runAction(show) 
    },
    panLeft(){
        var hide = cc.sequence(
            cc.spawn(
                cc.moveBy(0.2, 1000,0).easing(cc.easeExponentialIn()) ,
                cc.delayTime(0)
                //
            ), cc.delayTime(0)
            // cc.fadeOut(0.3), 
        )
        this.pages[this.pageCtr].runAction(hide)

        this.pageCtr-=1
        if(this.pageCtr <0 && this.page4!= null) this.pageCtr = 3
        else if(this.pageCtr <0 && this.page4== null) this.pageCtr = 2
        
        this.currentBob.position  =cc.v2( this.pos[this.pageCtr], 3)
        
        this.showPage('left')
    },
    panRight(){
        var hide = cc.sequence(
            cc.spawn(
                cc.moveBy(0.2, -1000,0).easing(cc.easeExponentialIn()) ,
                cc.delayTime(0)
                // 
            ),
            cc.delayTime(0)
            // cc.fadeOut(0.3), 
        )
        this.pages[this.pageCtr].runAction(hide)
        this.pageCtr+=1
        if(this.pageCtr >3 && this.page4!= null) this.pageCtr = 0
        else if (this.pageCtr >2 && this.page4== null) this.pageCtr =0
        this.currentBob.position  =cc.v2( this.pos[this.pageCtr], 3)
        this.showPage('right')
    },
    close(){
        this.open = false
        this.node.opacity = 0
        this.node.position = cc.v2(-800,-800) 
        if(cc.director.getScene()._name == 'main')this.Game.getComponent("Game").closePanel()
    },


    // update (dt) {},
});
