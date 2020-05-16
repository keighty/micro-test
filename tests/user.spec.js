const User = require('../models/user')

describe('User', () => {
  it('return a user instance', () => {
    const testUserData = { email: "bar@example.com" }
    const user = new User(testUserData)

    expect(user).toBeDefined()
    expect(user.constructor.name).toEqual("User")
  })

  it('should throw an error if no email is provided', () => {
    const createUserWithoutEmail = () => {
      new User()
    }

    expect(createUserWithoutEmail).toThrow()
  })

  describe('properties', () => {
    let user;
    beforeEach(() => {
      const testUserData = { email: "foo@example.com" }
      user = new User(testUserData)
    })

    it('should get and set a firstName', () => {
      expect(user.firstName).toBeUndefined()
      user.firstName = 'foo'
      expect(user.firstName).toEqual('foo')
    })

    it('should get and set a lastName', () => {
      expect(user.lastName).toBeUndefined()
      user.lastName = 'bar'
      expect(user.lastName).toEqual('bar')
    })

    it('should get and set a zipCode', () => {
      expect(user.zipCode).toBeUndefined()
      user.zipCode = '00000'
      expect(user.zipCode).toEqual('00000')
    })

    it('should get and set an email', () => {
      expect(user.email).toEqual('foo@example.com')
      user.email = 'bar@example.com'
      expect(user.email).toEqual('bar@example.com')
    })
  })

  it('should return valid JSON', () => {
    const testUserData = { email: "bar@example.com" }
    const user = new User(testUserData)
    expect(user.toJSON()).toEqual("{\"email\":\"bar@example.com\"}")
  })
})
