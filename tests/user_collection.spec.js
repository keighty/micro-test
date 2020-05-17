const User = require('../models/user')
const UserCollection = require('../data/user_collection')

describe('UserCollection', () => {
  describe('addUser', () => {
    let testUser
    let userCollection
    
    beforeEach(() => {
      testUserData = { email: 'foo@example.com' }
      userCollection = new UserCollection()
    })
    
    it("should save a user", () => {
      expect(userCollection.size).toEqual(0)
      userCollection.addUser(testUserData)
      expect(userCollection.size).toEqual(1)
    })
    
    it("should save a user with an id", () => {
      const user = userCollection.addUser(testUserData)
      expect(user.id).toEqual('00001')
    })
    
    it("should save multiple users, each with an id", () => {})
  })

  describe('CRUD operations -- single', () => {
    let userCollection
    beforeEach(() => {
      userCollection = new UserCollection()
      userCollection.addUser(new User({email: 'foo@example.com'}))
      userCollection.addUser(new User({email: 'bar@example.com'}))
      userCollection.addUser(new User({email: 'baz@example.com'}))
      userCollection.addUser(new User({email: 'zip@example.com'}))
      userCollection.addUser(new User({email: 'zap@example.com'}))
    })

    describe('GET', () => {
      it("should retrive the whole collection", () => {
        expect(userCollection.size).toEqual(5)
        expect(userCollection.all.length).toEqual(5)
      })
  
      it("should retrieve a user by id", () => {
        const foundUser = userCollection.getUser('00004')
        expect(foundUser.email).toEqual("zip@example.com")
      })
    })
    
    describe('DELETE', () => {
      it("should delete a user by id", () => {
        expect(userCollection.size).toEqual(5)
        const idToDelete = '00004'
        expect(userCollection.getUser(idToDelete)).toBeDefined
        userCollection.deleteUser(idToDelete)
        expect(userCollection.getUser(idToDelete)).toBeUndefined
        expect(userCollection.size).toEqual(4)
      })
    })
    
    describe("UPDATE", () => {
      it("should update a user by id", () => {
        const userIdToUpdate = '00003'
        userCollection.updateUser(userIdToUpdate, {lastName: 'biz'})
        const updatedUser = userCollection.getUser(userIdToUpdate)
        expect(updatedUser.lastName).toEqual('biz')
      })
    })
  })

  describe('CRUD operations -- bulk', () => {
    let userCollection
    const idListToTest = ['00001', '00002']

    beforeEach(() => {
      userCollection = new UserCollection()
      userCollection.addUser(new User({ email: 'foo@example.com' }))
      userCollection.addUser(new User({ email: 'bar@example.com' }))
      userCollection.addUser(new User({ email: 'baz@example.com' }))
      userCollection.addUser(new User({ email: 'zip@example.com' }))
      userCollection.addUser(new User({ email: 'zap@example.com' }))
    })

    describe('CREATE list', () => {
      it("should create a list of users in the collection", () => {
        const list = [
          { email: "zip@example.com" },
          { email: "zap@example.com" }
        ]
        const create2Users = userCollection.createUserList(list)
        expect(create2Users.length).toEqual(2)
      })
    })

    describe('GET list', () => {
      it("should retrive part of the collection", () => {
        expect(userCollection.size).toEqual(5)
        const get2Users = userCollection.getUserList(idListToTest)
        expect(get2Users.length).toEqual(2)
      })
    })

    describe('DELETE', () => {
      it("should delete a list of users", () => {
        expect(userCollection.size).toEqual(5)
        userCollection.deleteUserList(idListToTest)
        expect(userCollection.size).toEqual(3)
      })
    })

    describe("UPDATE", () => {
      it("should update a list of users", () => {
        const usersToUpdate = [{id: '00001', lastName: "baz"}, {id: '00002', lastName: "zip"} ]
        userCollection.updateUserList(usersToUpdate)
        const updatedUser = userCollection.getUser("00001")
        expect(updatedUser.lastName).toEqual('baz')
      })
    })
  })

  describe('Log user actions', () => {
    let userCollection
    let logger
    beforeEach(() => {
      logger = {
        log: jest.fn()
      }
      userCollection = new UserCollection(logger)
      userCollection.addUser({email: 'foo@example.com'})
    })

    it('should log the deletion of a user', () => {
      userCollection.deleteUser('00001')
      expect(logger.log.mock.calls.length).toBe(1)
    })

    it('should log an update to a user', () => {
      userCollection.updateUser('00001', {lastName: 'Baz'})
      expect(logger.log.mock.calls.length).toBe(1)
    })

    it('should log a missing user for RUD actions', () => {
      userCollection.updateUser('99999')
      userCollection.getUser('99999')
      userCollection.deleteUser('99999')
      expect(logger.log.mock.calls.length).toBe(3)
    })
  })
})
