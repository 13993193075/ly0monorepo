import {ElMessage, ElMessageBox} from 'element-plus'
import { ly0request } from '@yoooloo42/ly0browser/ly0request'
import QRCode from 'qrcode'

export default {
    async init({scopeThis}) {
        // 获取容器元素
        const container = document.getElementById('qrcodejs2.ly0d2cash')
        if (!container) return
        
        // 清空并生成主窗口二维码 (现代写法使用 canvas 或插入图片)
        container.innerHTML = '<canvas id="main_qr_canvas"></canvas>'
        const canvas = document.getElementById('main_qr_canvas')
        
        try {
            await QRCode.toCanvas(
                canvas,
                scopeThis.props.formData.code_url,
                {
                    width: 120,
                    margin: 2
                }
            )

            // 如果不显示第二个窗口
            if (!scopeThis.props.popup.second) {
                return
            }

            // 获取第二块屏幕的位置
            let secondScreen = window.screen,
                secondScreenLeft = 0,
                secondScreenTop = 0
            if (window.screen.width > window.innerWidth) {
                secondScreenLeft = secondScreen.availLeft
                secondScreenTop = secondScreen.availTop
            }
            // 处理第二块屏幕
            scopeThis.winPayAnother = window.open(
                '',
                '_blank',
                'width=600' +
                ',height=300' +
                ',screenX=' +
                secondScreenLeft +
                ',screenY=' +
                secondScreenTop +
                ',location=no' +
                ',menubar=no' +
                ',resizable=no' +
                ',scrollbars=no' +
                ',status=no' +
                ',titlebar=no' +
                ',toolbar=no',
            )
            // 写入 HTML 内容
            scopeThis.winPayAnother.document.write(
                "<div style='text-align:center; margin-top:20px;'>尊敬的客户，请您使用微信扫描二维码，以完成支付</div>" +
                "<div style='text-align:center; color:blue; font-size:large; font-weight:bold;'>金额：¥" +
                scopeThis.props.formData.amount +
                '</div>' +
                "<div style='text-align:center; margin-top:20px;'>" +
                "<div id='qrcodejs2.ly0d2cash' style='display:inline-block;'>" +
                '</div></div>',
            )
            // 在第二个窗口生成二维码
            const secondCanvas = scopeThis.winPayAnother.document.getElementById('second_qr_canvas')
            await QRCode.toCanvas(secondCanvas, scopeThis.props.formData.code_url, {
                width: 160,
                margin: 2
            })
        } catch (err) {
            console.error('二维码生成失败：', err)
        }
    },
    confirm({scopeThis}) {
        ly0request.storpro({
            storproName: 'ly0d2.wxzf.getStatus',
            data: {
                mchid: scopeThis.props.formData.mchid,
                id_business: scopeThis.props.formData.id_business,
            },
        }).then(result => {
            ElMessage('message: ' + result.message)
            // 关闭第二块屏幕
            if (!!scopeThis.winPayAnother) {
                scopeThis.winPayAnother.close()
            }
            scopeThis.winPayAnother = null
            scopeThis.props.formData.code_url = ''
            scopeThis.props.popup.visible = false
        })
    },
    beforeClose({scopeThis}) {
        // 关闭第二块屏幕
        if (!!scopeThis.winPayAnother) {
            scopeThis.winPayAnother.close()
        }
        scopeThis.winPayAnother = null
        scopeThis.props.formData.code_url = ''
        scopeThis.props.popup.visible = false
    },
}
