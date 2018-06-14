// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        btnPlay: {
            default: null,
            type: cc.Button
        },
        btnShare: {
            default: null,
            type: cc.Button
        },
        endScoreLabel: {
            default: null,
            type: cc.Label
        },



    },

    openWindow : function(score)
    {
        this.endScoreLabel.string = "最后得分："+score;
        this.node.active = true;

        //var clickEventHandler = new cc.Component.EventHandler();
        //clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        //clickEventHandler.component = "Window_Result";//这个是代码文件名
        //clickEventHandler.handler = "btnEvt_PlayAgain";
        //clickEventHandler.customEventData = "";
        ////这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        //this.btnPlay.clickEvents.push(clickEventHandler);

        this.btnPlay.node.on('click', this.btnEvt_PlayAgain, this);
        this.btnShare.node.on('click', this.btnEvt_Share, this);//在事件回调里面无法 获得当前点击按钮的屏幕坐标点。

    },

    btnEvt_PlayAgain: function (event) {
        //在事件回调里面无法 获得当前点击按钮的屏幕坐标点。
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
        console.debug("再次开始");
    },

    btnEvt_Share: function (event) {
        console.debug("分享");
    },


});
