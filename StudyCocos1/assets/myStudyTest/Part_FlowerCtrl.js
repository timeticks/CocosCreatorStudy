// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Part_FlowerCtrl = require("Part_FlowerCtrl");
var common = require("CommonData");

cc.Class({
    extends: cc.Component,

    properties:  () => ({
        mySprite: {
            default: null,
            type: cc.Sprite
        },
        sceneCtrl:  require("FlowerSceneCtrl"),
        rotateSpeed: 70, 
        moveSpeed: 10,
        dir: cc.v2(0,0),
        curIndex:0,     //在管理器中的序号
    }),

    // properties2:()=>({
    //     sceneCtrl: {
    //         default: null,
    //         type: require("FlowerSceneCtrl")
    //     },
    // }),

    init : function(sceneCtrl)
    {
        this.sceneCtrl = sceneCtrl;
    },


    onCollisionEnter: function (other, self) {
        if(this.node.group == common.EnumMonsterFlower)
        {
            this.setMonsterFlowerDisable(this);
        }
        // else
        // {
        //     this.setFlowerDisable(self);
        // }
    },

    // onCollisionStay: function (other, self) {
    //     //console.log('on collision stay');
    // },


    setMonsterFlowerDisable(flower)
    {
        this.setFlowerDisable(flower);
    },

    //开始播放花朵消失动画
    setFlowerDisable(flower)
    {
        flower.node.group  = common.EnumPlayerFlower;

        var finishedDel = cc.callFunc(function()
        {
            flower.sceneCtrl.addScore(1); //所有花消失，都加分数
            flower.sceneCtrl.curFlowerNum --;
            flower.node.active = false;
        });

        var seq = cc.sequence(
            cc.scaleTo(2,5,5),
            cc.scaleTo(2,0.1,0.1),
            finishedDel,
        );
        flower.node.runAction(seq);


    },


});
