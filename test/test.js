const expect = require('chai').expect;
const User = require('../models/User');

describe(`Users`, () => {
  describe(`#constructor`, () => {
    it(`should accept a username, hash, firstname, lastname`, () => {
      const uname = 'radishmouse';
      const phash = '12345';
      const fname = 'chris';
      const lname = 'aquino';
      const u = new User(
        uname, phash, fname, lname
      );

      expect(u.username).to.equal(uname);
      expect(u.hash).to.equal(phash);
      expect(u.firstname).to.equal(fname);
      expect(u.lastname).to.equal(lname);
    });
  });
  describe(`.save`, () => {
    it(`should return the new id`, async () => {
      const uname = 'radishmouse';
      const phash = '12345';
      const fname = 'chris';
      const lname = 'aquino';
      const u = new User(
        uname, phash, fname, lname
      );    
      const id = await u.save();
      expect(id).to.be.a('number');
    });
  });
  // describe(`#getById`, () => {
    // it(`should get one user`)
  // });
});