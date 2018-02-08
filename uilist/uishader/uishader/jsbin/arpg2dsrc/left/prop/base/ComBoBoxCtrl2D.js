var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var prop;
(function (prop) {
    var ComBoBoxCtrl2D = (function (_super) {
        __extends(ComBoBoxCtrl2D, _super);
        function ComBoBoxCtrl2D() {
            _super.apply(this, arguments);
        }
        ComBoBoxCtrl2D.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI();
            this.comboBoxUi = new prop.ComboBoxUi();
            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this);
            this.height = 20;
        };
        ComBoBoxCtrl2D.prototype.destory = function () {
            this.textLabelUI.destory();
            this.comboBoxUi.destory();
        };
        Object.defineProperty(ComBoBoxCtrl2D.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.comboxListTxt = this._data;
            },
            enumerable: true,
            configurable: true
        });
        ComBoBoxCtrl2D.prototype.comboBoxUiDown = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new materialui.RightMenuEvent(materialui.RightMenuEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.x, this.comboBoxUi.y + 20);
            $rightMenuEvet.comboxData = this.data;
            $rightMenuEvet.comboxFun = function (value) { _this.selectFun(value); };
            ModuleEventManager.dispatchEvent($rightMenuEvet);
            console.log(this.data);
            //  this.target[this.FunKey] = this.target[this.FunKey] + Number($evt.data)
            //this.refreshViewValue();
        };
        ComBoBoxCtrl2D.prototype.selectFun = function (value) {
            console.log("selectFun", value);
            this.target[this.FunKey] = value;
            this.refreshViewValue();
        };
        ComBoBoxCtrl2D.prototype.refreshViewValue = function () {
            if (this.FunKey) {
                var $i = this.target[this.FunKey];
                console.log(this.comboxListTxt[$i].name);
                this.comboBoxUi.text = this.comboxListTxt[$i].name;
            }
        };
        Object.defineProperty(ComBoBoxCtrl2D.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.comboBoxUi.x = this._x + 75;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComBoBoxCtrl2D.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.comboBoxUi.y = this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComBoBoxCtrl2D.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
                this.textLabelUI.label = value;
            },
            enumerable: true,
            configurable: true
        });
        return ComBoBoxCtrl2D;
    })(prop.BaseReflComponent);
    prop.ComBoBoxCtrl2D = ComBoBoxCtrl2D;
})(prop || (prop = {}));
//# sourceMappingURL=ComBoBoxCtrl2D.js.map