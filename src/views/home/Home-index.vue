<template>
  <div>

    <div class="wrapper">

      <h3 style="padding-top: 10%;padding-left: 40%" class="siyuan">
        二进制安全分析平台
      </h3>

      <el-upload class="upload-demo" drag action="http://127.0.0.1:5000/upload" :on-success="success"
        :limit="1" :on-exceed="handleExceed">
        <i class="el-icon-upload" style="padding-top: 10%;"></i>
        <div class="el-upload__text" style="font-size:25px">将文件拖到此处，或<em>点击上传</em>，请按照要求格式上传要分析的二进制文件</div>
      </el-upload>
      <el-button size="big" type="primary" style="display: table; margin: 0 auto;font-size: 30px;"
        @click="start_com()">上传并开始分析</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      files: [],
      file_now: '',
      file_name: '',
      binary_id: '',
      progress: 0,

    }
  },
  methods: {
    async start_com() {
      console.log('start_com');
      this.GetNewest();

      //let res = await this.$api.CreateBinary({param})
      //this.$router.push('/result/index')

    },
    handleExceed() {
      console.log('xianzhi');
      alert('当前限制选择 1 个文件!');
    },
    async GetFiles() {
      await axios.get('http://localhost:5000/get_binaries')
        .then(response => {
          this.files = response.data;

        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      console.log(this.files);
    },
    async GetNewest() {
      await axios.get('http://localhost:5000/get_newest')
        .then(response => {
          this.file_now = response.data.file;
          this.file_name = response.data.name;
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      
      let form = {
        name: this.file_name,
        content: this.file_now
      }
      console.log(form);
      let name = this.file_name;
      let res1 = await this.$api.DeleteBinary({name})
      console.log(res1);
      let res = await this.$api.CreateBinary(form);
      console.log(res);
      this.binary_id = res.data.id;
      console.log(this.binary_id);
      
      this.timer = setInterval(this.querybinary, 3000);
    },
    async querybinary(){
      let id = this.binary_id;
      let res = await this.$api.QueryBinary({id});
      console.log(res);
      this.progress = res.data.data[0].progress;
      if(this.progress == 100){
        clearInterval(this.timer);
        this.$router.push(
        {
          path: '/result/index',
          query: { id: id }
        })
      }
    }
  },
    beforeDestroy() {
      clearInterval(this.timer);
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-upload {
  width: 100%;
  height: 500px;

}

/deep/ .el-upload .el-upload-dragger {
  width: 100%;
  height: 500px;
}

/deep/ .el-upload .el-upload__text {
  width: 100%;
  height: 500px;
}


.header {
  height: 55px;
  background: #fff;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;

}

.siyuan {
  font-family: "SourceHanSansCN", sans-serif;
  font-size: 40px;
  color: cornflowerblue;
}

.wrapper {
  padding: 10px;

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #ffffff;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .bg-blue-light {
    background: rgb(237, 245, 253);
  }

  .bg-green-light {
    background: rgb(241, 253, 241);
  }

  .bg-pup-light {
    background: rgb(241, 240, 254);
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>