﻿

class LightSpriteList extends Display3DSprite {

    constructor() {
        super();
        //"model/fanguan.txt"
        GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + "model/ccav.txt", (groupRes: GroupRes) => {
            this.loadPartRes(groupRes)
        })
    }

    public setCamPos($material: Material): void {
        var $scale: number = 1
        $material.updateCam(Scene_data.cam3D.x / $scale, Scene_data.cam3D.y / $scale, Scene_data.cam3D.z / $scale);
    }
    public loadPartRes(groupRes: GroupRes): void {
        for (var i: number = 0; i < groupRes.dataAry.length; i++) {
            var item: GroupItem = groupRes.dataAry[i];
            if (item.types == BaseRes.PREFAB_TYPE) {
                this.scaleX = this.scaleY = this.scaleZ = 10
                this.setObjUrl(item.objUrl);
                this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                return 
            }
        }


    }


}
