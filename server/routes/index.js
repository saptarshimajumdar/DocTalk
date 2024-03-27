const express = require('express');
const router = express.Router();
const fileRoutes = require('./uploadRoute');
const userRouter = require('./userRoute');
const chatRouter = require('./chatRoute');

router.use('/user', userRouter);
router.use('/file', fileRoutes);
router.use('/chat',chatRouter);
module.exports = router;
