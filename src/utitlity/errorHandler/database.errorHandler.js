export default class DatabaseError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
