const User = require('../models/user')
const { UserCollection, IdIncrementor } = require('../data/user_collection')

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
        userCollection.deleteUser(idToDelete)
        expect(userCollection.getUser(idToDelete)).toBeUndefined()
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
})

describe('IdIncrementor', () => {
  it("should return an Id", () => {
    const incrementor = new IdIncrementor()
    expect(incrementor.current).toEqual('00000')
  })

  it('should increment an id', () => {
    const incrementor = new IdIncrementor()
    incrementor.next
    expect(incrementor.current).toEqual('00001')
    incrementor.next
    expect(incrementor.current).toEqual('00002')
    incrementor.next
    expect(incrementor.current).toEqual('00003')
    incrementor.next
    expect(incrementor.current).toEqual('00004')
  })
})
