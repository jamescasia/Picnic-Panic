 //functions to initialize in all scenes, should also add, global functions that can be called anywhere

cc.Class({
    extends: cc.Component,
    onLoad(){
        cc.director.setDisplayStats ( false )
        this.screenResize()
    },
    screenResize(){
        if( cc.director.getWinSize().height/cc.director.getWinSize().width <= 1.34   ) {
            console.log('bogo resized')
            this.node.getComponent(cc.Canvas).fitHeight = true
            this.node.getComponent(cc.Canvas).fitWidth = true
        } 

    },


    
}); 
