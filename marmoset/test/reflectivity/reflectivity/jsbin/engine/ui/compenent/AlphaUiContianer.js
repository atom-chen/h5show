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
var AlphaUIShader = /** @class */ (function (_super) {
    __extends(AlphaUIShader, _super);
    function AlphaUIShader() {
        return _super.call(this) || this;
    }
    AlphaUIShader.prototype.binLocation = function ($context) {
        $context.bindAttribLocation(this.program, 0, "v3Pos");
        $context.bindAttribLocation(this.program, 1, "v2uv");
    };
    AlphaUIShader.prototype.getVertexShaderString = function () {
        var $str = "attribute vec3 v3Pos;" +
            "attribute vec3 v2uv;" +
            "uniform vec4 ui[40];" +
            "uniform vec4 ui2[40];" +
            "uniform float alpha[40];" +
            "varying vec2 v_texCoord;" +
            "varying float v_alpha;" +
            "void main(void)" +
            "{" +
            "   vec4 data = ui2[int(v2uv.z)];" +
            "   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
            "   v_alpha = alpha[int(v2uv.z)];" +
            "   data = ui[int(v2uv.z)];" +
            "   vec3 pos = vec3(0.0,0.0,0.0);" +
            "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
            "   pos.x += data.x * 2.0 - 1.0;" +
            "   pos.y += -data.y * 2.0 + 1.0;" +
            "   vec4 vt0= vec4(pos, 1.0);" +
            "   gl_Position = vt0;" +
            "}";
        return $str;
    };
    AlphaUIShader.prototype.getFragmentShaderString = function () {
        var $str = " precision mediump float;\n" +
            "uniform sampler2D s_texture;\n" +
            "varying vec2 v_texCoord;\n" +
            "varying float v_alpha;" +
            "void main(void)\n" +
            "{\n" +
            "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
            "infoUv.xyz *= infoUv.w;\n" +
            "infoUv *=v_alpha;\n" +
            "gl_FragColor = infoUv;\n" +
            "}";
        return $str;
    };
    AlphaUIShader.AlphaUiShader = "AlphaUiShader";
    return AlphaUIShader;
}(Shader3D));
var AlphaUIRenderComponent = /** @class */ (function (_super) {
    __extends(AlphaUIRenderComponent, _super);
    function AlphaUIRenderComponent() {
        return _super.call(this) || this;
    }
    AlphaUIRenderComponent.prototype.update = function () {
        if (!this.visible || this._uiList.length == 0) {
            //  FpsMc.tipStr = "显示数:0";
            return;
        }
        Scene_data.context3D.setBlendParticleFactors(0);
        Scene_data.context3D.setProgram(this.program);
        for (var i = 0; i < this._uiList.length; i++) {
            this._uiList[i].update();
            this._uiList[i].setVc(this.shader, i);
        }
        //  FpsMc.tipStr = "显示数:" + (this._uiList.length)
        Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
        Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
        if (this.uiAtlas) {
            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
        }
        else {
            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
        }
        Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
    };
    AlphaUIRenderComponent.prototype.initData = function () {
        this._uiList = new Array;
        this.objData = new ObjData();
        ProgrmaManager.getInstance().registe(AlphaUIShader.AlphaUiShader, new AlphaUIShader);
        this.shader = ProgrmaManager.getInstance().getProgram(AlphaUIShader.AlphaUiShader);
        this.program = this.shader.program;
        this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui");
        this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2");
        this.alphaLocation = Scene_data.context3D.getLocation(this.program, "alpha");
    };
    AlphaUIRenderComponent.prototype.creatBaseComponent = function ($skinName) {
        var ui = new AlphaUICompenent();
        ui.skinName = $skinName;
        var rec = this.uiAtlas.getRec($skinName);
        ui.tr.setRec(rec);
        ui.width = rec.pixelWitdh;
        ui.height = rec.pixelHeight;
        ui.uiRender = this;
        return ui;
    };
    AlphaUIRenderComponent.prototype.creatGrid9Component = function ($skinName, $width, $height) {
        var ui = new AlphaGrid9UICompenent();
        ui.skinName = $skinName;
        var rec = this.uiAtlas.getGridRec($skinName);
        ui.tr.setRec(rec);
        ui.ogw = rec.ogw;
        ui.ogh = rec.ogh;
        ui.gw = ui.ogw / rec.pixelWitdh;
        ui.gh = ui.ogh / rec.pixelHeight;
        ui.width = $width;
        ui.height = $height;
        ui.uiRender = this;
        return ui;
    };
    return AlphaUIRenderComponent;
}(UIRenderComponent));
var AlphaGrid9UICompenent = /** @class */ (function (_super) {
    __extends(AlphaGrid9UICompenent, _super);
    function AlphaGrid9UICompenent() {
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        return _this;
    }
    AlphaGrid9UICompenent.prototype.setVc = function (program, index) {
        Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
        Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
        Scene_data.context3D.setVc1fv(program, "alpha[" + index + "]", [this.alpha]);
    };
    return AlphaGrid9UICompenent;
}(Grid9Compenent));
var AlphaUICompenent = /** @class */ (function (_super) {
    __extends(AlphaUICompenent, _super);
    function AlphaUICompenent() {
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        return _this;
    }
    AlphaUICompenent.prototype.setVc = function (program, index) {
        Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
        Scene_data.context3D.setVc4fv(program, "ui2[" + index + "]", this.renderData2);
        Scene_data.context3D.setVc1fv(program, "alpha[" + index + "]", [this.alpha]);
    };
    return AlphaUICompenent;
}(UICompenent));
var AlphaUiContianer = /** @class */ (function (_super) {
    __extends(AlphaUiContianer, _super);
    function AlphaUiContianer($classVo, $rect, $num) {
        return _super.call(this, $classVo, $rect, $num) || this;
    }
    AlphaUiContianer.prototype.creatBaseRender = function () {
        this._baseRender = new AlphaUIRenderComponent;
    };
    return AlphaUiContianer;
}(Dis2DUIContianerPanel));
//# sourceMappingURL=AlphaUiContianer.js.map