class IdGenerator {
  ID_LENGTH = 5

  constructor() {
    this._currentId = 0
  }

  get current() {
    return this._toString()
  }

  get next() {
    this._currentId++
    return this._toString()
  }

  _toString() {
    return `${this._currentId}`.padStart(this.ID_LENGTH, '0')
  }
}

module.exports = IdGenerator
