import { Injectable } from '@angular/core';
import {SetModel} from "./model/dto/set.model";

@Injectable({
  providedIn: 'root'
})
export class SetService {
  private selectedSet: SetModel | null = null;

  setSelectedSet(set: SetModel) {
    this.selectedSet = set;
  }

  getSelectedSet(): SetModel | null {
    return this.selectedSet;
  }
}
