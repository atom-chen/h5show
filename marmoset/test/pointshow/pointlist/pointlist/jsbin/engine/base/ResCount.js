var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResCount = (function (_super) {
    __extends(ResCount, _super);
    function ResCount() {
        _super.apply(this, arguments);
        this._useNum = 0;
        this.idleTime = 0;
    }
    Object.defineProperty(ResCount.prototype, "useNum", {
        get: function () {
            return this._useNum;
        },
        set: function (n) {
            this._useNum = n;
            if (this._useNum == 0) {
                this.idleTime = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    ResCount.prototype.clearUseNum = function () {
        this._useNum--;
        if (this._useNum <= 0) {
            this.idleTime = ResCount.GCTime;
        }
    };
    ResCount.GCTime = 1000000;
    return ResCount;
})(GC);
//# sourceMappingURL=ResCount.js.map