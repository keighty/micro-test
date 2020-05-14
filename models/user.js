// The user JSON can just be id, first name, last name, zip code, and email address.
class User {
  constructor({ email, firstName, lastName, zipCode }) {
    if (!email) {
      throw new Error('Email is required')
    }

    this.id = Math.floor(Math.random() * Math.floor(1000))
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.zipCode = zipCode
  }

  set email(email) {
    this.email = email
  }

  set firstName(name) {
    this.firstName = name
  }

  set lastName(name) {
    this.lastName = name
  }

  set zipCode(code) {
    this.zipCode = code
  }
}

module.exports = User
