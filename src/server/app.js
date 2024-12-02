let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
const moment = require('moment');
//let router = require('./router');
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const iconv = require('iconv-lite');

let upload_file = "";
let upload_file_name = "";

app.use(bodyParser.json({ type: 'application/*+json', charset: 'utf-8' }));  //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({ extended: true, charset: 'utf-8' }));
app.use(cors())              //配置跨域，必须在路由之前
//app.use(router)              //配置路由
const directoryPath = path.join(__dirname, 'test')

app.post("/upload", multer({ dest: "./test" }).any(), (req, res) => {
    const { fieldname, originalname } = req.files[0];
    // 创建一个新路径
    const name = originalname.slice(0, originalname.indexOf("."));
    let now = moment();
    let formatted = now.format('_YYYYMMDD_HH_mm_ss');
    console.log(name);
    const jj = name + formatted + path.parse(originalname).ext
    console.log(jj)
    const newName = "test/" + name + formatted + path.parse(originalname).ext;
    console.log('保存文件:%s', newName);
    let nanananme = iconv.decode(newName, 'utf-8');
    let jjj = iconv.decode(jj, 'utf-8');
    console.log(nanananme);
    this.upload_file = nanananme;
    this.upload_file_name = jjj;
    fs.rename(req.files[0].path, nanananme, function (err) {
        if (err) {
            res.send({ code: 0, msg: "上传失败", data: [] });
        } else {
            res.send({ code: 1, msg: "上传成功", data: nanananme });
        }
    });
});


app.get("/get_binaries", (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan files!');
        }
        res.json(files);
    });
    //res.send({name: 'John', age: 30});
});

app.get("/get_newest", (req, res) => {
    let filePath = directoryPath + '\\' + this.upload_file_name
    console.log(filePath);
    fs.readFile(filePath, 'base64', (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan files!');
        }
        res.send({file: files, name: this.upload_file_name});
    });
});



app.listen(5000, () => {
    console.log('服务器启动成功');
})
