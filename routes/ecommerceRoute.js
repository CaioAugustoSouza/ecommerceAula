const express = require('express');
const EcommerceController = require('../controllers/ecommerceController');
const ctrl = new EcommerceController();
const router = express.Router();

router.get('/', ctrl.ecommerceView);

module.exports = router;