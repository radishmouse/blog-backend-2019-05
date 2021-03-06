const db = require('../db');


module.exports = class Post {
  constructor(title, content, authorid) {
    this.title = title;
    this.content = content;
    this.authorid = authorid;
  }

  static from(obj) {
    const p = new Post();
    Object.keys(obj).forEach(k => p[k] = obj[k]);
    return p;
  }

  static async getAll() {
    const results = await db.any(`select * from posts`);
    return results.map(Post.from);
  }

  static async getAllAsObject() {
    const results = await db.any(`select * from posts`);
    return results.map(Post.from).reduce((acc, p) => {
      const simpleP = {
        title: p.title,
        content: p.content
      };
      return {
        ...acc,
        [p.id]: simpleP
      };
    }, {});
  }
  

  static async getById(id) {
    const result = await db.one(`
select * from posts where id=$1
    `, [id]);
    const post = Post.from(result);
    console.log(post);
    return post;
  }

  static async getByAuthorId(id) {
    const results = await db.any(`select * from posts where authorid=$1`, [id]);
    return results.map(Post.from);
  }

  static async deleteById(idToDelete) {
    const {id} = await db.one(`
delete from posts where id=$1 returning id
    `, [idToDelete]);    
    return id;
  }

  async save() {
    const {id} = await db.one(`
insert into posts
  (title, content, authorid)
values
  ($1, $2, $3)
returning id
    `, [this.title, this.content, this.authorid]);
    return id;
  }
};
