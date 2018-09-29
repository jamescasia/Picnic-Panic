 
var global = {
    bgOn:true,
    wentShop:"main",
    musicStarted : false, 
    bgVolume:0.5,
    sfxVolume:0.5,
    numOfGames:0,
    usingPart:null,
    storage:null,
    
    link : 'http://www.freesfx.co.uk',

    
    getMoney:function()
    {
        return money;
    },
    pushKey:function(){
        var a ='abcd78efghij6klmn12opqr90stuv3w4xyz5'
        var key =""
        for(var ctr = 0;ctr<=9;ctr++){
            key+= a[ Math.floor(Math.random()*36 )] 

        } 


        return key
    }
}
// cc.loader.loadRes("./music/dream_shiner.mp3", cc.AudioClip, function (err, clip) {
//     var audioID = cc.audioEngine.play(clip, false, 0.5);
// });
    
module.exports = global;