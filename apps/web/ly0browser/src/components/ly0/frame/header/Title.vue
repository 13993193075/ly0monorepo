<template>
    <div class="title">{{this.title}}</div>
</template>

<script>
export default{
    props : {
        title : { type : String }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        height : 40px;
        line-height : 40px;
        background-color : #008488;
        color : white;
        text-align : center;
    }
</style>
