<template>
    <div class="root">
        <comp-row-login></comp-row-login>
        <div class="main">
            <div>
                <template v-for="item in dataBox.data">
                    <div class="item-box">
                        <video
                                width="200px"
                                height="150px"
                                controls
                                :poster="srcPrefix + item.poster"
                        >
                            <source :src="srcPrefix + item.video" type="video/mp4"> <!-- MP4/H.264/AAC - 最广泛支持 -->
                            <source :src="srcPrefix + item.video" type="video/webm"> <!-- WebM/VP9/Opus - 开源格式，支持良好 -->
                            <source :src="srcPrefix + item.video" type="video/ogg"> <!-- Ogg/Theora/Vorbis - 较旧的开源格式 -->
                        </video>
                        <div class="class-name">{{ item.class_name }}</div>
                        <div class="name">{{ item.name }}</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import compRowLogin from "./row-login/Index.vue"
    import handles from "./handles/index.js"

    export default {
        components: {
            compRowLogin
        },
        data(){return {
            dataBox: {
                data: [],
                count: 0,
                query: {
                    limit: 100,
                    page: 1
                }
            },
            handles,
            srcPrefix: ""
        }},
        mounted(){
            this.handles.lession.getData(this)
        }
    }
</script>

<style scoped lang="scss">
    .root{
        .main{
            display: flex;
            flex-direction: column;
            align-items: center;
            .item-box{
                margin: 10px;
                .class-name{
                    text-align: center;
                    font-size: 13px;
                }
                .name{
                    text-align: center;
                    font-size: 13px;
                }
            }
        }
    }
</style>
