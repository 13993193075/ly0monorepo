import ly0el_d2busiside from './ly0el-d2busiside/Index.vue'
import ly0el_d2cash from './ly0el-d2cash/Index.vue'
import ly0el_d7group from './ly0el-d7group/Index.vue'
import ly0el_d7postal from './ly0el-d7postal/Index.vue'
import ly0el_d7price from './ly0el-d7price/Index.vue'
import ly0el_d7size from './ly0el-d7size/Index.vue'
import ly0el_d7thumb from './ly0el-d7thumb/Index.vue'
import ly0el_form from './ly0el-form/Index.vue'
import ly0el_gbt2260 from './ly0el-gbt2260/Index.vue'
import ly0el_menu from './ly0el-menu/Index.vue'
import ly0el_richtext from './ly0el-richtext/Index.vue'
import ly0el_table from './ly0el-table/Index.vue'

import ly0upload from './ly0upload/index.js'
import ly0withTable from './ly0with-table/index.js'

export {
    ly0withTable
}
export default {
    install(app, options) {
        // 全局注册组件
        app.component('ly0el-d2busiside', ly0el_d2busiside);
        app.component('ly0el-d2cash', ly0el_d2cash);
        app.component('ly0el-d7group', ly0el_d7group);
        app.component('ly0el-d7postal', ly0el_d7postal);
        app.component('ly0el-d7price', ly0el_d7price);
        app.component('ly0el-d7size', ly0el_d7size);
        app.component('ly0el-d7thumb', ly0el_d7thumb);
        app.component('ly0el-form', ly0el_form);
        app.component('ly0el-gbt2260', ly0el_gbt2260);
        app.component('ly0el-menu', ly0el_menu);
        app.component('ly0el-richtext', ly0el_richtext);
        app.component('ly0el-table', ly0el_table);
        // 上传组件
        app.component('ly0el-upload', ly0upload.Upload);
        app.component('ly0el-upload_avatar', ly0upload.Upload_avatar);
        app.component('ly0el-upload_carplate', ly0upload.Upload_carplate);
        app.component('ly0el-upload_drag', ly0upload.Upload_drag);
        app.component('ly0el-upload_picture', ly0upload.Upload_picture);
        app.component('ly0el-upload_pictureCard', ly0upload.Upload_pictureCard);
    },

    ly0withTable
}