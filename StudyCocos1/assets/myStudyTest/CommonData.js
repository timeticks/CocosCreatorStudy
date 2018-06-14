// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
module.exports = {
    EnumPlayerFlower : "PlayerFlower",   //玩家点击生成的花朵
    EnumMonsterFlower : "MonsterFlower",      //自动生成的花朵
    EnumDisableFlower : "DisableFlower",  //禁用的花朵

    ColorDefaultFlower: new cc.Color(255,255,255,255),   //默认花朵颜色
    ColorBlueFlower: new cc.Color(80,255,248,255),      //玩家花朵颜色
    ColorGoldFlower: new cc.Color(255,255,0,255),      //放大花朵颜色

};