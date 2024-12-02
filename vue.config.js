const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //制定node-modules文件夹中所有文件都编译
  transpileDependencies: true,
  devServer: {
    proxy:{
      //使用devserver的proxy配置远程代理，将'/api'路由下的请求跳转给target: 'http://localhost:3000/'网址处理
      '/api' : {
        target: 'http://192.168.138.128:5000/',
        //用于支持websocket
        ws: true,
        //changeOrigin: true 将请求的头部的Host字段改为被代理服务器的Host字段
        changeOrigin: true,
        //pathRewrite将"^/api"重写为''，使得在定义api路由时可以不用重复写/api前缀
        //pathRewrite:{
        //  "^/api":''
        //}
      }
    }
  }
})
