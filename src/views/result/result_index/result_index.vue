<template>

    <div>
        <div class="header">
            <h3>
                函数名称：{{ this.functionData1.address }} ({{ this.binary_name }})
            </h3>

        </div>

        <div class="wrapper">
            <el-row :gutter="20">
                <el-col :span="10">
                    <h3 style="font-size: 20px;">反编译结果</h3>
                    <el-input type="textarea" :rows="20" v-model="this.functionData1.decompiled_code"
                        style="font-size:20px">
                    </el-input>

                </el-col>
                <el-col :span="12">
                    <div>
                        <h3 style="font-size: 20px;">反汇编结果</h3>
                        <el-input type="textarea" :rows="20" v-model="this.functionData1.disassembly_code"
                            style="font-size:20px">
                        </el-input>
                    </div>
                </el-col>
            </el-row>


        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            functionData1: [],
            coed1: '4123412234234',
            binary_name: '',
        }
    },
    methods: {
        async getFunctionData() {

            let id = this.$parent.GiveID();
            let res = await this.$api.GetFunctionCode({ id })
            console.log(id, res)
            this.functionData1 = res.data.data[0];
            console.log(this.functionData1)
            this.getbinaryname();
        },
        async getbinaryname(){
            let id = this.functionData1.binary_id;
            let res = await this.$api.QueryBinary({id})
            console.log('!!!',res);
            this.binary_name = res.data.data[0].name;
        }
    },
    created() {

        console.log('created!!!!', this.functionData);
        this.getFunctionData()

    },
    mounted() {
        // 文档准备好后格式化代码

        this.timer = setInterval(this.getFunctionData, 3000);

    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
</script>


<style lang="less" scoped>
.header {
    height: 55px;
    background: #fff;
    border-bottom: 2px solid black;
    display: flex;
    align-items: center;

}

.wrapper {
    padding: 10px;
}

.fontClass {
    font-size: 20px;
    font-family: Microsoft Yahei;
}

.fontClasstitle {
    font-size: 30px;
    font-family: Microsoft Yahei;
}
</style>