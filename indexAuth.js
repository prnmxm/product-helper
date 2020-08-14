const cardListDiv = document.querySelector('.card-list');
const counterId = document.querySelector('#counter');
const api = new Api(apiUrl);
const header = new Header(counterId, api);

const cardList = new CardList(cardListDiv, api, header.updateCounter, true, '.card');

cardList.addEvent();
header.setCounter();


