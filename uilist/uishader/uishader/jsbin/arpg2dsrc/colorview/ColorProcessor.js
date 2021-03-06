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
var colorview;
(function (colorview) {
    var ColorEvent = /** @class */ (function (_super) {
        __extends(ColorEvent, _super);
        function ColorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorEvent.SHOW_COLOR_PANEL = "SHOW_COLOR_PANEL"; //显示面板
        ColorEvent.HIDE_COLOR_PANEL = "HIDE_COLOR_PANEL"; //显示面板
        return ColorEvent;
    }(BaseEvent));
    colorview.ColorEvent = ColorEvent;
    var ColorModule = /** @class */ (function (_super) {
        __extends(ColorModule, _super);
        function ColorModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorModule.prototype.getModuleName = function () {
            return "ColorModule";
        };
        ColorModule.prototype.listProcessors = function () {
            return [new ColorProcessor()];
        };
        return ColorModule;
    }(Module));
    colorview.ColorModule = ColorModule;
    var ColorProcessor = /** @class */ (function (_super) {
        __extends(ColorProcessor, _super);
        function ColorProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorProcessor.prototype.getName = function () {
            return "ColorProcessor";
        };
        ColorProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ColorEvent) {
                var $colorEvent = $event;
                if ($colorEvent.type == ColorEvent.SHOW_COLOR_PANEL) {
                    this.showColorPanel($colorEvent.v3dColor, $colorEvent.bfun);
                }
                if ($colorEvent.type == ColorEvent.HIDE_COLOR_PANEL) {
                    this.hideColorPanel();
                }
            }
        };
        ColorProcessor.prototype.hideColorPanel = function () {
            if (this.colorPanel) {
                UIManager.getInstance().removeUIContainer(this.colorPanel);
            }
        };
        ColorProcessor.prototype.showColorPanel = function ($v3d, $bfun) {
            var _this = this;
            if (!this.colorPanel) {
                this.colorPanel = new colorview.ColorPanel;
            }
            this.colorPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.colorPanel);
                _this.colorPanel.initColor($v3d, $bfun);
            });
        };
        ColorProcessor.prototype.listenModuleEvents = function () {
            return [
                new ColorEvent(ColorEvent.SHOW_COLOR_PANEL),
                new ColorEvent(ColorEvent.HIDE_COLOR_PANEL),
            ];
        };
        return ColorProcessor;
    }(BaseProcessor));
    colorview.ColorProcessor = ColorProcessor;
})(colorview || (colorview = {}));
//# sourceMappingURL=ColorProcessor.js.map