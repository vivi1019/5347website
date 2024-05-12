const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const app = express();
const port = 4000;

// 跨域配置
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // 允许所有来源的请求
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://Vivian:123456789Yj@cartoon.bftxaht.mongodb.net/?retryWrites=true&w=majority&appName=cartoon";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db("website_database"); // 请替换为您的数据库名称
let select_char_info = {}; //用于存放选择角色信息
const login_user_id = new ObjectId("5f5237a4c1beb1523fa3da18") //登入用户id

// find all active char info
app.get('/characterdetail/characterdetail/charinfo', async (req, res) => {
    try {
        // 连接 MongoDB
        await client.connect();
        // 获取数据库和集合
        const getcharinfo = database.collection("characters");
        // 查询数据
        const charinfo = await getcharinfo.find({ active: true }).toArray();
        // 发送符合条件的数据作为 JSON 格式响应
        res.json(charinfo);
    } catch (error) {
        console.error("Error occurred while getting active character info in character detail:", error);
        res.status(500).send("An error occurred while active character info in character detail");
    } finally {
        // 关闭 MongoDB 连接
        await client.close();
    }
});

//get select char info
app.get('/characterdetail/characterdetail/selectchar', async (req, res) => {
    select_char_info = {
        id: req.query.id,
        name: req.query.name,
        subtitle: req.query.subtitle,
        description: req.query.description,
        image_url: req.query.image_url,
        strength: req.query.strength,
        speed: req.query.speed,
        skill: req.query.skill,
        fear_factor: req.query.fear_factor,
        intelligence: req.query.intelligence,
        wealth: req.query.wealth
    }; // 使用req.query来获取GET请求的参数
    console.log(select_char_info); //用来检测是否正确输出，后需删除
    if (!select_char_info) {
        console.log("Unable to get select char in character detail");
        res.status(400).send("Unable to get select char in character detail"); // 返回一个错误响应
    }
});

//return select user
app.get('/characterdetail/characterdetail/reselectchar', async (req, res) => {
    // Return the previously set user information.
    if (!select_char_info) {
        console.log("No user selected");
        res.status(404).send("No char selected.");
    } else {
        res.json(select_char_info);
        console.log('Char data sent to client:', select_char_info);
    }
});

// find favourite char
app.get('/userprofile/favourite', async (req, res) => {
    try {
        // 连接 MongoDB
        await client.connect();
        // 获取数据库和集合
        const getfavouriteschar = database.collection("favorites");
        // 查询数据
        const favouriteschar = await getfavouriteschar.find({"user_id._id": login_user_id }).toArray();
        // 发送符合条件的数据作为 JSON 格式响应
        res.json(favouriteschar);
    } catch (error) {
        console.error("Error occurred while finding favourite char:", error);
        res.status(500).send("An error occurred while finding favourite char");
    } finally {
        // 关闭 MongoDB 连接
        await client.close();
    }
});

//char add like
app.post('/characterdetail/characterdetail/like', async (req, res) => {
    const { id } = req.body; // Access id from body instead of params
    console.log('Received body:', req.body.id); // 查看整个请求体
    console.log(id); //测试用
        try {
            //连接 MongoDB
            await client.connect();
            // 获取数据库和集合
            const addfavouritechar = database.collection("favorites");
            // 向用户的收藏数组中添加新角色
            const result = await addfavouritechar.updateOne(
                { "user_id._id": login_user_id }, // 确保使用正确的user_id匹配文档
                { $push: { characters: id } } // 添加新角色到数组
            );
            // 检查是否成功更新
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Character successful added to favorites' });
            } else {
                res.status(404).json({ message: 'Failed to add character to favorites' });
            }
        } catch (error) {
            console.error("Error occurred while adding character to favorites:", error);
            res.status(500).send("An error occurred while adding character to favorites");
        } finally {
            // 关闭 MongoDB 连接
            await client.close();
        }
});

//char remove like
app.post('/characterdetail/characterdetail/remove', async (req, res) => {
    const { id } = req.body; // Access id from body instead of params
    try {
        //连接 MongoDB
        await client.connect();
        // 获取数据库和集合
        const addfavouritechar = database.collection("favorites");
        // 向用户的收藏数组中添加新角色
        const result = await addfavouritechar.updateOne(
            { "user_id._id": login_user_id }, // 确保使用正确的user_id匹配文档
            { $pull: { characters: id } } // 添加新角色到数组
        );
        // 检查是否成功更新
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Character successful added to favorites' });
        } else {
            res.status(404).json({ message: 'Failed to add character to favorites' });
        }
    } catch (error) {
        console.error("Error occurred while removing character out favorites:", error);
        res.status(500).send("An error occurred while removing character out favorites");
    } finally {
        // 关闭 MongoDB 连接
        await client.close();
    }
});


client.connect().then(() => {
  console.log("Successfully connected to MongoDB!");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});

// Handle SIGINT for graceful shutdown
process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed.');
    process.exit();
  });
});