import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import data from './data.json';
import { Settings  } from './settings.interface'
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./styles/carousel.component.scss']
})

export class CarouselComponent implements OnInit {

  public carousel = data;
  public settings: Settings = { 
    container: null,
    cards: [],
    card: null,
    addCard: function () { return undefined; },
    moveCards: function () { return undefined; }
  }
  constructor(
    private _el: ElementRef,
  ) { }

  ngOnInit() {
    this.loadSettings()
  }
  previousCard() {
    this.useState('previous')
    this.settings.moveCards(this.settings.container, this.settings.cards || [], this.settings.card, 'left')
    this.settings.addCard(this.settings.container, this.settings.card, 'left' ) 
  }
  nextCard() {
    this.useState('next')
    this.settings.moveCards(this.settings.container, this.settings.cards || [], this.settings.card, 'right')
  }
  useState(state: any) {
    this.settings.container = this._el.nativeElement.querySelector('.carousel .row')
    this.settings.cards = this._el.nativeElement.querySelectorAll('.carousel .row > div')
    switch (state) {
      case 'previous':
        this.settings.card = this._el.nativeElement.querySelectorAll('.carousel .row > div')[0]
        break;
      case 'next':
        this.settings.card = this._el.nativeElement.querySelectorAll('.carousel .row > div')[this.settings.cards.length - 1]
        break;
      default:
        break;
    }
  }
  loadSettings() {
    this.settings = {
      container: null,
      cards: [],
      card: null,
      addCard: (cardsContainer: any, card: any, direction: any) => {
        cardsContainer.insertAdjacentHTML('beforeend', card.outerHTML)
      },
      moveCards: (container: any, cards: any[], card: any, direction: any) => {
        switch (direction) {
          case 'left':
            cards[0].className = "col-2 box move-out-from-left";
            setTimeout(function () {
              [1, 2, 3, 4].forEach(cardNumber => {
                cards[cardNumber].className = (cardNumber === 3 ? 'col-4 ' : 'col-2 ') + "box move-to-position" + String(cardNumber) + "-from-" + direction;
              });
              cards[0].remove()
            }, 5);
            break;
          case 'right':
            cards[4].className = "col-2 box move-out-from-" + direction;
            setTimeout(function () {
              card.classList.remove("box--hide");
              cards[cards.length - 1].remove();
              container.insertBefore(card, container.firstChild);
              card.className = "col-2 box move-to-position1-from-" + direction;
              [0, 1, 2, 3].forEach(cardNumber => {
                cards[cardNumber].className = (cardNumber === 1 ? 'col-4 ' : 'col-2 ') + "box move-to-position" + String(cardNumber) + "-from-" + direction;
              });
            }, 5);
            break;
          default:
            break;
        }
      },
    }
  }
}
