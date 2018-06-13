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
        flowerTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        flowerItemRoot: {   //花朵的父节点
        	default: null,
        	type: cc.Node
        },
        bg: {
            default: null,
            type: cc.Sprite
        },
        scoreText: {        //分数文本
        	default: null,
        	type: cc.Label
        },
        flowerList: {       //花朵列表
            default: [],
            type: [Part_FlowerCtrl],
        },

        screenPos:[],
        curTime: 0,
        curFlowerNum:0,
    },

    // onLoad () {},

    start () {
        this.createFlower(0 , 0);
        this.createFlower(110 , 0);
        this.createFlower(220 , 0);
        this.createFlower(330 , 0);
        this.schedule(function() {
            //this.createFlower(0 , this.curFlowerNum*50);
        },1);

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;  //调试时显示碰撞盒大小

        //屏幕范围
        this.screenPos[0] = this.bg.node.position.x - this.bg.node.getContentSize().width/2;
        this.screenPos[1] = this.bg.node.position.x + this.bg.node.getContentSize().width/2;
        this.screenPos[2] = this.bg.node.position.y - this.bg.node.getContentSize().height/2;
        this.screenPos[3] = this.bg.node.position.y + this.bg.node.getContentSize().height/2;
        console.debug("---->"+this.screenPos.toString());

        var canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    },

     update (dt)
     {
         var rotateSpeed = 70;
         var mvoeSpeed = 870;
         for (var i=0;i<this.flowerList.length;i++)
         {
             var curFlower = this.flowerList[i];
             if(!curFlower.curIsActive)
                 continue;
             curFlower.node.rotation = curFlower.node.rotation + rotateSpeed*dt;
             curFlower.node.x += curFlower.dir.x*mvoeSpeed*dt;
             curFlower.node.y += curFlower.dir.y*mvoeSpeed*dt;
             //cc.view.getVisibleSize().width

             //如果在屏幕外，方向置反
             if(this.screenPos[0] - curFlower.node.x>=-20 || this.screenPos[1]-curFlower.node.x<=20)
                 this.flowerList[i].dir.x = -this.flowerList[i].dir.x;
             if(this.screenPos[2] - curFlower.node.y>=-20 || this.screenPos[3]-curFlower.node.y<=20)
                 this.flowerList[i].dir.y = -this.flowerList[i].dir.y;
         }
     },

    isInScreen:function(node)
    {
        if(node.x<=this.screenPos[0] || node.x>=this.screenPos[1])
            return false;
        if(node.y<=this.screenPos[2] || node.y>=this.screenPos[3])
            return false;
        return true;
    },

    //创建花朵
    createFlower:function(posX , posY)
    {
        var flower = cc.instantiate(this.flowerTemplate);
        flower.setScale(1,1);
        flower.setPosition(posX,posY,0);
        flower.active = true;
        this.flowerItemRoot.addChild(flower);
        var curIndex = this.flowerList.length;
        this.flowerList[curIndex]=flower.getComponent(Part_FlowerCtrl);
        this.flowerList[curIndex].dir = cc.v2(Math.random()*2-1,Math.random()*2-1);
        this.flowerList[curIndex].curIndex = this.curFlowerNum;
        this.flowerList[curIndex].node.group = FlowerStateEnum.RunFlower.toString();

        this.curFlowerNum++;
        return this.flowerList[curIndex];
    },

    onTouchBegan: function (event) {
        var pos = this.flowerItemRoot.convertToNodeSpace(event.touch.getLocation());
        console.debug("======>"+pos.x+" "+pos.y);
        var flower = this.createFlower(pos.x , pos.y);
        flower.node.group = FlowerStateEnum.PlayerFlower.toString();
        flower.node.color = cc.Color.RED;
    },


});
