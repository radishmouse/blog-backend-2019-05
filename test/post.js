const expect = require('chai').expect;
const Post = require('../models/Post');

describe(`Model: Post`, () => {
  describe(`#constructor`, () => {
    it(`should accept a title, content, and authorId`, () => {
      const title = 'post title';
      const content = 'lorem ipsum';
      const authorid = 1;
      const p = new Post(
        title, content, authorid
      );

      expect(p.title).to.equal(title);
      expect(p.content).to.equal(content);
      expect(p.authorid).to.equal(authorid);
    });
  });
  describe(`.save`, () => {
    it(`should return the new id`, async () => {
      const title = 'post title';
      const content = 'lorem ipsum';
      const authorid = 1;
      const p = new Post(
        title, content, authorid
      );
      const id = await p.save();
      expect(id).to.be.a('number');
    });
  });
  describe(`#from`, () => {
    it(`should create a new Post instance from an object`, () => {      
      const result = {
        title: 'all about my oakley',
        content: 'lorem ipsum oakley ipsum',
        authorid: 1
      };
      const p = Post.from(result);
      expect(p.title).to.equal(result.title);
      expect(p.content).to.equal(result.content);
      expect(p.authorid).to.equal(result.authorid);
    });
  });
  describe(`#getById`, () => {
    it(`should get one post`, async () => {
      const title = 'post title';
      const content = 'lorem ipsum';
      const authorid = 1;
      const p = new Post(
        title, content, authorid
      );
      const id = await p.save();

      const thePost = await Post.getById(id);
      expect(thePost).to.be.an.instanceOf(Post);
      
      expect(thePost.title).to.equal(title);
      expect(thePost.content).to.equal(content);
      expect(thePost.authorid).to.equal(authorid);
      
    });
  });
  describe(`#getAll`, () => {
    it(`should get all posts in database`, async () => {
      const posts = await Post.getAll();
      expect(posts).to.be.an('array');
      posts.forEach(p => {
        expect(p).to.be.an.instanceOf(Post);
      });
    });
  });
  describe(`#getByAuthorId`, () => {
    
  });
});
