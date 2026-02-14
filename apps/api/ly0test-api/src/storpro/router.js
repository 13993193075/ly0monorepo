import express from 'express'
import {exec} from './index.js'
import {audit} from '../audit/index.js'
const router = express.Router()

router
    // 执行存储过程，需要进行安全审计
    .post('/exec', (request, response) => {
        audit(request, response).then(resultAudit=>{
            if(resultAudit.session.code === 0){
                // 安全审计通过，执行存储过程
                exec(request.body.storproBody).then(resultStorpro=>{
                    response.send(resultStorpro)
                })
            }else{
                // 安全审计未通过，返回审计结果
                response.send(resultAudit)
            }
        })
    })

export default router
