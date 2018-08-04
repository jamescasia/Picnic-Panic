  

cc.Class({
    extends: cc.Component,

    properties: { 
        picFrame:cc.Node,
        nameLabel:cc.Node,
        btn:cc.Node, 
        picFrame2:cc.Node,
        picFrame3:cc.Node,
        context:'',
        playerss:[],
        home:cc.Node,
        pics:[]

    },
  
    onSummon(context, people) {
        console.log('hey ctx', context)
        var t = this
        this.context = ( context) 
        this.btn.on('click', this.go, this);  
        for(var p = 0; p<people.length ; p++){
            var playerImage = new Image(50,50); 
            playerImage.crossOrigin = 'anonymous'; 
            playerImage.src =people[p].getPhoto();  
            cc.loader.load(playerImage.src, (err, texture) => { 
            
            t.picFrame.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
            this.pics.push(texture)
            })


        }  
        t.picFrame.width = 70 ;
        t.picFrame.height = 70 
        t.picFrame2.width = 70 ;
        t.picFrame2.height = 70 
        t.picFrame3.width = 70 ;
        t.picFrame3.height = 70 
        if(this.pics[0] !=null)t.picFrame.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pics[0])
        if(this.pics[1] !=null)t.picFrame2.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pics[1])
        if(this.pics[2] !=null)t.picFrame3.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pics[2])
        
    }, 
    
    go(){
        console.log('pressed',this.context)
        FBInstant.context
            .switchAsync(String(this.context)).then(function(){
                cc.find('Canvas').getComponent('homeScript').showPanel()
            })
            
            
              
    }
 
});
