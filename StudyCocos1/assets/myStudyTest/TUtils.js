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

    /**
     * 获取随机值
     * @param min 包含
     * @param max 排除
     */
    randomRange:function(min , max)
    {
        return min + Math.random()*(max-min);
    },

    /**
     * 插值计算 返回值肯定在[min,max]中
     * @param min
     * @param max
     * @param lerpValue 0-1
     */
    lerp:function(min , max , lerpValue)
    {
       if(lerpValue<0)lerpValue=0;
       if(lerpValue>1)lerpValue=1;
        return min+lerpValue*(max-min);
    },

    /**
     * 插值计算 如果lerpValue不在0-1中，返回值则可能不在[min,max]中
     * @param min
     * @param max
     * @param lerpValue 无限制
     */
    lerpUnclamp:function(min , max , lerpValue)
    {
        return min+lerpValue*(max-min);
    },


};

