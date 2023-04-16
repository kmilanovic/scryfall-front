import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import { CardModel } from "../../model/dto/card.model";
import { forkJoin, switchMap } from "rxjs";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.less']
})
export class CardDetailsComponent implements OnInit {
  card!: CardModel;

  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider) {
  }

  ngOnInit(): void {
    this.fetchCardDetails();
  }

  fetchCardDetails(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          throw new Error('ID parameter is missing');
        }
        return forkJoin({
          card: this.cardProvider.getCardById(id),
          rulings: this.cardProvider.getCardRullings(id),
        });
      })
    ).subscribe(data => {
      this.card = data.card;
      this.card.rulings = data.rulings;
    });
  }
}
