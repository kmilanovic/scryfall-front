import { Action, State, StateContext } from "@ngxs/store";
import { SearchStateModel } from "./search-state.model";
import { SetCards, SetInput } from "./search.actions";

export interface SearchState {
  searchTerm: string;
}

@State<SearchStateModel>({
  name: 'cardList',
  defaults: {
    input: '',
    cards: []
  }
})

export class SearchState {
  @Action(SetInput)
  setInput(ctx: StateContext<SearchStateModel>, {input}: SetInput) {
    ctx.patchState({input});
  }

  @Action(SetCards)
  setCards(ctx: StateContext<SearchStateModel>, {cards}: SetCards) {
    ctx.patchState({cards});
  }
}



