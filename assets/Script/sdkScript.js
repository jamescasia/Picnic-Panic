// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// let gpg = require("gpg.d")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () { 

 
    },

    start () {
        this.admobInit()
        

    },

    
    admobInit: function() {
        if(cc.sys.isMobile) {
            //=======
            const config = new gpg.PlatformConfiguration();
        config.SetClientID('777734739048-cdkbeieil19d6pfkavddrri5o19gk4ni.apps.googleusercontent.com');

        const l = 1;
        this.gameServices = null;
        this.signIn = false;
        const self = this;
        new gpg.GameServices.Builder()
            .SetOnAuthActionStarted (
                function(result) {
                    self.log('GPG on auth action start');
                }).SetOnAuthActionFinished (
                function(result) {
                    self.log('GPG on auth action finished: ' + result.AuthOperation + ' ' + result.AuthStatus);
                    self.signIn = gpg.IsSuccess(result.AuthStatus);
                    self.log('GPG signed in:' + self.signIn);
                })



            //======
        }
    },

    cacheInterstitial: function() {
        if(cc.sys.isMobile) {
            
        

        }
        
    },

    showInterstitial: function() {
        if(cc.sys.isMobile) {       
        }
    },
    // update (dt) {},
});
