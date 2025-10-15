const express = require('express');
const { uploadAndReview, getReports, getReportById, anonymousUpload } = require('../controllers/reviewController');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

const router = express.Router();

router.post('/upload', authenticate, ...uploadAndReview);
router.get('/reports', authenticate, getReports);
router.get('/reports/:id', authenticate, getReportById);
router.post('/anonymous-upload', ...anonymousUpload);
module.exports = router;