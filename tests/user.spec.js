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

    expect(createUserWithoutEmail).toThrow
  })

  it('should return valid JSON', () => {
    const testUserData = { email: "bar@example.com" }
    const user = new User(testUserData)
    expect(user.toJSON()).toEqual("{\"email\":\"bar@example.com\"}")
  })

  describe('properties', () => {
    let user;
    beforeEach(() => {
      const testUserData = { email: "foo@example.com" }
      user = new User(testUserData)
    })

    it('should get and set a firstName', () => {
      expect(user.firstName).toBeUndefined
      user.firstName = 'foo'
      expect(user.firstName).toEqual('foo')
    })

    it('should get and set a lastName', () => {
      expect(user.lastName).toBeUndefined
      user.lastName = 'bar'
      expect(user.lastName).toEqual('bar')
    })

    it('should get and set a zipCode', () => {
      expect(user.zipCode).toBeUndefined
      user.zipCode = '00000'
      expect(user.zipCode).toEqual('00000')
    })

    it('should get and set an email', () => {
      expect(user.email).toEqual('foo@example.com')
      user.email = 'bar@example.com'
      expect(user.email).toEqual('bar@example.com')
    })

    it('should throw if trying to set email to undefined', () => {
      const setEmailToUndefined = () => user.email = undefined

      expect(setEmailToUndefined).toThrow
    })
  })

  describe('update', () => {
    it("should update the user with provided data", () => {
      const user = new User({email: "example@example.com"})
      user.update({email: "free@example.com", lastName: "biz", firstName: "Buzz"})
      expect(user.firstName).toEqual('Buzz')
      expect(user.zipCode).toBeUndefined
    })

    it("should not overwrite a valid email address", () => {
      const user = new User({email: "example@example.com"})
      user.update({email: undefined})
      expect(user.email).toEqual('example@example.com')
    })
  })

  describe('logger', () => {
    it('should log an error when an invalid email address is provided', () => {
      const invalidEmailProvided = () => {
        const logger = { log: jest.fn() }
        new User({}, logger)
        expect(logger.log.mock.calls.length).toEqual(1)
      }
      expect(invalidEmailProvided).toThrow
    })
  })
})
