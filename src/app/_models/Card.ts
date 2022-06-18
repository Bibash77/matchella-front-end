import {CardCategory} from "./card-category";

export class Card {
  id:              number;
  title:           string;
  cardType:        string;
  detailBody:      string;
  cardExpiryDate:  Date;
  maxAllowedMatch: number;
  cardCategoryDTO: CardCategory;
  cardImage:       string;
}
