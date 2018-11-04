 
let global = {
    bgOn:true,
    wentShop:"main",
    musicStarted : false, 
    bgVolume:0,
    sfxVolume:0,
    numOfGames:0,
    usingPart:null,
    storage:null,
    
    link : 'http://www.freesfx.co.uk',

    
    getMoney:function()
    {
        return money;
    },
    pushKey:function(){
        let a ='abcd78efghij6klmn12opqr90stuv3w4xyz5'
        let key =""
        for(let ctr = 0;ctr<=9;ctr++){
            key+= a[ Math.floor(Math.random()*36 )] 

        } 


        return key
    }
}
// cc.loader.loadRes("./music/dream_shiner.mp3", cc.AudioClip, function (err, clip) {
//     let audioID = cc.audioEngine.play(clip, false, 0.5);
// });
    
module.exports = global;