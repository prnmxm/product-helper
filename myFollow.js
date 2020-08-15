const container = document.querySelector('.card-list');
const counterId = document.querySelector('#counter');
const api = new Api(apiUrl);
const header = new Header(counterId, api);
const configButton = {
    subscribe: {
        attr: 'data-out',
        default: {
            class: 'button_style_blue',
            text: 'Отписаться'
        },
        active: {
            class: 'button_style_light-blue-outline',
            text: `Подписаться от автора`
        }
    }
}
const subscribe = new Subscribe(configButton.subscribe, api);
const myFollow = new MyFollow(container, '.card-user', header, api, true,{
    subscribe
})
myFollow.addEvent();
header.setCounter();

