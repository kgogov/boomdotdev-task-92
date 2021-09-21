import EventEmitter from "eventemitter3";
import Card from "./Card";
import Notification from "./Notification";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const notifactionElement = document.querySelector('.notifications');
    const mainElement = document.querySelector('.main');

    const pizzas = [
      {
        type: Card.types.HAWAIIAN,
        price: 8.99,
      },
      {
        type: Card.types.PEPPERONI,
        price: 9.99,
      },
      {
        type: Card.types.MARGHERITA,
        price: 7.99,
      },
    ];

    pizzas.forEach((pizza) => {
      const card = new Card({ ...pizza });
      card.render();

      card.on(Card.events.ADD_TO_CART, (pizza) => {

        const notif = new Notification();
        notif.render(pizza);

        notifactionElement.appendChild(notif.container);
      });

      mainElement.appendChild(card.container);
    });

    this.addEventListenerToNotificationContainer();

    this.emit(Application.events.READY);
  }

  addEventListenerToNotificationContainer() {
    document.querySelector('.notifications').addEventListener('click', (e) => {

      if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
      }
    });
  }
}
