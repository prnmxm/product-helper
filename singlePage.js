const singleCardDiv = document.querySelector('.single-card');
const counterId = document.querySelector('#counter');
const api = new Api(apiUrl);
const header = new Header(counterId, api);

const singleCard = new SingleCard(singleCardDiv, api, header.updateCounter, true, '.single-card');

singleCard.addEvent();
header.setCounter();


