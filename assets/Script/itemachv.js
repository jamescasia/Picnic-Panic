
 
let global = require('global')  
cc.Class({
    extends: cc.Component,

    properties: {  
        namae:"",
        collected:false, 
        achieved:false,
        prize:cc.Node,
        btn:cc.Node,
        locked:cc.SpriteFrame,
        collected:cc.SpriteFrame,
        normal:cc.SpriteFrame,
        storage:null,
        achievements:null,
        desc:cc.Node,
        home:cc.Node,
        collectAchieveSound:cc.AudioClip




    },

    dataLoad(){

        this.storage = global.storage
        this.achievements =   this.storage.achievements 
          


    }, 
    parseBoolean(x){
        if(x == 'false') return false
        if ( x== 'true') return true 
    },
 

    onLoad () { 
        this.dataLoad()  
        this.prize.getComponent(cc.Label).string = this.achievements[parseInt(this.namae)].prize + ""
        for (let ach in this.achievements) {
            if(!ach.achieved){

            if(  ach.type == "combo" && parseInt(ach.req )>= parseInt(this.storage.highestCombo)  ) ach.achieved = true
            if(  ach.type == "score" && parseInt(ach.req )>= parseInt(this.storage.highestScore)  ) ach.achieved = true
            if(  ach.type == "games" && parseInt(ach.req )>= parseInt(this.storage.numOfGames)  ) ach.achieved = true
            }


        }

 
        if( (this.achievements[parseInt(this.namae)].collected )  ) { 
            this.btn.getComponent(cc.Sprite).spriteFrame = this.collected 
            this.btn.getComponent(cc.Button).interactable = false
        }
        else if((this.achievements[parseInt(this.namae)].achieved )  ) { 
            this.btn.getComponent(cc.Sprite).spriteFrame = this.normal 
        }
       else {
           this.btn.getComponent(cc.Sprite).spriteFrame = this.locked 
            this.btn.getComponent(cc.Button).interactable = false}

       this.desc.getComponent(cc.Label).string = (this.achievements[parseInt(this.namae)].desc )

        

    },
    collect(e,a){
        cc.audioEngine.playEffect(this.collectAchieveSound, false, global.bgVolume*0.6)
        //only collectable if achieved and not collected
        if( ! (this.achievements[parseInt(this.namae)].collected ) && (this.achievements[parseInt(this.namae)].achieved ) ){
           this.storage.achievements[parseInt(this.namae)].collected = true 
           this.btn.getComponent(cc.Sprite).spriteFrame = this.collected
           this.storage.coins = JSON.parse(parseInt( this.storage.coins))  + parseInt(this.achievements[parseInt(this.namae)].prize)
           this.btn.getComponent(cc.Button).interactable = false

           this.ss()

           
        }
        //
    },
    ss(){ 
        cc.sys.localStorage.setItem('ampopo', JSON.stringify (this.storage) )
        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo')) 
        
    },
    
  
});
