class MainCards {
    constructor(container, card, counter, api, userAuth,button) {
        this.container = container;
        this.card = card;
        this.userAuth = userAuth;
        this.counter = counter
        this.target = null;
        this.button = button;
        this._eventUserAuth = this._eventUserAuth.bind(this)
    }
    addEvent() {
        const event = this._access();
        this.container.addEventListener('click', event)
    }
    _access () {
        if(this.userAuth) {
            return this._eventUserAuth;
        } else {
            return this._eventUserNotAuth;
        }
    }
    _eventUserAuth (e) {
        this.target = e.target.closest('button');
    }
    _eventUserNotAuth (e) {
        this.target = e.target.closest('button');
    }
}
