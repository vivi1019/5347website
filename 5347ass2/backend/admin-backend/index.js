const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 连接信息
const uri = "mongodb+srv://Vivian:123456789Yj@cartoon.bftxaht.mongodb.net/?retryWrites=true&w=majority";

// MongoDB 客户端
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// 路由处理函数 - 获取管理员列表
app.get('/admin', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const adminCollection = database.collection("adminlist");

    // 查询数据
    const admins = await adminCollection.find({}).toArray();

    // 发送管理员数据作为 JSON 格式响应
    res.json(admins);
  } catch (error) {
    console.error("Error occurred while fetching admin data:", error);
    res.status(500).send("An error occurred while fetching admin data");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

//查询userlist中的id，firstname，lastname
app.get('/admins', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const adminCollection = database.collection("adminlist");
    const userCollection = database.collection("userlist");

    // 聚合查询
    const admins = await adminCollection.aggregate([
      {
        // 匹配adminlist中的记录
        $match: {}
      },
      {
        // 连接userlist，关联_id字段到_id字段
        $lookup: {
          from: "userlist",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        // 投影结果
        $project: {
          _id: 1, // 保留adminlist中的_id字段
          firstname: { $arrayElemAt: ["$user.firstname", 0] }, // 提取userlist中的firstname字段
          lastname: { $arrayElemAt: ["$user.lastname", 0] } // 提取userlist中的lastname字段
        }
      }
    ]).toArray();

    // 发送结果作为 JSON 格式响应
    res.json(admins);
  } catch (error) {
    console.error("Error occurred while fetching admin data:", error);
    res.status(500).send("An error occurred while fetching admin data");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});


// 路由处理函数 - 删除管理员
app.delete('/admin/:id', async (req, res) => {
  try {
    // 获取要删除的管理员ID
    const adminId = req.params.id;

    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const adminCollection = database.collection("adminlist");

    // 删除数据
    const result = await adminCollection.deleteOne({ "_id": new ObjectId(adminId) });

    // 检查是否成功删除了管理员
    if (result.deletedCount === 1) {
      res.status(200).send("Admin deleted successfully");
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    console.error("Error occurred while deleting admin:", error);
    res.status(500).send("An error occurred while deleting admin");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

// 路由处理函数 - 获取特定用户的信息
app.get('/user/:id', async (req, res) => {
  try {
    // 获取要查询的用户ID
    const userId = req.params.id;

    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const userCollection = database.collection("userlist");

    // 查询数据
    const user = await userCollection.findOne({ "_id": new ObjectId(userId) });

    // 检查是否找到了用户
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error occurred while fetching user data:", error);
    res.status(500).send("An error occurred while fetching user data");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});



// 路由处理函数 - 获取所有不在 adminlist 中的用户信息
app.get('/users', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const userCollection = database.collection("userlist");
    const adminCollection = database.collection("adminlist");

    // 查询所有在 userlist 中的用户信息
    const allUsers = await userCollection.find({}).toArray();

    // 查询所有在 adminlist 中的用户ID
    const adminIds = (await adminCollection.find({}, { projection: { _id: 1 } }).toArray()).map(admin => admin._id.toString());

    // 过滤不在 adminlist 中的用户，并只保留所需的属性
    const users = allUsers
      .filter(user => !adminIds.includes(user._id.toString()))
      .map(user => ({ _id: user._id, firstname: user.firstname, lastname: user.lastname }));

    // 发送用户数据作为 JSON 格式响应
    res.json(users);
  } catch (error) {
    console.error("Error occurred while fetching user data:", error);
    res.status(500).send("An error occurred while fetching user data");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

app.post('/admin/add/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("User ID:", userId);

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("website_database");
    const adminCollection = database.collection("adminlist");

    // 将传入的用户ID直接插入到管理员列表中
    const result = await adminCollection.insertOne({ "_id": new ObjectId(userId) });
    console.log("Insert result:", result);

    console.log("Result structure:", result);

    if (result.acknowledged) {
      console.log("User added to adminlist successfully");
      return res.status(200).send("User added to adminlist successfully");
    } else {
      console.error("Failed to add user to adminlist.");
      return res.status(500).send("Failed to add user to adminlist");
    }

  } catch (error) {
    console.error("Error occurred while adding user to adminlist:", error);
    return res.status(500).send("An error occurred while adding user to adminlist");
  } finally {
    await client.close();
  }
});

app.get('/pending-contributions-count', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database"); // 替换为您的数据库名称
    const contributionsCollection = database.collection("contributions");

    // 查询数据
    const pendingContributionsCount = await contributionsCollection.countDocuments({ status: "Pending" });

    // 发送 pendingContributionsCount 作为 JSON 格式响应
    res.json({ "pendingContributionsCount": pendingContributionsCount });
  } catch (error) {
    console.error("Error occurred while fetching pending contributions count:", error);
    res.status(500).send("An error occurred while fetching pending contributions count");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

//查询total characters
app.get('/characters/count', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const charactersCollection = database.collection("characters");

    // 查询数据数量
    const count = await charactersCollection.countDocuments();

    // 发送数据数量作为 JSON 格式响应
    res.json({ count });
  } catch (error) {
    console.error("Error occurred while counting characters:", error);
    res.status(500).send("An error occurred while counting characters");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});
// 查询user count

app.get('/userlist/count', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const userlistCollection = database.collection("userlist");

    // 查询数据数量
    const count = await userlistCollection.countDocuments();

    // 发送数据数量作为 JSON 格式响应
    res.json({ count });
  } catch (error) {
    console.error("Error occurred while counting userlist data:", error);
    res.status(500).send("An error occurred while counting userlist data");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

//查询admin count
app.get('/adminlist/count', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const adminlistCollection = database.collection("adminlist");

    // 查询数据数量
    const count = await adminlistCollection.countDocuments();

    // 发送数据数量作为 JSON 格式响应
    res.json({ count });
  } catch (error) {
    console.error("Error occurred while counting adminlist data:", error);
    res.status(500).send("An error occurred while counting adminlist data");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});




app.get('/contributions/Pending', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const contributionsCollection = database.collection("contributions");

    // 查询数据，使用投影操作符来指定要返回的字段
    const pendingContributions = await contributionsCollection.find({ "status": "Pending" }).project({
      "_id": 0, // 排除 id 字段
      "user_id": 1,
      "action": 1,
      "date": 1,
      "data": 1
    }).toArray();

    // 发送符合条件的数据作为 JSON 格式响应
    res.json(pendingContributions);
  } catch (error) {
    console.error("Error occurred while fetching pending contributions:", error);
    res.status(500).send("An error occurred while fetching pending contributions");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

//查询character 列表
app.get('/characters', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const charactersCollection = database.collection("characters");

    // 查询数据，使用投影操作符来指定要返回的字段
    const characters = await charactersCollection.find({}, { projection: { "_id": 0, "name": 1, "subtitle": 1 } }).toArray();

    // 发送符合条件的数据作为 JSON 格式响应
    res.json(characters);
  } catch (error) {
    console.error("Error occurred while fetching characters:", error);
    res.status(500).send("An error occurred while fetching characters");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});



app.put('/contributions/rejectPending', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const contributionsCollection = database.collection("contributions");

    // 查找 status 为 "Pending" 的条目并将其更新为 "Rejected"
    const result = await contributionsCollection.updateMany(
      { "status": "Pending" },
      { $set: { "status": "Rejected" } }
    );

    // 检查是否有条目被更新
    if (result.modifiedCount > 0) {
      res.status(200).send(`${result.modifiedCount} contributions set to Rejected`);
    } else {
      res.status(404).send("No contributions with status Pending found");
    }
  } catch (error) {
    console.error("Error occurred while rejecting pending contributions:", error);
    res.status(500).send("An error occurred while rejecting pending contributions");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

app.put('/contributions/setPending', async (req, res) => {
  try {
    // 连接 MongoDB
    await client.connect();

    // 获取数据库和集合
    const database = client.db("website_database");
    const contributionsCollection = database.collection("contributions");

    // 查找 status 为 "Rejected" 的条目并将其更新为 "Pending"
    const result = await contributionsCollection.updateMany(
      { "status": "Rejected" },
      { $set: { "status": "Pending" } }
    );

    // 检查是否有条目被更新
    if (result.modifiedCount > 0) {
      res.status(200).send(`${result.modifiedCount} contributions set to Pending`);
    } else {
      res.status(404).send("No contributions with status Rejected found");
    }
  } catch (error) {
    console.error("Error occurred while setting contributions to Pending:", error);
    res.status(500).send("An error occurred while setting contributions to Pending");
  } finally {
    // 关闭 MongoDB 连接
    await client.close();
  }
});

//test history website_database
app.get('/processed-contributions', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const database = client.db("website_database"); // Replace with your database name
    const contributionsCollection = database.collection("contributions");

    // Query the data, selecting only contributions with status "Approved"
    const approvedContributions = await contributionsCollection.find({ status: "Approved" }).toArray();

    // Group contributions by id and sort them by date
    const groupedContributions = {};
    approvedContributions.forEach(contribution => {
      const id = contribution.data.id;
      if (!(id in groupedContributions)) {
        groupedContributions[id] = [];
      }
      groupedContributions[id].push(contribution);
    });
    for (const id in groupedContributions) {
      groupedContributions[id].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Build the processed contributions list
    const processedContributions = [];
    for (const id in groupedContributions) {
      const contributions = groupedContributions[id];
      const processedContribution = {
        id,
        data: []
      };

      // Add "previous_data" field
      for (let i = 0; i < contributions.length; i++) {
        const currentContribution = contributions[i];
        const previousData = i > 0 ? contributions[i - 1].data : null;

        const modifiedData = { ...currentContribution.data };
        delete modifiedData.id;

        const previousDataObj = {};
        for (const key in modifiedData) {
          if (Object.hasOwnProperty.call(modifiedData, key)) {
            previousDataObj[key] = previousData ? previousData[key] : null;
          }
        }

        // Check if we need to add missing fields from modified_data to previous_data
        if (i === contributions.length - 1) {
          for (const key in modifiedData) {
            if (!(key in previousDataObj)) {
              for (let j = i - 1; j >= 0; j--) {
                if (contributions[j].data[key]) {
                  previousDataObj[key] = contributions[j].data[key];
                  break;
                }
              }
            }
          }
        }

        processedContribution.data.push({
          id: currentContribution.data.id,
          date: currentContribution.date,
          action: currentContribution.action,
          user_id: currentContribution.user_id._id,
          reviewed_by: currentContribution.reviewed_by ? currentContribution.reviewed_by._id : null,
          previous_data: previousDataObj,
          modified_data: modifiedData
        });
      }

      processedContributions.push(processedContribution);
    }

    // Return the processed contributions list
    res.json(processedContributions);
  } catch (error) {
    console.error("Error occurred while processing contributions:", error);
    res.status(500).send("An error occurred while processing contributions");
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});





// 根路由
app.get('/', (req, res) => {
  res.send('Hello My World!')
});

// 启动 Express 服务器
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
