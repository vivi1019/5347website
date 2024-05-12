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
let select_user_info = {}; //用于存放选择角色信息
//let user_history = {}; //用于存放角色比较历史记录
//let login_user_info = {}; //用于存放登入角色信息
//const login_user_id = new ObjectId("5f5237a4c1beb1523fa3da02") //切换登入用户id


// Root route
/*
// 获取登入角色id
app.get('获取登入角色id路由路径', (req, res) => {
    const login_user_id = req.query.id;  //
    if (!login_user_id) {
        console.log("Unable to get login user in profile");
        res.status(400).send("Unable to get login user in profile."); // 返回一个错误响应
    }
});
*/

// find all user info
app.get('/userprofile/userprofile/userinfo', async (req, res) => {
    try {
        // 连接 MongoDB
        await client.connect();
        // 获取数据库和集合
        const getuserinfo = database.collection("userlist");
        // 查询数据
        const userinfo = await getuserinfo.find().toArray();
        // 发送符合条件的数据作为 JSON 格式响应
        res.json(userinfo);
    } catch (error) {
        console.error("Error occurred while getting user info in profile:", error);
        res.status(500).send("An error occurred while getting user info in profile");
    } finally {
        // 关闭 MongoDB 连接
        await client.close();
    }
});

//get select user id
app.get('/userprofile/userprofile/selectuser', async (req, res) => {
    select_user_info = {
        id: req.query.id,
        firstname: req.query.firstname,
        lastname: req.query.lastname
    }; // 使用req.query来获取GET请求的参数
    console.log(select_user_info.id); //用来检测是否正确输出，后需删除
    if (!select_user_info) {
        console.log("Unable to get select user in profile");
        res.status(400).send("Unable to get select user in profile."); // 返回一个错误响应
    }
});

//return select user
app.get('/userprofile/userprofile/reselectuser', async (req, res) => {
    // Return the previously set user information.
    if (!select_user_info) {
        console.log("No user selected");
        console.log(select_user_info);
        res.status(404).send("No user selected.");
    } else {
        res.json(select_user_info);
        console.log('User data sent to client:', select_user_info);
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
        const favouriteschar = await getfavouriteschar.find({"._id": new ObjectId(select_user_info.id)}).toArray();
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

/*
//get user comparisons history
app.get('/homepage/history', async (req, res) => {
    const add_user_history = {
        id: req.query.id,
        leftchar: req.query.leftchar,
        rightchar: req.query.rightchar
    }; // 使用req.query来获取GET请求的参数
    console.log(user_history); //用来检测是否正确输出，后需删除
    if (!add_user_history) {
        console.log("Unable to add comparisons history");
        res.status(400).send("Unable to add comparisons history."); // 返回一个错误响应
    }
    //将add_user_history加进user_history{}里
    //代码稍后完成
});

//return select user
app.get('/homepage/historyinfo', async (req, res) => {
    // Return the previously set user information.
    if (!select_user_info) {
        console.log("No comparisons history");
        res.status(404).send("No comparisons history");
    } else {
        res.json(user_history);
        console.log('History sent to client:', user_history);
    }
});
 */
//find comparisons
app.get('/userprofile/comparisons', async (req, res) => {
    try {

    } catch (error) {
        console.error("Error occurred while find user comparisons:", error);
        res.status(500).send("An error occurred while finding user comparisons");
    } finally {

    }
});

//find contributions
app.get('/userprofile/contributions', async (req, res) => {
    try {
        // 连接 MongoDB
        await client.connect();
        // 获取数据库和集合
        const getusercontributions = database.collection("contributions");
        // 查询数据
        const usercontributions = await getusercontributions.find({"user_id._id": new ObjectId('select_user_info.id')}).toArray(); //5f5237a4c1beb1523fa3da18//select_user_info.id
        // 发送符合条件的数据作为 JSON 格式响应
        res.json(usercontributions);
        //console.log(usercontributions); //测试用
    } catch (error) {
        console.error("Error occurred while finding user contributions:", error);
        res.status(500).send("An error occurred while finding user contributions");
    } finally {
        // 关闭 MongoDB 连接
        await client.close();
    }
});

//revoke contribution
app.post('/userprofile/contributions/revoke', async (req, res) => {
    const { id } = req.body; // Access id from body instead of params
    console.log(id); //测试用
    /*
        try {
            //连接 MongoDB
            await client.connect();
            // 获取数据库和集合
            const contributionsCollection = database.collection("contributions");

            // 在数据库中查找并删除贡献
            const result = contributionsCollection.deleteOne({ "_id": new ObjectId(id) });

            //检查是否成功删除
            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'Contribution successfully revoked' });
            } else {
                res.status(404).json({ message: 'Contribution not found' });
            }
        } catch (error) {
            console.error("Error occurred while revoking contribution:", error);
            res.status(500).send("An error occurred while revoking contribution");
        } finally {
            // 关闭 MongoDB 连接
           await client.close();
        }
         */
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