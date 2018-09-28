 

cc.Class({
    extends: cc.Component,

    properties: {
        god:cc.Node,
        frenzyLevel:0,
        timeLevel:0,
        comboLevel:0,
        time:cc.Node,
        frenzy:cc.Node,
        combo:cc.Node,
        bar:cc.Prefab
         
    },

    // LIFE-CYCLE CALLBACKS:

    onLoads () {

        this.frenzyLevel = this.god.getComponent('home').passiveFrenzyLvl
        this.timeLevel = this.god.getComponent('home').passiveTimeLvl
        this.comboLevel = this.god.getComponent('home').passiveComboLvl

        this.addBar(this.time.getChildByName('level'), this.timeLevel, 0, -140  )
        this.addBar(this.combo.getChildByName('level'), this.comboLevel, 0, -140  )
        this.addBar(this.frenzy.getChildByName('level'), this.frenzyLevel, 0, -30 )




    },
    addBar(parent,lvl,ctr,pos){
        
        var rab = cc.instantiate(this.bar)
        rab.position =cc.v2(pos , 0)
        parent.addChild(rab)

        if(ctr< lvl-1) this.addBar(parent,lvl,ctr+1,pos+32)



    },
 
});