import query from './query.js'
export default {
    sort: JSON.parse(JSON.stringify(query.sort)),
    pageSize: query.pageSize,
    currentPage: query.currentPage
}
