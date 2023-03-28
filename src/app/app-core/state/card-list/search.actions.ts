export class SetInput {
  static readonly type = '[CardList] Set Input';

  constructor(public input: string) {
  }
}

export class SetCards {
  static readonly type = '[CardList] Set Cards';

  constructor(public cards: any[]) {
  }
}
