import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import { CardModel } from "../../model/dto/card.model";
import { forkJoin, switchMap } from "rxjs";
import {ByIdCommand} from "../../model/command/by-id.command";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.less']
})
export class CardDetailsComponent implements OnInit {
  card!: CardModel;

  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider,
              public router: Router) {
  }

  ngOnInit(): void {
    this.fetchCardDetails();
  }

  fetchCardDetails(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const byIdCommand: ByIdCommand = new ByIdCommand()
        byIdCommand.id = params.get('id');
        if (!byIdCommand.id) {
          throw new Error('ID parameter is missing');
        }
        return forkJoin({
          card: this.cardProvider.getCardById(byIdCommand),
          rulings: this.cardProvider.getCardRulings(byIdCommand),
        });
      })
    ).subscribe(data => {
      this.card = data.card;
      this.card.rulings = data.rulings;
    });
  }

  navigateToSetCardList(setCode: string) {
    this.router.navigate(['/set-list', setCode])
  }
}
