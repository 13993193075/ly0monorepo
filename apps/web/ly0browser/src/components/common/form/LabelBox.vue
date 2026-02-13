<template>
    <!-- label-box -->
    <div :style="style.label.box(item)" @click="hdlLabelClick">
        <span :style="style.label.label(item)">
            {{item.label}}
        </span>
    </div>
</template>

<script>
    import style from "./style.js"

    export default {
        props: ["scopeThis", "formProps", "dataBox", "item"],
        data(){return{
            style
        }},
        methods: {
            hdlLabelClick(){
                if(this.item.hdlLabelClick){
                    this.item.hdlLabelClick(this.scopeThis)
                }
            }
        }
    }
</script>

<style scoped>

</style>