
module.exports = class User {
  constructor(username, hash, firstname, lastname) {
    this.username = username;
    this.hash = hash;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
