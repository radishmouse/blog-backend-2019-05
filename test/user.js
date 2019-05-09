const expect = require('chai').expect;
const User = require('../models/User');

describe.skip(`Model: User`, () => {
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
  describe(`#from`, () => {
    it(`should create a User instance from an object`, () => {
      const result = {
        username: 'the_milla',
        hash: '1234abcd',
        firstname: 'milla',
        lastname: 'aquino'
      };
      const u = User.from(result);
      expect(u.username).to.equal(result.username);
      expect(u.hash).to.equal(result.hash);
      expect(u.firstname).to.equal(result.firstname);
      expect(u.lastname).to.equal(result.lastname);      
      
    });
  });
  describe(`#getById`, () => {
    it(`should get one user`, async () => {
      const uname = 'radishmouse';
      const phash = '12345';
      const fname = 'chris';
      const lname = 'aquino';
      const u = new User(
        uname, phash, fname, lname
      );    
      const id = await u.save();

      const theUser = await User.getById(id);
      expect(theUser).to.be.an.instanceOf(User);

      expect(theUser.id).to.equal(id);
      expect(theUser.username).to.equal(uname);
      expect(theUser.hash).to.equal(phash);
      expect(theUser.firstname).to.equal(fname);
      expect(theUser.lastname).to.equal(lname);
      
    });
  });
  describe(`#getAll`, () => {
    it(`should get all users in database`, async () => {      
      const users = await User.getAll();
      expect(users).to.be.an('array');
      users.forEach(u => {
        expect(u).to.be.an.instanceOf(User);
      });
    });
  });
  describe(`#deleteById`, () => {
    it('should delete a single user', async () => {      
      const uname = 'radishmouse';
      const phash = '12345';
      const fname = 'chris';
      const lname = 'aquino';
      const u = new User(
        uname, phash, fname, lname
      );    
      const id = await u.save();
      
      const originalUsers = await User.getAll();
      const originalLength = originalUsers.length;    

      const result = await User.deleteById(id);
      expect(result).to.equal(id);

      const resultingUsers = await User.getAll();
      const resultingLength = resultingUsers.length;    

      expect(resultingLength).to.equal(originalLength - 1);
    });
    
  });  
});
