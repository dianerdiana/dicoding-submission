export abstract class BaseEntity<ID> {
  protected constructor(
    protected readonly id: ID,
    protected readonly createdAt: Date,
    protected updatedAt: Date,
  ) {}

  getId(): ID {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  protected touch() {
    this.updatedAt = new Date();
  }
}
