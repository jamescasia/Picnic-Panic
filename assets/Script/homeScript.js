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
    switchCntxt(){
        FBInstant.context
  .switchAsync('2019607021444886')
  .then(function() { 
    // 1234567890
  });

      //  2019607021444886    
    },
 

    onLoad () {   
        this.Init()
         
      //this.switchCntxt()
      //this.chooseContext()  
      //this.setScoreBoardCntxtfl()  
      //  this.getConnectedPlayers()
      //this.saveData()  
     //  console.log('current player' , FBInstant.player.getID())
 
       
      
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
    postBoard(){ //worked
        if (typeof FBInstant === 'undefined') return; 
        FBInstant.updateAsync({
            action: 'LEADERBOARD',
            name: 'cntxtLdrbrd.' + FBInstant.context.getID()
          })
            .then(() => console.log())
            .catch(error => console.error(error));
    },
    firstPlay(){ 
        this.chooseContext()    
        
        
        

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
//'cntxtLdrbrd.'+FBInstant.context.getID()
//'cntxtLdrbrd.2019607021444886'
    
    
     onShare() {  
        if (typeof FBInstant === 'undefined') return;
        var t  = this
         
        FBInstant.shareAsync({
            intent: 'CHALLENGE',
            image:   this.getIMG(), 
            text:  FBInstant.player.getName()  +' challenges you into a Picnic Shokugeki!',
            data: {myReplayData: FBInstant.context.getID()},
        }).then(() => {
           
                // continue with the game.
        });
    },
    
    getIMG(){

        let canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        let ctx = canvas.getContext('2d');      
        return canvas.toDataURL('image/png');

    }, 
    chooseContext(){//you can't call two shit or this.ranking value only accesible insuide retrieveScoreBoard func
        if (typeof FBInstant === 'undefined') return;
        var t = this
        if(FBInstant.context.getID()!= null)return

        FBInstant.context
            .chooseAsync({ 
              })
            .then(function() {   
                
                t.showPanel() 
                
                
 
  });
    
    },
     
    
     

   Init(){ 
        if (typeof firebase === 'undefined'||typeof FBInstant === 'undefined') return; 
        
        //Saving name, image, playerID, to ldrbrd. gotta do this every context change, not necessarily on load.   
        var userId =FBInstant.player.getID()
        global.global_userID = userId 
        FBInstant.getLeaderboardAsync('cntxtLdrbrd.'+FBInstant.context.getID())
                        .then(leaderboard => {    leaderboard.setScoreAsync(cc.random0To1()); }) 
                        .catch(error => console.error(error));
        var t = this
        firebase.database().ref('/users/'+userId).on("value",function(snapshot ){
            if(!snapshot.exists() ) {
                firebase.database().ref('/users/'+userId).set({
                    activeContests:{
                        pushID:'ctxID'
                    },
                    finishedContests:{
                         contextID:{
                             timeStart:'timestamp',
                             timeEnd:'timeEnd',
                             timeLeft:'timestamp',
                             ongoing:false,
                             scores:{
                                 userID:23
                             }
                         },

                    },
                    name: FBInstant.player.getName()},function(){console.log('new user is initialized')}) 
                    
   
            }
            else {
                global.global_userData = snapshot 
                t.ialize(snapshot) 
            }
        });



   },
   ialize(s){ 
       var t =this
       firebase.database().ref('/activeContests/' ).on("value",function(snapshot ){
        global.global_activeContests = snapshot
    
    s.child('activeContests').forEach(function(ctxID,index ){  
           // console.log('each ', ctxID.val() , 'blogo',global.global_activeContests)
             
                if( global.global_activeContests.val()[ctxID.val()]== undefined) console.log('D.N.E!')
                else {
                    t.retrieveLeaderboard(global.global_activeContests.child(ctxID.val() ),ctxID,index) 
                } 


        }) 
    })




        
   },

   
   //snapshot, referece of the contest in global activeGames , ctxId = context
   retrieveLeaderboard(snapshot,ctxID,index){
       console.log('eacchtx', ctxID.val())
       var t = this 
        var playerIDs = []//the players in each contest. the plan is to unify active contests and leaderboard
        var playerScores = []

        if(snapshot.child('ongoing').val() == true){
            snapshot.child('scores').forEach(function(vals){
                playerIDs.push( (vals.key))
                playerScores.push(vals.val())
               // console.log(playerIDs, playerScores)
              

             
            })

        
        }//get entries   
        ( this.ldrbrdAsync(ctxID,index,playerIDs,playerScores))
   },
   ldrbrdAsync(ctxID,index,playerIDs,playerScores){
       var t = this
    FBInstant.getLeaderboardAsync('cntxtLdrbrd.'+ parseInt(ctxID.val() ))
    .then(leaderboard => leaderboard.getEntriesAsync())
    .then(entries => {
        console.log('wtf',index)
        if(entries == [] ) return  
        var toppers = [] 
        for(var i=0;i<entries.length ;i++){ 
            if(  playerIDs.includes( (entries[i].getPlayer().getID()) )   ){ 
                toppers.push([entries[i].getPlayer(),playerScores[playerIDs.indexOf( (entries[i].getPlayer().getID()) )] ])  
            } 
        } 
        t.CTX.push(ctxID.val())
        t.TOP.push(toppers) 
        t.postLeaderBoard(ctxID.val())
        t.showActiveContests() 
}).catch(error => console.error(error));
   },
   showFinishedContestPrompt(){

   },
   postLeaderBoard(context){
       //toppers = [   [{player details} , score  ] , [{player details} , score  ] ]
      
       //this.scoreboards.context
        //first get toppers thru this.scoreboards.context
        //

        var toppers = this.TOP[this.CTX.indexOf(context)] 
        let lstring = ''
        for(var i=0; i<toppers.length;i++){
        lstring+= i+1+'. '+ toppers[i][0].getName()+' '+ toppers[i][1] +'\n'
        } 
        this.leaderboard.getComponent(cc.Label).string = lstring


   },
   showActiveContests(){  
       var t = this
        this.TOP.forEach(function(topper){
            var people = [] 
            var ctr = 0 
            var pos = -200
            for(var a = 0 ; a<topper.length ;a++){ 
               if(topper[a][0].getID()!=FBInstant.player.getID()){
                    people.push(topper[a][0])
                    ctr+=1 
                }
                if(ctr ==3) break

                var item = cc.instantiate( t.itemPrefab); 
                t.contextsBox.addChild(item);
                item.position = cc.v2(0 , pos)
              //  console.log('cotnextes' , t.CTX)
                item.getComponent('ldrbrdItem').onSummon(t.CTX[t.TOP.indexOf(topper)] ,people )
                pos-=90
            }
            
 
       })

   },
 
});
