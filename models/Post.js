const db = require('../db');


module.exports = class Post {
  constructor(title, content, authorid) {
    this.title = title;
    this.content = content;
    this.authorid = authorid;
  }

  static from(obj) {
    const p = new Post();
    Object.keys(p).forEach(k => p[k] = obj[k]);
    return p;
  }

  static async getById(id) {
    const result = await db.one(`
select * from posts where id=$1
    `, [id]);
    const post = Post.from(result);
    return post;
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
