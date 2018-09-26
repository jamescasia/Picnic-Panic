

cc.Class({
    extends: cc.Component,

    properties: {  
        _name:"",
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




    },

    dataLoad(){

        this.storage =  JSON.parse(cc.sys.localStorage.getItem('ampopo'))  
        this.achievements = (  this.storage.achievements) 
         
        this.ss() 


    }, 
    parseBoolean(x){
        if(x == 'false') return false
        if ( x== 'true') return true 
    },
 

    onLoad () { 
        this.dataLoad()  
        this.prize.getComponent(cc.Label).string = this.achievements[parseInt(this._name)].prize + ""
        for (var ach in this.achievements) {
            if(!ach.achieved){

            if(  ach.type == "combo" && parseInt(ach.req )>= parseInt(this.storage.highestCombo)  ) ach.achieved = true
            if(  ach.type == "score" && parseInt(ach.req )>= parseInt(this.storage.highestScore)  ) ach.achieved = true
            if(  ach.type == "games" && parseInt(ach.req )>= parseInt(this.storage.numOfGames)  ) ach.achieved = true
            }


        }

 
        if( (this.achievements[parseInt(this._name)].collected )  ) { 
            this.btn.getComponent(cc.Sprite).spriteFrame = this.collected 
            this.btn.getComponent(cc.Button).interactable = false
        }
        else if((this.achievements[parseInt(this._name)].achieved )  ) { 
            this.btn.getComponent(cc.Sprite).spriteFrame = this.normal 
        }
       else {
           this.btn.getComponent(cc.Sprite).spriteFrame = this.locked 
            this.btn.getComponent(cc.Button).interactable = false}

       this.desc.getComponent(cc.Label).string = (this.achievements[parseInt(this._name)].desc )

        

    },
    collect(e,a){
        //only collectable if achieved and not collected
        if( ! (this.achievements[parseInt(this._name)].collected ) && (this.achievements[parseInt(this._name)].achieved ) ){
           this.storage.achievements[parseInt(this._name)].collected = true 
           this.btn.getComponent(cc.Sprite).spriteFrame = this.collected
           this.storage.coins = JSON.parse(parseInt( this.storage.coins))  + parseInt(this.achievements[parseInt(this._name)].prize)
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
