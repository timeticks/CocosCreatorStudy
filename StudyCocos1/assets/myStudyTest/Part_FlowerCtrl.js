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
var FlowerStateEnum = require("FlowerStateEnum");

cc.Class({
    extends: cc.Component,

    properties: {
        mySprite: {
            default: null,
            type: cc.Sprite
        },

        rotateSpeed: 70, 
        moveSpeed: 10,
        dir: cc.v2(0,0),
        curIsActive:true,
        curIndex:0,     //在管理器中的序号
    },

    start () {
    },


    onCollisionEnter: function (other, self) {
        if(this.node.group == "RunFlower")
        {
            // this.setFlowerDisable(other.getComponent(Part_FlowerCtrl));
            this.setFlowerDisable(this);
        }
        // else
        // {
        //     this.setFlowerDisable(self);
        // }
    },

    onCollisionStay: function (other, self) {
        //console.log('on collision stay');
    },



    setFlowerDisable(flower)
    {
        // var flower = col.node.getComponent(Part_FlowerCtrl);
        // console.debug("啊:"+col.node.toString());
        flower.curIsActive = false;
        flower.node.group  = FlowerStateEnum.DisableFlower.toString();

        //var finishedDel = cc.callFunc(function(){flower.node.enabled = false;});

        // var seq = cc.sequence(
        //     cc.scaleTo(0.5,2,2),
        //     cc.scaleTo(0.5,0.1,0.1),
        // );
        // flower.node.runAction(seq);
    }
});
