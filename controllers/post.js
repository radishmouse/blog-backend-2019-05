
const Post = require('../models/Post');

module.exports.create = async (req, res) => {
  const post = Post.from(req.body);
  const id = await post.save();
  res.json({
    message: 'success',
    payload: {
      id
    }
  });
};

module.exports.getAll = async (req, res) => {
  const posts = await Post.getAllAsObject();
  res.json({
    message: 'success',
    payload: {
      posts
    }
  });  
};

module.exports.getOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.getById(id);
  res.json({
    message: 'success',
    payload: {
      post
    }
  });    
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  res.status(400).json({
    error: 'not implemented'
  });
};

module.exports.deleteOne =  async (req, res) => {
  const { id } = req.params;
  const result = await Post.deleteById(id);  
  res.json({
    message: 'success',
    payload: {
      id
    }
  });
};
