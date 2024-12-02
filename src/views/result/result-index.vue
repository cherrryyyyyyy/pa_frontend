
<template>
    <div class="layout">
        <div class="menu">
            <!--
            定义响应式变量和注册事件
          -->
            <Menu :functionlist="functionlist"></Menu>
        </div>
        <!--
          此处class="{small:is_collapse}"，使class能够随着is_collapse的变化而变化，is_collapse为真，则class则会用small覆盖掉content，显示small的格式
        -->
        <div class="content">
            <Content></Content>
        </div>
    </div>
</template>

<script>
import Menu from '@/views/layout/menu/menu-index.vue'
import Content from '@/views/result/result_index/result_index.vue'
export default {
    data(){
        return{
            id : this.$route.query.id,
            functionlist: [],
            functionData : {},
            id_now: '',
        }
    },
    methods:{
        async GetFunctionList(){
            let binary_id = this.id
            let res = await this.$api.GetFunctions({binary_id});
            //console.log(res);
            this.functionlist = res.data.data;
            console.log(this.functionlist);
            this.id_now = this.functionlist[0].id;
            this.GetFunctionData(this.functionlist[0].id);
        },
        async GetFunctionData(iid){
            let id = iid;
            let res = await this.$api.GetFunctionCode({id})
            
            this.functionData = res.data.data[0];
            console.log(this.functionData);
        },
        GiveID(){
            return this.id_now;
        },
        SetID(iddd){
            this.id_now = iddd;
        }
    },
    components: {
        Menu,
        Content
    },
    created(){
        console.log(this.id);
        this.GetFunctionList();
    }
}
</script>

<style lang="less" scoped>
.layout {
    display: flex;

    .menu {

        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;

    }

    .content {
        padding-left: 250px;
        transition: padding-left 0.43s;
        width: 89%;
    }

    .small {
        padding-left: 64px;
        width: 100%;
    }

    //font-family: "仿宋","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
}
</style>