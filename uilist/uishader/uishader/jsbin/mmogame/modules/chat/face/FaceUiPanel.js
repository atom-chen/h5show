var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var faceui;
(function (faceui) {
    var FaceUiPanel = (function (_super) {
        __extends(FaceUiPanel, _super);
        function FaceUiPanel() {
            _super.call(this);
            this.width = 450;
            this.height = 280;
            this.bottom = 0;
            this.left = 0;
            this._bootomRender = new UIRenderComponent();
            this.addRender(this._bootomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._faceRender = new UIRenderComponent();
            this.addRender(this._faceRender);
            this._midRender.uiAtlas = new UIAtlas;
        }
        FaceUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/chat/face/face.xml", "ui/uidata/chat/face/face.png", function () { _this.loadConfigCom(); });
        };
        FaceUiPanel.prototype.setSizeForPanelUi = function ($ui, $uiName) {
            var temp = this._midRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        };
        FaceUiPanel.prototype.loadConfigCom = function () {
            this._bootomRender.uiAtlas = GameData.publicbgUiAtlas;
            this._faceRender.uiAtlas = this._midRender.uiAtlas;
            this.a_bg = this.addEvntBut("a_bg", this._midRender);
            var pos = new Vector2D(30, 20);
            for (var i = 0; i < 4 * 4; i++) {
                var $ui = this.addEvntBut("a_face_icon", this._faceRender);
                $ui.x = i % 6 * 68 + pos.x;
                $ui.y = Math.floor(i / 6) * 58 + pos.y;
                $ui.width = 50;
                $ui.height = 50;
                $ui.goToAndStop(i);
                $ui.data = i;
                this.drawFaceIconToCtx($ui, i);
            }
            this.applyLoadComplete();
        };
        FaceUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                default:
                    if (evt.target.data) {
                        this.close();
                        this.selectFaceType(evt.target.data);
                    }
                    break;
            }
        };
        FaceUiPanel.prototype.selectFaceType = function (value) {
            this.close();
            //  var $str: string = Chat.FACE_TYPE.faceItem[value]
            var $str = UIData.faceItem[value];
            if (this.bfun) {
                this.bfun($str);
            }
            //  ChatHtmlInput.chatHtmlInput.value += $str;
        };
        FaceUiPanel.prototype.close = function () {
            ModuleEventManager.dispatchEvent(new faceui.FaceUiEvent(faceui.FaceUiEvent.HIDE_FACE_UI_PANEL));
        };
        FaceUiPanel.prototype.drawFaceIconToCtx = function ($ui, $id) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            UiDraw.cxtDrawImg($ctx, "F_FACE_" + ($id + 1), new Rectangle(0, 0, $toRect.width, $toRect.height), UIData.publicUi);
            $ui.drawToCtx(this._midRender.uiAtlas, $ctx);
        };
        return FaceUiPanel;
    })(UIConatiner);
    faceui.FaceUiPanel = FaceUiPanel;
})(faceui || (faceui = {}));
//# sourceMappingURL=FaceUiPanel.js.map