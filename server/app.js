const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characterRoutes');
const cors = require('cors');

const app = express();

// MongoDB connection
const mongoURI = 'mongodb+srv://Vivian:123456789Yj@cartoon.bftxaht.mongodb.net/website_database?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// 中间件
app.use(bodyParser.json()); // 解析JSON请求体
app.use(cors()); // 使用cors中间件

// 使用角色路由
app.use('/api/characters', characterRoutes);

// 启动服务器
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
