// routes/admin.js
const express = require('express');
const requireAuth = require('../middleware/authMiddleware');
const { addTest, addCollege, deleteCollege, viewAllResults } = require('../controllers/adminController');

const router = express.Router();

// Admin routes - protected with admin-only access
router.post('/test', requireAuth(['admin']), addTest);
router.post('/college', requireAuth(['admin']), addCollege);
router.delete('/college/:id', requireAuth(['admin']), deleteCollege);
router.get('/results', requireAuth(['admin']), viewAllResults);

module.exports = router;
