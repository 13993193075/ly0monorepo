import {GQuery} from '../../main/GQuery.js'

// 获取餐位预订信息
function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_restaurant 当前用户信息：餐馆id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q)),
            q1 = JSON.parse(JSON.stringify(q)),
            q2 = JSON.parse(JSON.stringify(q))
        if (data.id_restaurant) {
            q._id = data.id_restaurant
            q0.id_restaurant = data.id_restaurant
            q1.id_restaurant = data.id_restaurant
            q2.id_restaurant = data.id_restaurant
        }
        q1.status_code = '0'

        GQuery({
            tblName: 'ly0d5restaurant',
            operator: 'find',
            query: q
        }).then(result => {
            let arrRestaurant = result.data
            GQuery({
                tblName: 'ly0d5business',
                operator: 'find',
                query: q1
            }).then(result => {
                let arrB = result.data,
                    arrB0 = []
                arrB.forEach(i => {
                    arrB0.push(i._id)
                })
                q2.id_business = {$in: arrB0}
                GQuery({
                    tblName: 'ly0d5b_table',
                    operator: 'find',
                    query: q2,
                    populate: ['id_restaurant', 'id_business', 'id_table'] // mongoose
                }).then(result => {
                    let arrBTable = result.data
                    GQuery({
                        tblName: 'ly0d5diningplace',
                        operator: 'find',
                        query: q0,
                        sort: {text: 1}
                    }).then(result => {
                        let arrDiningplace = result.data
                        resolve({code: 0, message: "",
                            data: {
                                arrRestaurant,
                                arrBTable,
                                arrDiningplace
                            }
                        })
                    })
                })
            })
        })
    })
}

export default {
    getPageData
}
