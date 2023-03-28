import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CardProvider } from "../../../../app-core/providers/card.provider";
import { CardModel } from "../../model/dto/card.model";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.less']
})
export class CardDetailsComponent implements OnInit {
  card!: CardModel

  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider) {
  }

  ngOnInit(): void {
    this.fetchCardDetails();
  }

  fetchCardDetails(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.cardProvider.getCardById(id)
        .subscribe(card => {
          this.card = card;
        });
    });
  }
}
