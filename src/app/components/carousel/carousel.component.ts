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
    // Load default settings
    this.loadSettings()
  }
  previousCard() {
    // Get current state | DOM
    this.useState('previous')
    // On previouse button click: Call Move cards function
    this.settings.moveCards(this.settings.container, this.settings.cards || [], this.settings.card, 'left')
     // On previouse button click: Call add card function
    this.settings.addCard(this.settings.container, this.settings.card, 'left' ) 
  }
  nextCard() {
    // Get current state | DOM
    this.useState('next')
    // On next button click: Call Move cards function
    this.settings.moveCards(this.settings.container, this.settings.cards || [], this.settings.card, 'right')
  }
  useState(state: any) {
    // Get the carousel wrapper / container
    this.settings.container = this._el.nativeElement.querySelector('.carousel .row')
    // Get the carousel cards
    this.settings.cards = this._el.nativeElement.querySelectorAll('.carousel .row > div')

    switch (state) {
      // CASE: PREVIOUS  If state is previous
      case 'previous':
        // Card to animate is first card
        this.settings.card = this._el.nativeElement.querySelectorAll('.carousel .row > div')[0]
        break;
      // CASE: NEXT  If state is next
      case 'next':
        // Card to animate is last card
        this.settings.card = this._el.nativeElement.querySelectorAll('.carousel .row > div')[this.settings.cards.length - 1]
        break;
      default:
        break;
    }
  }
  loadSettings() {
    // Default settings
    this.settings = {
      container: null,
      cards: [],
      card: null,
      addCard: (cardsContainer: any, card: any, direction: any) => {
        cardsContainer.insertAdjacentHTML('beforeend', card.outerHTML)
      },
      moveCards: (container: any, cards: any[], card: any, direction: any) => {
        switch (direction) {
          // CASE: LEFT: If direction is left | Move cards left
          case 'left':
            // Add CSS3 class | Animate the first card 
            cards[0].className = "col-2 box move-out-from-left";
            setTimeout(function () {
               // Add CSS3 classes | Animate each card by order / sequence
              [1, 2, 3, 4].forEach(cardNumber => {
                cards[cardNumber].className = (cardNumber === 3 ? 'col-4 ' : 'col-2 ') + "box move-to-position" + String(cardNumber) + "-from-" + direction;
              });
               // Remove the last card from the DOM + memory
              cards[0].remove()
            }, 5);
            break;
           // CASE: RIGHT:  If direction is right | Move cards right
          case 'right':
            // Add CSS3 class | Animate the last card 
            cards[4].className = "col-2 box move-out-from-" + direction;
            setTimeout(function () {
              card.classList.remove("box--hide");
              // Remove last card
              cards[cards.length - 1].remove();
              // insert new card from first child
              container.insertBefore(card, container.firstChild);
              // Animate the new card
              card.className = "col-2 box move-to-position1-from-" + direction;
               // Add CSS3 classes | Animate each card by order /  sequence
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
