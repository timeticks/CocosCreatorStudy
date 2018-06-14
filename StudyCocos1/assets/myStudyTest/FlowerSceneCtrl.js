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
var Window_Result = require("Window_Result");
var tUtils = require("TUtils");
var common = require("CommonData");

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
        btnBg: {
            default: null,
            type: cc.Button
        },
        scoreText: {                //分数文本
        	default: null,
        	type: cc.Label
        },
        remainFlowerText: {        //剩余花朵文本
            default: null,
            type: cc.Label
        },
        flowerList: {       //花朵列表
            default: [],
            type: [Part_FlowerCtrl],
        },
        window_Result:{
            default: null,
            type: Window_Result
        },

        screenPos:[],
        curTime:0,          //此局总时间
        curWaitTime: 0,     //距离上次生成monsterFlower后的等待时间
        curFlowerNum:0,
        curScore:0,         //当前分数
        curRemainFlower :0,
    },

    // onLoad () {},

    start () {
        // this.schedule(function() {
        //     this.createMonsterFlower();
        // },1);

        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;  //调试时显示碰撞盒大小

        this.addRemainFlower(10);

        //屏幕范围
        this.screenPos[0] = this.btnBg.node.position.x - this.btnBg.node.getContentSize().width/2;
        this.screenPos[1] = this.btnBg.node.position.x + this.btnBg.node.getContentSize().width/2;
        this.screenPos[2] = this.btnBg.node.position.y - this.btnBg.node.getContentSize().height/2;
        this.screenPos[3] = this.btnBg.node.position.y + this.btnBg.node.getContentSize().height/2;
        console.debug("---->"+this.screenPos.toString());

        //var canvas = cc.find('Canvas');
        //canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "FlowerSceneCtrl";//这个是代码文件名
        clickEventHandler.handler = "btnEvt_ClickBg";
        this.btnBg.clickEvents.push(clickEventHandler);
    },

     update (dt)
     {
         this.curTime+=dt;
         this.curWaitTime += dt;
         var rotateSpeed = 70;
         var mvoeSpeed = 200;
         for (var i=0;i<this.flowerList.length;i++)
         {
             var curFlower = this.flowerList[i];
             curFlower.node.rotation = curFlower.node.rotation + rotateSpeed*dt;
             if(curFlower.node.group!=common.EnumMonsterFlower)
                 continue;

             curFlower.node.x += curFlower.dir.x*mvoeSpeed*dt;
             curFlower.node.y += curFlower.dir.y*mvoeSpeed*dt;
             //cc.view.getVisibleSize().width

             //如果在屏幕外，方向置反
             if(this.screenPos[0] - curFlower.node.x>=-20 || this.screenPos[1]-curFlower.node.x<=20)
             {
                 if(curFlower.node.x * this.flowerList[i].dir.x >0)
                    this.flowerList[i].dir.x = -this.flowerList[i].dir.x;
             }
             if(this.screenPos[2] - curFlower.node.y>=-20 || this.screenPos[3]-curFlower.node.y<=20)
             {
                 if(curFlower.node.y * this.flowerList[i].dir.y >0)
                    this.flowerList[i].dir.y = -this.flowerList[i].dir.y;
             }
         }


         if(this.curFlowerNum<20)
         {
            this.curWaitTime = 0;
            this.createMonsterFlower();

         }
     },

    //是否在屏幕里
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
        var flower = null;
        for(var i=0;i<this.flowerList.length;i++)
        {
            if(!this.flowerList[i].node.active)
            {
                flower = this.flowerList[i];
            }
        }
        if(flower==null)
        {
            var flowerObj = cc.instantiate(this.flowerTemplate);
            this.flowerItemRoot.addChild(flowerObj);
            flower =flowerObj.getComponent(Part_FlowerCtrl);
            var curIndex = this.flowerList.length;
            flower.curIndex = curIndex;
            this.flowerList[curIndex]=flower;
        }

        flower.node.setScale(1,1);
        flower.node.setPosition(posX,posY,0);
        flower.node.active = true;

        var dirX = tUtils.randomRange(0.1,0.9);
        var dirY = Math.sqrt(1-dirX*dirX);
        flower.dir.x = dirX*(Math.random()>0.5?1:-1);
        flower.dir.y = dirY*(Math.random()>0.5?1:-1);

        flower.node.group = common.EnumMonsterFlower;
        flower.node.color = common.ColorDefaultFlower;
        flower.init(this);
        this.curFlowerNum++;

        // console.debug("当前个数:"+this.curFlowerNum+" 长度:"+this.flowerList.length);
        return flower;
    },

    //创建怪物花朵
    createMonsterFlower:function()
    {
        var x = tUtils.randomRange(-500,500);
        var y = tUtils.randomRange(-500,500);
        var flower = this.createFlower(x , y);
    },

    addScore:function(addNum)
    {
        this.curScore+=addNum;
        this.scoreText.string = "当前分数："+this.curScore.toString();
        if(this.curRemainFlower<=0)
        {
            this.window_Result.openWindow(this.curScore);
        }
    },

    addRemainFlower: function (addNum)
    {
        this.curRemainFlower += addNum;
        this.remainFlowerText.string = "剩余花朵数：" + this.curRemainFlower;
    },

    //点击创建玩家花朵
    btnEvt_ClickBg: function (event , customEventData) {
        var pos = this.flowerItemRoot.convertToNodeSpace(event.touch.getLocation());
        console.debug("======>"+pos.x+" "+pos.y);
        var flower = this.createFlower(pos.x , pos.y);
        flower.node.group = common.EnumPlayerFlower;
        flower.node.color = common.ColorBlueFlower;
        flower.setFlowerDisable(flower);

        this.addRemainFlower(-1);
    },


});
