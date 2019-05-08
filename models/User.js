const db = require('../db');


module.exports = class User {
  constructor(username, hash, firstname, lastname) {
    this.username = username;
    this.hash = hash;
    this.firstname = firstname;
    this.lastname = lastname;
  }
  
  async save() {
    const {id} = await db.one(`
insert into users
  (username, firstname, lastname, hash)
values
  ($1, $2, $3, $4)
returning id
    `, [this.username, this.hash, this.firstname, this.lastname]);
    return id;
  }
}
