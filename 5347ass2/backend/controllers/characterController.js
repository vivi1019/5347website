const Character = require('../models/Character');
const Contribution = require('../models/Contribution');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

// 添加新角色
exports.addCharacter = async (req, res) => {
    try {
        const {
            id,
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
            user_id
        } = req.body;

        // 检查是否缺少任何必填属性
        const requiredFields = [
            'id', 'name', 'subtitle', 'description', 'image_url',
            'strength', 'speed', 'skill', 'fear_factor',
            'power', 'intelligence', 'wealth'
        ];
        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `The field '${field}' is required` });
            }
        }

        // 检查是否存在具有相同 id 的角色
        const existingCharacter = await Character.findOne({ id });
        if (existingCharacter) {
            return res.status(400).json({ error: 'Character with this ID already exists' });
        }

        // 检查用户是否是管理员
        const isAdmin = await Admin.findById(user_id);

        // 设置贡献状态
        let status = 'Pending';
        let reviewed_by = null;

        if (isAdmin) {
            status = 'Approved';
            reviewed_by = user_id; // 如果用户是管理员，则审核者是用户本身
        }

        // 创建新的角色
        const newCharacter = new Character({
            id,
            active: true, // 默认激活
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

        // 保存角色，如果是管理员，则直接保存，否则跳过保存角色步骤
        if (isAdmin) {
            await newCharacter.save();
        }

        // 创建贡献记录
        const newContribution = new Contribution({
            contribution_id: new mongoose.Types.ObjectId().toString(),
            user_id: { _id: user_id }, // 使用请求中的 user_id
            action: 'AddCharacter',
            status, // 如果用户是管理员，则自动批准
            reviewed_by: reviewed_by ? { _id: reviewed_by } : null, // 如果用户是管理员，则审核者是用户本身，否则为 null
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

        // 检查是否有任何更改
        const hasChanges = Object.keys(updates).some(key => character[key] !== updates[key]);
        if (!hasChanges) {
            return res.status(400).json({ error: 'No changes made to the character' });
        }

        // 创建贡献记录
        const newContribution = new Contribution({
            contribution_id: new mongoose.Types.ObjectId().toString(), // 生成新的唯一贡献 ID
            user_id: { _id: user_id }, // 用户 ID
            action: 'EditCharacter',
            status: isAdmin ? 'Approved' : 'Pending', // 管理员自动批准
            reviewed_by: isAdmin ? { _id: user_id } : null, // 如果用户是管理员，则审核者是用户本身，否则为 null
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

// 批准贡献记录
exports.approveContribution = async (req, res) => {
    try {
        const { contribution_id, approved, user_id } = req.body;

        // 查找贡献记录
        const contribution = await Contribution.findOne({ contribution_id });
        if (!contribution) {
            return res.status(404).json({ error: 'Contribution not found' });
        }

        // 检查贡献记录的状态
        if (contribution.status !== 'Pending') {
            return res.status(400).json({ error: 'Contribution is not pending' });
        }

        // 检查用户是否是管理员
        const isAdmin = await Admin.findById(user_id);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Only admins can approve contributions' });
        }

        // 更新贡献记录的状态
        contribution.status = approved ? 'Approved' : 'Rejected';
        contribution.reviewed_by = { _id: user_id };
        await contribution.save();

        if (approved) {
            // 如果批准，将贡献记录中的数据应用到角色中
            const { id, ...updates } = contribution.data;
            const character = await Character.findOne({ id });
            if (character) {
                Object.keys(updates).forEach(key => {
                    character[key] = updates[key];
                });
                await character.save();
            } else if (contribution.action === 'AddCharacter') {
                const newCharacter = new Character({
                    id,
                    ...updates,
                    active: true // 角色被批准后激活
                });
                await newCharacter.save();
            }
        }

        res.status(200).json({ message: `Contribution ${approved ? 'approved' : 'rejected'} successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
