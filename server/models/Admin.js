const mongoose = require('mongoose');

// 定义管理员模式
const adminSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true } // 管理员的唯一标识符，必须为 ObjectId 且为必填字段
});

// 导出管理员模型
module.exports = mongoose.model('Admin', adminSchema);
