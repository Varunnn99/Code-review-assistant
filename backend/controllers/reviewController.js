const multer = require('multer');
const fs = require('fs');
const { analyzeCode } = require('../utils/gemini');
const Report = require('../models/Report');

const upload = multer({ dest: 'uploads/' });

exports.uploadAndReview = [
  upload.single('codeFile'),
  async (req, res) => {
    try {
      console.log('Authenticated upload request:', req.file);
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const userId = req.user.userId; // From auth middleware
      const codeContent = fs.readFileSync(req.file.path, 'utf-8');
      console.log('File content length:', codeContent.length);
      
      const review = await analyzeCode(codeContent);
      console.log('Review generated successfully');
      
      const report = await Report.create({
        userId,
        fileName: req.file.originalname,
        reviewContent: review,
      });
      console.log('Report saved to database');
      
      fs.unlinkSync(req.file.path); // Clean up temp file
      
      res.json({ report });
    } catch (err) {
      console.error('Authenticated upload error:', err);
      try { if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); } catch {}
      const status = err?.status || err?.response?.status;
      const mapped = status === 429 || status === 503 ? status : 500;
      res.status(mapped).json({ error: err.message, status: mapped });
    }
  }
];

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({ 
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    console.log('getReportById called with:', { id: req.params.id, userId: req.user.userId });
    const report = await Report.findOne({ 
      where: { id: req.params.id, userId: req.user.userId } 
    });
    console.log('Report found:', report ? 'Yes' : 'No');
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    console.error('Error in getReportById:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.anonymousUpload = [
  upload.single('codeFile'),
  async (req, res) => {
    try {
      console.log('Anonymous upload request:', req.file);
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const codeContent = fs.readFileSync(req.file.path, 'utf-8');
      console.log('File content length:', codeContent.length);
      
      const review = await analyzeCode(codeContent);
      console.log('Review generated successfully');
      
      fs.unlinkSync(req.file.path); // Clean up
      
      res.json({ reviewContent: review, fileName: req.file.originalname });
    } catch (err) {
      console.error('Anonymous upload error:', err);
      try { if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); } catch {}
      const status = err?.status || err?.response?.status;
      const mapped = status === 429 || status === 503 ? status : 500;
      res.status(mapped).json({ error: err.message, status: mapped });
    }
  }
];