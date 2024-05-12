const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// 添加新角色
router.post('/add', characterController.addCharacter);

// 编辑角色
router.put('/:id', characterController.editCharacter);

// 获取所有角色
router.get('/', characterController.getAllCharacters);

// 获取单个角色信息
router.get('/:id', characterController.getCharacterById);

// 批准贡献记录
router.post('/approve', characterController.approveContribution);

module.exports = router;
