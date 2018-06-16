 
cc.Class({
    extends: cc.Component,

    properties: { 
        choices:[],
        frame:cc.Sprite,
        burgerPic:cc.SpriteFrame,
        pancakePic:cc.SpriteFrame,
        pizzaPic:cc.SpriteFrame,
        level:0,
        isEmpty:true

    },
 

    onLoad () {
        this.choices = [ this.burgerPic , this.pancakePic, this.pizzaPic]
    },

    start () {
        

    },

    update (dt) {
         
    },
    addFood(){
        if(this.isEmpty){
        var rand =  Math.round( cc.rand() )%3 
        console.log("random" + rand)
        this. frame.spriteFrame = this.choices[rand]
        this.isEmpty = false // not completed the loop gotta make isEmpty true again
        
        }


    }
});
