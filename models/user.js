/**
 * User class
 * The user JSON can just be id, first name, last name, zip code, and email address.
 */
class User {
  constructor({ id, email, firstName, lastName, zipCode }, logger) {
    if (!email) this._handleInvalidEmail(email)
    this.update({ id, email, firstName, lastName, zipCode })
    this._logger = logger
  }

  get id() {
    return this._id
  }
  get email() {
    return this._email
  }
  get firstName() {
    return this._firstName
  }
  get lastName() {
    return this._lastName
  }
  get zipCode() {
    return this._zipCode
  }

  set id(id) {
    this._id = id
  }
  set firstName(name) {
    this._firstName = name
  }
  set lastName(name) {
    this._lastName = name
  }
  set zipCode(code) {
    this._zipCode = code
  }
  set email(email) {
    if (!email) this._handleInvalidEmail(email)
    this._email = email
  }

  update({ id, email, firstName, lastName, zipCode }) {
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

  toJSON() {
    return JSON.stringify(this._values())
  }

  _handleInvalidEmail = (email) => {
    this._logger &&
      this._logger.log(
        'error',
        'Invalid email',
        new Error(`Invalid email provided: ${email}`)
      )
    throw new Error('Invalid email')
  }
}

module.exports = User
