cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        btnBg: cc.Sprite,
        btn: cc.Button
    },

    init (menu) {
        this.index = -1;
        this.menu = menu;
    },

    invoke: function () {
        this.menu.invoke(this.index)
    },

    updateItem (idx, y, name) {
        this.index = idx;
        this.node.y = y;
        this.node.x = 100;
        this.label.string = name;
        this.btnBg.enabled = true;
        this.btn.interactable = true;
    }
});
