// 默认值

import {request} from '@heartbeat-ly0/libs-js-depend'
const ly0request = request.ly0
export default {
    myProps: {
        popup: {
            switch: false,
            visible: false,
            title: '',
            width: '800px',
            top: '15vh'
        },
        menu: {
            mode: 'horizontal',
            menu: []
        },
        cols: [],
        submit: {
            switch: true, // true - 提交模式, false - 组件模式
        },
        para: {
            placeholder: {
                input: '请输入',
                select: '请选择',
                datetime: '请选择时间',
                date: '请选择日期'
            },
            upload: {
                uploadUrl: ly0request.domain + ly0request.upload,
                uploadUrl_image: ly0request.domain + ly0request.upload_image,
                uploadUrl_carplate: ly0request.domain + ly0request.upload_carplate,
            },
            download: { // 行内下载
                fileName: 'new-file', // 下载文件名
                downloadLabel: '点击这里下载', // 下载标签
                downloadLabelNoSrc: '没有可供下载的资源', // 下载标签
            }
        }
    }
}