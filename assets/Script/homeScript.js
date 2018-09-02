 var global = require('global') 
cc.Class({
    extends: cc.Component,

    properties: { 
        playPanel:cc.Node,
        coinsText:cc.Node,
        topPic:cc.Node,
        leaderboard:cc.Node,
        timeBoostLeft:cc.Node,
        spawnBoostLeft:cc.Node,
        frenzyBoostLeft:cc.Node,   
        rankings:'',
        activeContexts:[], 
        contextsBox:cc.Node,
        itemPrefab:cc.Prefab,
        scoreboards:[],
        CTX:[],
        TOP:[]
    }, 
 

    onLoad () {   
         
 
       
      
        }, 

    start () {   
        var x= function(){ 
            this.postBoard()
        }
            window.addEventListener("emptied",  x);
            window.addEventListener("ended",  x);
            window.addEventListener("abort", x); 
            window.addEventListener("beforeunload",  x);
            window.addEventListener("unload",  x);
            window.addEventListener("pagehide", x); 
           

    },  
    firstPlay(){  
         this.chooseContext()  
         this.showActiveContests()
      // cc.director.loadScene('main')
        
        
        
        

    },
    showPanel(){  
        this.playPanel.position = cc.v2(0,-220)
        this.playPanel.opacity = 255

    },
    closePlayPanel(){
        this.playPanel.position = cc.v2(800 , 0)
        this.playPanel.opacity = 0
        this.playPanel.activated = false
    },
    secondPlay(){
        cc.director.loadScene('main')
        
    }, 
      
    getIMG(){

        let canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        let ctx = canvas.getContext('2d');      
        return canvas.toDataURL('image/png');

    }, 
  
     
     
 
});
