import ly0elD2busiside from './ly0el-d2busiside/Index.vue'
import ly0elD2cash from './ly0el-d2cash/Index.vue'
import ly0elD7group from './ly0el-d7group/Index.vue'
import ly0elD7postal from './ly0el-d7postal/Index.vue'
import ly0elD7price from './ly0el-d7price/Index.vue'
import ly0elD7size from './ly0el-d7size/Index.vue'
import ly0elD7thumb from './ly0el-d7thumb/Index.vue'
import ly0elForm from './ly0el-form/Index.vue'
import ly0elFrame from './ly0el-frame/Index.vue'
import ly0elFrame0 from './ly0el-frame0/Index.vue'
import ly0elGbt2260 from './ly0el-gbt2260/Index.vue'
import ly0elHeader from './ly0el-header/Index.vue'
import ly0elImagelist from './ly0el-imagelist/Index.vue'
import ly0elLogin from './ly0el-login/Index.vue'
import ly0elMenu from './ly0el-menu/Index.vue'
import ly0elRichtext from './ly0el-richtext/Index.vue'
import ly0elTable from './ly0el-table/Index.vue'
import ly0el_upload from './ly0el-upload/index.js'
import withTable from './with-table/index.js'

const ly0elUpload = ly0el_upload.Upload,
    ly0elUploadAvatar = ly0el_upload.Upload_avatar,
    ly0elUploadCarplate = ly0el_upload.Upload_carplate,
    ly0elUploadDrag = ly0el_upload.Upload_drag,
    ly0elUploadPicture = ly0el_upload.Upload_picture,
    ly0elUploadPictureCard = ly0el_upload.Upload_pictureCard

export {
    ly0elD2busiside,
    ly0elD2cash,
    ly0elD7group,
    ly0elD7postal,
    ly0elD7price,
    ly0elD7size,
    ly0elD7thumb,
    ly0elForm,
    ly0elFrame,
    ly0elFrame0,
    ly0elGbt2260,
    ly0elHeader,
    ly0elImagelist,
    ly0elLogin,
    ly0elMenu,
    ly0elRichtext,
    ly0elTable,

    ly0elUpload,
    ly0elUploadAvatar,
    ly0elUploadCarplate,
    ly0elUploadDrag,
    ly0elUploadPicture,
    ly0elUploadPictureCard,

    withTable
}
export default {
    install(app, options) {
        // 全局注册组件
        app.component('ly0el-d2busiside', ly0elD2busiside);
        app.component('ly0el-d2cash', ly0elD2cash);
        app.component('ly0el-d7group', ly0elD7group);
        app.component('ly0el-d7postal', ly0elD7postal);
        app.component('ly0el-d7price', ly0elD7price);
        app.component('ly0el-d7size', ly0elD7size);
        app.component('ly0el-d7thumb', ly0elD7thumb);
        app.component('ly0el-form', ly0elForm);
        app.component('ly0el-frame', ly0elFrame);
        app.component('ly0el-frame0', ly0elFrame0);
        app.component('ly0el-gbt2260', ly0elGbt2260);
        app.component('ly0el-header', ly0elHeader);
        app.component('ly0el-imagelist', ly0elImagelist);
        app.component('ly0el-login', ly0elLogin);
        app.component('ly0el-menu', ly0elMenu);
        app.component('ly0el-richtext', ly0elRichtext);
        app.component('ly0el-table', ly0elTable);
        // 上传组件
        app.component('ly0el-upload', ly0elUpload.Upload);
        app.component('ly0el-upload_avatar', ly0elUpload.Upload_avatar);
        app.component('ly0el-upload_carplate', ly0elUpload.Upload_carplate);
        app.component('ly0el-upload_drag', ly0elUpload.Upload_drag);
        app.component('ly0el-upload_picture', ly0elUpload.Upload_picture);
        app.component('ly0el-upload_pictureCard', ly0elUpload.Upload_pictureCard);
    },

    ly0elD2busiside,
    ly0elD2cash,
    ly0elD7group,
    ly0elD7postal,
    ly0elD7price,
    ly0elD7size,
    ly0elD7thumb,
    ly0elForm,
    ly0elFrame,
    ly0elFrame0,
    ly0elGbt2260,
    ly0elHeader,
    ly0elImagelist,
    ly0elLogin,
    ly0elMenu,
    ly0elRichtext,
    ly0elTable,

    ly0elUpload,
    ly0elUploadAvatar,
    ly0elUploadCarplate,
    ly0elUploadDrag,
    ly0elUploadPicture,
    ly0elUploadPictureCard,

    withTable
}