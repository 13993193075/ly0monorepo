import query from './query.js'

export default {
    data: [],
    sort: JSON.parse(JSON.stringify(query.sort)),
    pageSize: query.pageSize,
    currentPage: query.currentPage
}
