require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// const userRouter = require('./routers/user');
const postRouter = require('./routers/post');

// app.use('/user', userRouter);
app.use('/', postRouter);

app.listen(port, () => {
  console.log(`backend listening on port ${port}`);
});
