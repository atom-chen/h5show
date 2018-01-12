var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var left;
(function (left) {
    var modelShowRender = /** @class */ (function (_super) {
        __extends(modelShowRender, _super);
        function modelShowRender() {
            return _super.call(this) || this;
        }
        modelShowRender.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = -1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        };
        return modelShowRender;
    }(UIRenderOnlyPicComponent));
    left.modelShowRender = modelShowRender;
    var LeftPanel = /** @class */ (function (_super) {
        __extends(LeftPanel, _super);
        function LeftPanel() {
            var _this = _super.call(this) || this;
            _this.layer = 100;
            _this.left = 0;
            _this.top = 0;
            _this.width = 250;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.modelPic = new modelShowRender();
            _this.addRender(_this.modelPic);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._topRender.uiAtlas.setInfo("pan/marmoset/uilist/left/left.xml", "pan/marmoset/uilist/left/left.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LeftPanel.prototype.initView = function () {
            var $ui = this.addChild(this.modelPic.getComponent("a_model_show"));
            this.modelPic.setImgUrl("ui/load/map/bigworld.jpg");
            $ui.top = 10;
            $ui.left = 10;
            left.ModelShowModel.getInstance()._bigPic = this.modelPic;
            $ui.name = "modelPic";
            $ui.addEventListener(InteractiveEvent.Down, this.addStageMoveEvets, this);
            this.showModelPic = $ui;
        };
        LeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.height = Scene_data.stageHeight;
            if (this.a_panel_bg) {
                this.a_panel_bg.width = this.width;
                this.a_panel_bg.height = this.height;
                this.a_left_line.x = this.width - 10;
                this.a_left_line.y = 0;
                this.a_left_line.height = this.height;
                this.showModelPic.width = this.width - 20;
                this.showModelPic.height = this.width - 20;
                this.a_compile_but.y = this.showModelPic.height + 20;
            }
        };
        LeftPanel.prototype.a_left_lineDown = function ($e) {
            this.a_left_line.data = new Vector2D($e.x, $e.y);
            this.lastWidth = this.width;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.a_left_lineUp, this);
        };
        LeftPanel.prototype.a_left_lineUp = function ($e) {
            this.a_left_line.data = null;
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.a_left_lineUp, this);
        };
        LeftPanel.prototype.onMoveLine = function ($e) {
            var $select = UIManager.getInstance().getObjectsUnderPoint(new Vector2D($e.x, $e.y));
            if ($select == this.a_left_line) {
                Scene_data.canvas3D.style.cursor = "e-resize";
            }
            else {
                Scene_data.canvas3D.style.cursor = "auto";
            }
            if (this.a_left_line.data) {
                var $lastV2d = this.a_left_line.data;
                this.width = this.lastWidth + ($e.x - $lastV2d.x);
                this.resize();
                prop.PropModel.getInstance().moveTop(this.width + 60);
            }
        };
        LeftPanel.prototype.addStageMoveEvets = function ($e) {
            this.lastCameRotation = new Vector2D(Scene_data.focus3D.rotationX, Scene_data.focus3D.rotationY);
            this.mouseXY = new Vector2D($e.x, $e.y);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        LeftPanel.prototype.onMove = function ($e) {
            var $n = new Vector2D($e.x - this.mouseXY.x, $e.y - this.mouseXY.y);
            Scene_data.focus3D.rotationX = this.lastCameRotation.x - $n.y;
            Scene_data.focus3D.rotationY = this.lastCameRotation.y - $n.x;
        };
        LeftPanel.prototype.onUp = function ($e) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        LeftPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.modelPic.uiAtlas = this._topRender.uiAtlas;
            this.a_compile_but = this.addEvntBut("a_compile_but", this._topRender);
            this.a_panel_bg = this.addChild(this._bottomRender.getComponent("a_panel_bg"));
            this.a_panel_bg.left = 0;
            this.a_panel_bg.top = 0;
            this.a_left_line = this.addChild(this._topRender.getComponent("a_left_line"));
            this.a_left_line.addEventListener(InteractiveEvent.Down, this.a_left_lineDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMoveLine, this);
            this.initView();
            this.resize();
        };
        LeftPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_compile_but:
                    ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                    break;
                default:
                    break;
            }
        };
        return LeftPanel;
    }(UIPanel));
    left.LeftPanel = LeftPanel;
})(left || (left = {}));
//# sourceMappingURL=LeftPanel.js.map