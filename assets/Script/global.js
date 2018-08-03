
var global_userID 
var global_userData 
var global_activeContests
 
var global = {
    
    getMoney:function()
    {
        return money;
    },
    pushKey:function(){
        var a ='abcdefghijklmnopqrstuvwxyz1234567890'
        var key =""
        for(var ctr = 0;ctr<=9;ctr++){
            key+= a[ Math.floor(Math.random()*36 )] 

        } 


        return key
    }
    }
module.exports = global;