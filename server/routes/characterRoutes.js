const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// 添加新角色
router.post('/add', characterController.addCharacter);

// 编辑角色
router.put('/:id', characterController.editCharacter);

// 获取角色信息
router.get('/:id', characterController.getCharacterById);

module.exports = router;
