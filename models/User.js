const db = require('../db');


module.exports = class User {
  constructor(username, hash, firstname, lastname) {
    this.username = username;
    this.hash = hash;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  static from(obj) {
    const u = new User();
    Object.keys(obj).forEach(k => u[k] = obj[k]);
    return u;
  }

  static async getAll() {
    const results = await db.any(`select * from users`);
    return results.map(User.from);
  }

  static async getAllAsObject() {
    const results = await db.any(`select * from users`);
    return results.map(User.from).reduce((acc, u) => {
      return {
        ...acc,
        [u.id]: u
      };
    }, {});
  }
  
  static async getById(id) {
    const result = await db.one(`
select * from users where id=$1
    `, [id]);
    const user = User.from(result);
    return user;
    // too clever
    // return User.from(
          // await db.one(`
// select * from users where id=$1
    // `, [id])      
    // );
  }

  static async deleteById(idToDelete) {
    const {id} = await db.one(`
delete from users where id=$1 returning id
    `, [idToDelete]);    
    return id;
  }
  
  async save() {
    const {id} = await db.one(`
insert into users
  (username, hash, firstname, lastname)
values
  ($1, $2, $3, $4)
returning id
    `, [this.username, this.hash, this.firstname, this.lastname]);
    return id;
  }

};
