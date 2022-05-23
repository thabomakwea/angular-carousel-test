
export interface Settings {
    container: any;
    cards: any[];
    card: any;
    addCard(cardsContainer: any, card: any, direction: any): any;
    moveCards(container: any, cards: any[], card: any, direction: any): any;
}