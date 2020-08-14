class CardList {
    constructor(selector, api, counter, userAuth, card) {
        this.selector = selector;
        this.api = api;
        this.counter = counter;
        this.userAuth = userAuth;
        this.card = card;
        this.followEvent = this.followEvent.bind(this)
    }
    addEvent() {
        this.selector.addEventListener('click', this.followEvent)
    }
    eventFavorites = (target) => {
            const cardId = target.closest(this.card).getAttribute('data-id');
            target.setAttribute('disabled', true);

        if(target.hasAttribute('data-out')) {
                this.api.addFavorites(cardId)
                    .then( e => {
                        target.querySelector('.icon-favorite').classList.add('icon-favorite_active');
                        target.removeAttribute('data-out');
                    })
                    .finally(e => {
                        target.removeAttribute('disabled');
                    })
            } else {
                this.api.removeFavorites(cardId)
                    .then( e => {
                        target.querySelector('.icon-favorite').classList.remove('icon-favorite_active');
                        target.removeAttribute('data-out');
                    })
                    .finally(e => {
                        target.removeAttribute('disabled');
                    })
        }
    }
    eventPurchpurchases = (target) => {
            const cardId = target.closest(this.card).getAttribute('data-id');
            target.setAttribute('disabled', true);
            if(target.hasAttribute('data-out')) {
                this.api.addPurchases(cardId)
                    .then( e => {
                        target.innerHTML = `<span class="icon-check button__icon"></span> Рецепт добавлен`;
                        target.classList.remove('button_style_light-blue');
                        target.classList.add('button_style_light-blue-outline');
                        target.removeAttribute('data-out');
                        this.counter('add');
                    })
                    .finally(e => {
                        target.removeAttribute('disabled');
                    })
            } else {
                this.api.removePurchases(cardId)
                    .then( e => {
                        target.innerHTML = `<span class="icon-plus button__icon"></span>Добавить в покупки`;
                        target.classList.add('button_style_light-blue');
                        target.classList.remove('button_style_light-blue-outline');
                        target.setAttribute('data-out', true);
                        this.counter('remove')
                    })
                    .catch( e => {
                        console.log(e)
                    })
                    .finally(e => {
                        target.removeAttribute('disabled');
                    })
            }
    }
    followEvent (e)  {
        e.preventDefault();
        if (this.userAuth) {
            this.eventsUserAuth(e)
        } else {
            this.eventsUserNotAuth(e)
        }
    }
    eventsUserAuth (e) {
        const target = e.target.closest('button');
        if (target && target.name === 'purchpurchases') {
            this.eventPurchpurchases(target)
        }
        if (target && target.name === 'favorites') {
            this.eventFavorites(target)

        }
    }
    eventsUserNotAuth (e) {
        const target = e.target.closest('button');
        if (target && target.name === 'purchpurchases') {
            this.eventPurchpurchases(target)
        }
    }
}
