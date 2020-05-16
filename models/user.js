// The user JSON can just be id, first name, last name, zip code, and email address.
class User {
  constructor({ id, email, firstName, lastName, zipCode }) {
    if (!email) throw INVALID_EMAIL_ERROR
    this._id = id
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
  set firstName(name) { this._firstName = name }
  set lastName(name) { this._lastName = name }
  set zipCode(code) { this._zipCode = code }
  set email(email) { 
    if (!email) throw INVALID_EMAIL_ERROR
    this._email = email
  }

  update({id, email, firstName, lastName, zipCode}) {
    this._id = id
    this._email = email || this._email // fallback to existing email
    this._firstName = firstName
    this._lastName = lastName
    this._zipCode = zipCode
  }

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

const INVALID_EMAIL_ERROR = new Error('Invalid email')

module.exports = User
