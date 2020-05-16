// The user JSON can just be id, first name, last name, zip code, and email address.
class User {
  constructor({ email, firstName, lastName, zipCode }) {
    if (!email) {
      throw new Error('Email is required')
    }

    this._email = email
    this._firstName = firstName
    this._lastName = lastName
    this._zipCode = zipCode
  }

  get id() { return this._id }
  get email() { return this._email }
  get firstName() { return this._firstName }
  get lastName() { return this._lastName }
  get zipCode() { return this._zipCode }

  set id(id) { this._id = id }
  set email(email) { this._email = email }
  set firstName(name) { this._firstName = name }
  set lastName(name) { this._lastName = name }
  set zipCode(code) { this._zipCode = code }

  _values() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      zipCode: this.zipCode
    }
  }

  toJSON() { return JSON.stringify(this._values()) }
}

module.exports = User
