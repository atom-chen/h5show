class BaseTip extends UIConatiner {

    protected _baseRender: UIRenderComponent;
    protected _nextRender: UIRenderComponent;

    protected _bgRender: UIRenderComponent;

    protected _uiAtlas: UIAtlas;

    protected _data: BagItemData;
    protected _entryData: any;


    public constructor() {
        super();

        this._baseRender = new UIRenderComponent();
        this._bgRender = new UIRenderComponent();
        this._nextRender = new UIRenderComponent();

        this.addRender(this._bgRender);
        this.addRender(this._baseRender);
        this.addRender(this._nextRender);

    }


    public setUIAtlas($us: UIAtlas): void {
        this._uiAtlas = $us;
        this._baseRender.uiAtlas = $us;
        this._bgRender.uiAtlas = $us;
        this._nextRender.uiAtlas = $us;
        this.initBase();
    }

    protected _needBtn: boolean = true;
    protected _btnType:number;
    
    public show($data: any,buttonType:number): void {
        this._data = <BagItemData>$data;
        this._entryData = this._data.entryData;
        this._btnType = buttonType;
        //this._needBtn = needBtn;
        if(buttonType == -1 || buttonType == 3 || buttonType == 6){
            this._needBtn = false;
        }else{
            this._needBtn = true;
        }

        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }

        this.refresh();
    }

    public showBtn(): void {

    }

    public hide(): void {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }

    }

    public clickEvt($evt: any): void {
        //如果有强制引导则不关闭
        // if(GuidData.player.needGuididPop){
        //     return;
        // }
        this.hide();
    }

    /**组件列表*************************/
    protected _bg: UICompenent;

    protected _t_icon: UICompenent;
    protected _t_name: UICompenent;

    protected _t_type_value: UICompenent;

    protected _t_lev_value: UICompenent;

    protected _t_zl_value: UICompenent;

    protected _t_star: UICompenent;

    /**装备UI***********/


    // protected _t_price: UICompenent;
    // protected _t_bind: UICompenent;
    // protected _t_time: UICompenent;


    protected _t_use_btn: UICompenent;
    protected _t_sel_btn: UICompenent;

    protected _t_btn_bg:UICompenent;


    public refresh(): void {
        this.refreshIconName();
        //console.log("道具信息",this._data.tempStr);
        this.showBtn();
    }

    public refreshIconName(): void {
        // UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
        // ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
        // UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(3, 3, 62, 62), UIData.publicUi);
        IconManager.getInstance().getIcon(geteqiconIconUrl(this._entryData.icon),
            ($img: any) => {
                var rec: UIRectangle = this._uiAtlas.getRec(this._t_icon.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(this._entryData.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60); 
                if(this._entryData.type == 1){//装备
                    UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    ArtFont.getInstance().writeFontToCtxCenten(ctx,String(this._entryData.level),ArtFont.num63,18,4,4);
                }               
                this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            });

        LabelTextFont.writeSingleLabel(this._uiAtlas,
            this._t_name.skinName,this._entryData.name, 18, TextAlign.LEFT, this.getColorQua(this._entryData.quality));
    }



    protected quaNameAry: Array<string> = ["凡品", "良品", "上品", "精品", "极品", "圣品"];
    public getQuaName(qua: number): string {
        return this.quaNameAry[qua];
    }
    protected colorNameAry: Array<string> = ["白色", "绿色", "蓝色", "紫色", "橙色", "红色"];
    public getColorName(qua: number): string {
        return this.colorNameAry[qua];
    }
    protected quaColorAry: Array<string> = ["#ffffff", "#56da35", "#4392ff", "#b759ff", "#ff7200", "#ce0a00"];
    public getColorQua(qua: number): string {
        return this.quaColorAry[qua]
    }
    public getNumColor(type: number): string {
        switch (type) {
            case 0:
                return ArtFont.num16;
            case 1:
                return ArtFont.num7;
            case 2:
                return ArtFont.num17;
            case 3:
                return ArtFont.num18;
            case 4:
                return ArtFont.num19;
            case 5:
                return ArtFont.num6;
            default:
                return ArtFont.num16;
        }
    }

    protected get isEqu(): boolean {
        return Number(this._entryData.type) == SharedDef.ITEM_TYPE_EQUIP;
    }


    protected dynamicPosList: Array<UICompenent> = new Array;

    protected initBase(): void {
        var ui:UICompenent;
        this._bg = this._bgRender.getComponent("t_tip_bg");
        this.addChild(this._bg);

        this._t_icon = this._baseRender.getComponent("t_icon");
        this.addChild(this._t_icon);

        this._t_name = this._baseRender.getComponent("t_name");
        this.addChild(this._t_name);

        ui = this._baseRender.getComponent("t_type");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas,ui.skinName,"类型:",14,TextAlign.LEFT,ColorType.coloraa874a);
        this.addChild(ui)
        this._t_type_value = this._baseRender.getComponent("t_type_val");
        this.addChild(this._t_type_value);

        ui = this._baseRender.getComponent("t_lev")
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas,ui.skinName,"等级:",14,TextAlign.LEFT,ColorType.coloraa874a);
        this.addChild(ui)
        this._t_lev_value = this._baseRender.getComponent("t_lev_val");
        this.addChild(this._t_lev_value);


        this._t_zl_value = this._baseRender.getComponent("t_zl_val");
        this.addChild(this._t_zl_value);

        // var priceLable: UICompenent = this._nextRender.getComponent("t_price")
        // this.addChild(priceLable);
        // this._t_price = this._nextRender.getComponent("t_price_val");
        // this.addChild(this._t_price);

        // this._t_bind = this._nextRender.getComponent("t_bind");
        // this.addChild(this._t_bind);

        // this._t_time = this._nextRender.getComponent("t_time");
        // this.addChild(this._t_time);

        this._t_btn_bg = this._bgRender.getComponent("t_btn_bg");
        this._t_btn_bg.addEventListener(InteractiveEvent.Down,this.bgUp,this);

        //this.dynamicPosList.push(priceLable, this._t_price, this._t_bind, this._t_time);

        // this._t_use_btn = this._nextRender.getComponent("t_sy_btn");
        // this.addChild(this._t_use_btn);
        // this._t_use_btn.y = 439;
        // this._t_use_btn.addEventListener(InteractiveEvent.Down, this.useItem, this);

        // this._t_sel_btn = this._nextRender.getComponent("t_cs_btn");
        // this.addChild(this._t_sel_btn);
        // this._t_sel_btn.y = 489;
        this.initBtn();
    }

    private bgUp():void{

    }

    protected refreshBottomInfo(): void {

        /* var propData: any;
        if (this._data.data) {
            propData = this._data.data.propData;
        }

        if (propData && propData.ifailtm) {
            console.log(propData.ifailtm, TimeUtil.getLocalTime(propData.ifailtm))
            LabelTextFont.writeSingleLabel(this._uiAtlas, this._t_time.skinName, TimeUtil.getLocalTime(propData.ifailtm) + " 过期", 12, TextAlign.LEFT, "#ff0000");
        } else {
            LabelTextFont.clearLabel(this._uiAtlas, this._t_time.skinName);
        } */

        
        
    }

    public initBtn(): void {

    }

    // protected useItem(): void {
    //     var guid: string = this.getGuid();
    //     if (this._showType == 0) {
    //         if (this.isEqu) {
    //             NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_MAIN_BAG, this._data.pos, SharedDef.BAG_TYPE_EQUIP, Number(this._entryData.pos));
    //         } else {
    //             NetManager.getInstance().protocolos.bag_item_user(guid, 1);
    //         }
    //     } else if (this._showType == 1) {
    //         if (this.isEqu) {
    //             NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP, this._data.pos,
    //                 SharedDef.BAG_TYPE_MAIN_BAG, GuidData.bag.getEmptyPos());
    //         }
    //     }

    //     this.hide();
    // }

    protected getGuid(): string {
        return GuidData.bag.getPlayerGuid() + ";" + this._data.id;
    }

    protected selItem(): void {
        var guid: string = this.getGuid();
        NetManager.getInstance().protocolos.bag_item_sell(guid, this._data.count);
        console.log("出售商品：",guid,"数量",this._data.count);
        this.hide();
    }



}
