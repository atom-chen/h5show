var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var copytask;
(function (copytask) {
    var CopytaskUiPanel = (function (_super) {
        __extends(CopytaskUiPanel, _super);
        function CopytaskUiPanel() {
            _super.call(this);
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);
            this._publicbguiRender = new UIRenderComponent;
            this.addRender(this._publicbguiRender);
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender);
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);
            this._roleRender.uiAtlas = new UIAtlas;
        }
        CopytaskUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            if (this.teamcopyUiPanel) {
                this.teamcopyUiPanel.dispose();
                this.teamcopyUiPanel = null;
            }
            if (this.resCopyTaskPanel) {
                this.resCopyTaskPanel.dispose();
                this.resCopyTaskPanel = null;
            }
            if (this.towerCopyTaskPanel) {
                this.towerCopyTaskPanel.dispose();
                this.towerCopyTaskPanel = null;
            }
            this._redPointRender.dispose();
            this._redPointRender = null;
            _super.prototype.dispose.call(this);
        };
        CopytaskUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/copytask/copytask.xml", "ui/uidata/copytask/copytask.png", function () { _this.loadConfigCom(); });
        };
        CopytaskUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        CopytaskUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.addChild(this._bgRender.getComponent("a_title"));
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);
            //this.winmidRender.applyObjData();
            this.TabAry = new Array;
            for (var i = 0; i < 3; i++) {
                var a = this.addEvntBut("a_tab" + i, this._roleRender);
                a.data = SharedDef.MODULE_INSTANCE_RES + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }
            this.UnlockUIAry = new Array;
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock1);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock2);
            this.addChild(this._roleRender.getComponent("a_line"));
            this.redui = this._redPointRender.getRedPointUI(this, 121, new Vector2D(this.TabAry[0].x + this.TabAry[0].width - 5, this.TabAry[0].y));
        };
        CopytaskUiPanel.prototype.selecttype = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            if ($value == SharedDef.MODULE_INSTANCE_RES) {
                this.showTab0pnael();
            }
            else if ($value == SharedDef.MODULE_INSTANCE_TEAM) {
                this.showTab1pnael();
            }
            else {
                this.showTab2pnael();
            }
        };
        CopytaskUiPanel.prototype.click = function (evt) {
            UIManager.popClikNameFun(evt.target.name);
            this.selecttype(evt.target.data);
        };
        CopytaskUiPanel.prototype.showTab0pnael = function () {
            if (this.teamcopyUiPanel) {
                this.teamcopyUiPanel.hide();
            }
            if (this.towerCopyTaskPanel) {
                this.towerCopyTaskPanel.hide();
            }
            if (!this.resCopyTaskPanel) {
                this.resCopyTaskPanel = new copytask.ResCopyTaskPanel();
                this.resCopyTaskPanel.setUIAtlas(this._roleRender.uiAtlas, this.winmidRender);
            }
            this.resCopyTaskPanel.show();
        };
        CopytaskUiPanel.prototype.showTab1pnael = function () {
            if (this.resCopyTaskPanel) {
                this.resCopyTaskPanel.hide();
            }
            if (this.towerCopyTaskPanel) {
                this.towerCopyTaskPanel.hide();
            }
            if (!this.teamcopyUiPanel) {
                this.teamcopyUiPanel = new copytask.TeamcopyUiPanel();
                this.teamcopyUiPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas, this.winmidRender);
            }
            this.teamcopyUiPanel.show();
        };
        CopytaskUiPanel.prototype.showTab2pnael = function () {
            if (this.teamcopyUiPanel) {
                this.teamcopyUiPanel.hide();
            }
            if (this.resCopyTaskPanel) {
                this.resCopyTaskPanel.hide();
            }
            if (!this.towerCopyTaskPanel) {
                this.towerCopyTaskPanel = new copytask.TowerCopyTaskPanel();
                this.towerCopyTaskPanel.setUIAtlas(this._roleRender.uiAtlas, this.winmidRender);
            }
            this.towerCopyTaskPanel.show();
        };
        CopytaskUiPanel.prototype.hidealltab = function () {
            if (this.teamcopyUiPanel) {
                this.teamcopyUiPanel.hide();
            }
            if (this.resCopyTaskPanel) {
                this.resCopyTaskPanel.hide();
            }
            if (this.towerCopyTaskPanel) {
                this.towerCopyTaskPanel.hide();
            }
        };
        CopytaskUiPanel.prototype.refreshRes = function () {
            if (this.resCopyTaskPanel && this.resCopyTaskPanel.hasStage) {
                this.resCopyTaskPanel.refreshRes();
            }
        };
        CopytaskUiPanel.prototype.refreshTower = function () {
            if (this.towerCopyTaskPanel && this.towerCopyTaskPanel.hasStage) {
                this.towerCopyTaskPanel.refreshSweep();
            }
        };
        CopytaskUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        CopytaskUiPanel.prototype.sysopen = function () {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].parent || this.UnlockUIAry[i].parent) {
                    this.refreshOpenLev(this.TabAry[i], this.UnlockUIAry[i]);
                }
                //红点处理
                if (i == 0) {
                    if (this.TabAry[i].parent) {
                        this.redui.y = this.TabAry[i].y;
                        this.redui.node.bindUI(this.redui);
                    }
                    else {
                        this.redui.node.unBind();
                    }
                }
            }
        };
        CopytaskUiPanel.prototype.refreshOpenLev = function ($tab, $untab) {
            var $page = $tab.data;
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_INSTANCE, $page)) {
                this.setUiListVisibleByItem([$tab], true);
                this.setUiListVisibleByItem([$untab], false);
            }
            else {
                var $tb_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_INSTANCE * 10 + $page));
                this.setUiListVisibleByItem([$tab], false);
                this.setUiListVisibleByItem([$untab], true);
                $untab.data = $tb_system_base;
            }
        };
        CopytaskUiPanel.prototype.getTabidx = function ($aryTab, $curTab) {
            return $aryTab.indexOf($curTab);
        };
        //只能默认选中第一个。如果需要设定选中哪个，则自己调整Tab顺序
        CopytaskUiPanel.prototype.show = function ($aryTab, $selTab) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            for (var i = 0; i < this.TabAry.length; i++) {
                var $idx = this.getTabidx($aryTab, Number(this.TabAry[i].data));
                if ($idx != -1) {
                    this.refreshOpenLev(this.TabAry[i], this.UnlockUIAry[i]);
                    this.UnlockUIAry[i].y = this.TabAry[i].y = $idx * 94 + 97;
                }
                else {
                    this.setUiListVisibleByItem([this.TabAry[i]], false);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                }
                //红点处理
                if (i == 0) {
                    if (this.TabAry[i].parent) {
                        this.redui.y = this.TabAry[i].y;
                        this.redui.node.bindUI(this.redui);
                    }
                    else {
                        this.redui.node.unBind();
                    }
                }
            }
            this.selecttype($selTab);
            this.resize();
        };
        CopytaskUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.hidealltab();
            ModulePageManager.hideResTittle();
        };
        CopytaskUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.HIDE_COPYTASK_EVENT));
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock1.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock2.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        };
        return CopytaskUiPanel;
    })(WindowUi);
    copytask.CopytaskUiPanel = CopytaskUiPanel;
})(copytask || (copytask = {}));
//# sourceMappingURL=CopytaskUiPanel.js.map