export class InvalidPasswordError extends Error {
  constructor() {
    super('INVALID_PASSWORD')
    this.name = 'INVALID_PASSWORD'
  }
}
