var OutLineMouseEventModel = /** @class */ (function () {
    function OutLineMouseEventModel() {
        this.lastRotationY = 0;
        this.lastRotationX = 0;
        this._lastMousePos = new Vector2D();
    }
    OutLineMouseEventModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new OutLineMouseEventModel();
        }
        return this._instance;
    };
    OutLineMouseEventModel.prototype.initSceneFocueEvent = function () {
        var _this = this;
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
        document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
    };
    OutLineMouseEventModel.prototype.onMouseWheel = function ($evt) {
        Scene_data.cam3D.distance += $evt.wheelDelta / 10;
    };
    OutLineMouseEventModel.prototype.onMouseMove = function ($evt) {
        if (this._isMouseDown) {
            var $addx = $evt.x - this._lastMousePos.x;
            Scene_data.focus3D.rotationY = this.lastRotationY - $addx;
            var $addy = $evt.y - this._lastMousePos.y;
            Scene_data.focus3D.rotationX = this.lastRotationX - $addy;
        }
    };
    OutLineMouseEventModel.prototype.onMouseDown = function ($evt) {
        this._lastMousePos.x = $evt.x;
        this._lastMousePos.y = $evt.y;
        this.lastRotationY = Scene_data.focus3D.rotationY;
        this.lastRotationX = Scene_data.focus3D.rotationX;
        this._isMouseDown = true;
    };
    OutLineMouseEventModel.prototype.onMouseUp = function ($evt) {
        this._isMouseDown = false;
    };
    return OutLineMouseEventModel;
}());
//# sourceMappingURL=OutLineMouseEventModel.js.map