const counterId = document.querySelector('#counter');
const nameIngredient = document.querySelector('#nameIngredient');
const formDropdownItems = document.querySelector('.form__dropdown-items');
const cantidadVal = document.querySelector('#cantidadVal');
const formFieldIngredinet = document.querySelector('.form__field-group-ingredientes');
const cantidad = document.querySelector('#cantidad')
const addIng = document.querySelector('#addIng');

const api = new Api(apiUrl);
const header = new Header(counterId);

const cbEventInput = (elem) => {
    return api.getIngredients(elem.target.value).then( e => {
        if(e.length !== 0 ) {
            const items = e.map( elem => {
                return `<a class="form__item-list" data-val="${elem.dimension}"">${elem.title}</a>`
            }).join(' ')
            formDropdownItems.style.display = 'flex';
            formDropdownItems.innerHTML = items;
        }
    })
    .catch( e => {
        console.log(e)
    })
};
const eventInput = debouncing(cbEventInput, 1000);

nameIngredient.addEventListener('input', eventInput)
formDropdownItems.addEventListener('click', e => {
    if (e.target.classList.contains('form__item-list')) {
        nameIngredient.value = e.target.textContent;
        formDropdownItems.style.display = ''
        cantidadVal.textContent = e.target.getAttribute('data-val');
    }
})
addIng.addEventListener('click', e => {
    if(nameIngredient.value && cantidad.value) {
        formFieldIngredinet.insertAdjacentHTML('afterend',`<div class="form__field-item-ingredient">${nameIngredient.value} ${cantidad.value} ${cantidadVal.textContent}</div>`)
        nameIngredient.value = ''
        cantidad.value = ''
    }
})
