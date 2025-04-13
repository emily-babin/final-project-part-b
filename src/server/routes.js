const express = require('express');
const ItemController = require("./controllers/ItemController");
const CategoryController = require('./controllers/CategoryController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

router.post('/items', ItemController.store); // Create
router.get('/items', ItemController.index); // Read
router.patch('/items/:id', ItemController.update); // Update
router.delete('/items/:id', ItemController.destroy); // Delete

router.post('/categories', CategoryController.store); // Create
router.get('/categories', CategoryController.index); // Read
router.patch('/categories/:id', CategoryController.update); // Update
router.delete('/categories/:id', CategoryController.destroy); // Delete

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // store in public/images
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  // File filter (optional: restrict to images only)
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  
  // POST /upload
  router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const imageUrl = `/images/${req.file.filename}`;
    res.status(200).json({ success: true, imageUrl });
  });
  



module.exports = router;