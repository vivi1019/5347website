const Character = require('../models/Character');
const Contribution = require('../models/Contribution');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

// 添加新角色
exports.addCharacter = async (req, res) => {
    try {
        const { id, name, subtitle, description, image_url, strength, speed, skill, fear_factor, power, intelligence, wealth, user_id } = req.body;

        // 检查是否存在具有相同 id 的角色
        const existingCharacter = await Character.findOne({ id });
        if (existingCharacter) {
            return res.status(400).json({ error: 'Character with this ID already exists' });
        }

        // 检查用户是否是管理员
        const isAdmin = await Admin.findById(user_id);

        // 如果是管理员
        let status = 'Pending';
        let reviewed_by = null;
        let active = false;

        if (isAdmin) {
            status = 'Approved';
            reviewed_by = user_id;
            active = true;
        }

        // 创建新的角色
        const newCharacter = new Character({
            id,
            active, // 如果用户是管理员，则角色默认激活
            name,
            subtitle,
            description,
            image_url,
            strength,
            speed,
            skill,
            fear_factor,
            power,
            intelligence,
            wealth,
        });

        // 保存角色
        await newCharacter.save();

        // 创建贡献记录
        const newContribution = new Contribution({
            contribution_id: new mongoose.Types.ObjectId().toString(),
            user_id, // 使用请求中的 user_id
            action: 'AddCharacter',
            status, // 如果用户是管理员，则自动批准
            reviewed_by,
            date: new Date(),
            data: req.body
        });

        // 保存贡献记录
        await newContribution.save();

        res.status(201).json({ message: 'Character added successfully and pending approval', character: newCharacter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 编辑现有角色
exports.editCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const user_id = req.body.user_id;

        // 查找角色
        const character = await Character.findOne({ id });
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        // 检查是否存在针对该角色的待处理贡献
        const pendingContribution = await Contribution.findOne({
            'data.id': id,
            status: 'Pending',
            action: 'EditCharacter'
        });
        if (pendingContribution) {
            return res.status(400).json({ error: 'There is already a pending contribution for this character' });
        }

        // 检查用户是否是管理员
        const isAdmin = await Admin.findById(user_id);

        // 创建贡献记录
        const newContribution = new Contribution({
            contribution_id: new mongoose.Types.ObjectId().toString(), // 生成新的唯一贡献 ID
            user_id: user_id, // 用户 ID
            action: 'EditCharacter',
            status: isAdmin ? 'Approved' : 'Pending', // 管理员自动批准
            reviewed_by: isAdmin ? user_id : null, // 审核者 ID
            date: new Date().toISOString(), // ISO 格式的日期
            data: { id, ...updates } // 包含所有更新的角色属性
        });

        // 保存贡献记录
        await newContribution.save();

        if (isAdmin) {
            // 如果是管理员，直接更新角色
            Object.keys(updates).forEach(key => {
                character[key] = updates[key];
            });
            await character.save();
            // 返回更新后的角色信息
            return res.status(200).json({ message: 'Character edited successfully', character });
        }

        // 如果不是管理员，返回待审批的消息和更新的数据
        res.status(200).json({ message: 'Character edit submitted and pending approval', data: { id, ...updates } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 获取所有角色
exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 获取单个角色信息
exports.getCharacterById = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findOne({ id });
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

