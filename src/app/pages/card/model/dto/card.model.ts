export interface CardModel {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  name: string;
  lang: string;
  released_at: Date;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris: ImageUris;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  power: string;
  toughness: string;
  colors: string[];
  color_indicator: string[];
  color_identity: string[];
  keywords: any[];
  all_parts: AllPart[];
  legalities: Legalities;
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id: string;
  border_color: string;
  frame: string;
  frame_effects: string[];
  security_stamp: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank: number;
  preview: Preview;
  prices: Prices;
  related_uris: RelatedUris;
  purchase_uris: PurchaseUris;
  rulings: RulingModel[];
}

export interface RulingModel {
  object: string;
  oracle_id: string;
  source: string;
  published_at: Date;
  comment: string;
}

export interface AllPart {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export interface Legalities {
  standard: string;
  future: string;
  historic: string;
  gladiator: string;
  pioneer: string;
  explorer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  oathbreaker: string;
  brawl: string;
  historicbrawl: string;
  alchemy: string;
  paupercommander: string;
  duel: string;
  oldschool: string;
  premodern: string;
  predh: string;
}

export interface Preview {
  source: string;
  source_uri: string;
  previewed_at: Date;
}

export interface Prices {
  usd: string;
  usd_foil: string;
  usd_etched: null;
  eur: string;
  eur_foil: string;
  tix: string;
}

export interface PurchaseUris {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
}

export interface RelatedUris {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
}
