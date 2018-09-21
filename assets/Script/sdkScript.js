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
        gameServices:null,
        signIn:false
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {  

 
    },

    start () {
        this.admobInit()
        

    },

    
    admobInit: function() { 
            //=======
        const config = new gpg.PlatformConfiguration();
        config.SetClientID('553134658181-2ulkpfaq4n91k23ibn66fkru7ap878kj.apps.googleusercontent.com');

        
        const l = 1;
        this.gameServices = null;
        this.signIn = false;
        const self = this;
        new gpg.GameServices.Builder()
            .SetOnAuthActionStarted (
                function(result) {
                    self.log('GPG on auth action start');
                }
            ).SetOnAuthActionFinished (
                function(result) {
                    self.log('GPG on auth action finished: ' + result.AuthOperation + ' ' + result.AuthStatus);
                    self.signIn = gpg.IsSuccess(result.AuthStatus);
                    self.log('GPG signed in:' + self.signIn);
                }
            ).SetOnMultiplayerInvitationEvent(
                function(result) {
                    self.log('GPG on multiplayer invitation');
                }
            ).SetLogging(gpg.LogLevel.INFO)
            .EnableSnapshots()
            .Create(
                function(gs) {
                    if (gs) {
                        self.gameServices = gs;
                        self.log('GPG game services connect');
                    } else {
                        self.log('GPG game services not connect')
                    }
                }, config);



            //====== 
    },

    cacheInterstitial: function() {
        this.gameServices.StartAuthorizationUI();
        if(cc.sys.isMobile) {
            
        

        }
        
    },

    showInterstitial: function() {
        this.gameServices.StartAuthorizationUI();
        if(cc.sys.isMobile) {       
        }
    },
    // update (dt) {},
});
