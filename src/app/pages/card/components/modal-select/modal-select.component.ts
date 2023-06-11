import {Component, Input, OnDestroy} from '@angular/core';
import { MySetModel } from '../../../set/model/dto/my-set.model';
import {SaveCardInSetCommand} from "../../model/command/save-card-in-set.command";
import {CardProvider} from "../../../../app-core/providers/card.provider";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modal-select',
  template: `
    <div class="container">
      <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select a set" [(ngModel)]="selectedValue" class="centered-select">
        <nz-option *ngFor="let set of mySetList" [nzLabel]="set.name" [nzValue]="set.set_id"></nz-option>
      </nz-select>

      <div class="button-container">
        <button nz-button nzType="primary" (click)="addToSet()">Add to set</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      nz-select {
        width: 200px;
      }

      .button-container {
        margin-left: 16px;
      }
    `
  ]
})
export class ModalSelectComponent{
  @Input() mySetList!: MySetModel[];
  @Input() cardId!: string;
  selectedValue: number | null = null;

  constructor(private cardProvider: CardProvider,
              private message: NzMessageService) {}

  addToSet(): void {
    if (this.selectedValue !== null) {
      const command: SaveCardInSetCommand = {
        setId: this.selectedValue,
        cardId: this.cardId
      };
      this.cardProvider.saveCardInSet(command).subscribe({
        next: () => {
          this.message.success('Card saved in set successfully.');
        },
        error: (error) => {
          this.message.error('Error saving card in set. Please try again later.');
        }
      })
    }
  }
}
