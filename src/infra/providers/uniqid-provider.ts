import uniqid from 'uniqid'

export class UniqueIdProvider {
  generateUniqueId(): string {
    return uniqid.process()
  }
}
