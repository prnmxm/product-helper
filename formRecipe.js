const counterId = document.querySelector('#counter');
const nameIngredient = document.querySelector('#nameIngredient');
const formDropdownItems = document.querySelector('.form__dropdown-items');
const cantidadVal = document.querySelector('#cantidadVal');
const formFieldIngredinet = document.querySelector('.form__field-group__ingredientes');
const cantidad = document.querySelector('#cantidad')
const addIng = document.querySelector('#addIng');

const api = new Api(apiUrl);
const header = new Header(counterId, api);

header.setCounter();



nameIngredient.addEventListener('input', (e)=>{
    api.getIngredients(e.target.value).then(e=>{
        if(e.length !== 0 ) {
            const items = e.map( elem => {
                return `<a class="form__item-list" data-val="${elem.dimension}"">${elem.title}</a>`
            })
            console.log(items)
            formDropdownItems.style.display = 'flex';
            formDropdownItems.innerHTML = items;
        }
    })
})
formDropdownItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('form__item-list')) {
        nameIngredient.value = e.target.textContent;
        formDropdownItems.style.display = ''
        cantidadVal.textContent = e.target.getAttribute('data-val');
    }
})
addIng.addEventListener('click', (e) => {
    if(nameIngredient.value && cantidad.value) {
        formFieldIngredinet.insertAdjacentHTML('afterend',`<div class="form__field-item-ingredient">${nameIngredient.value} ${cantidad.value}</div>`)
        nameIngredient.value = ''
        cantidad.value = ''
    }
})
