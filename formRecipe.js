const counterId = document.querySelector('#counter');

const formFieldIngredinet = document.querySelector('.form__field-group-ingredientes');
const nameIngredient = document.querySelector('#nameIngredient');
const formDropdownItems = document.querySelector('.form__dropdown-items');
const cantidadVal = document.querySelector('#cantidadVal');
const cantidad = document.querySelector('#cantidad')
const addIng = document.querySelector('#addIng');

const api = new Api(apiUrl);
const header = new Header(counterId);

class Ingredients {
    constructor(api,inputSearch, dropdownContainer, inputUnits, labelUnits, buttonAdd, container) {
        this.currentId = 1;
        this.api = api;
        this.inputSearch = inputSearch;
        this.dropdownContainer = dropdownContainer;
        this.inputUnits = inputUnits;
        this.labelUnits = labelUnits;
        this.buttonAdd = buttonAdd;
        this.container = container;
        this.focus = this.focus.bind(this);
        this.event = this.event.bind(this);
        this.showDropDown = this.showDropDown.bind(this);
        this.hideDropDown = this.hideDropDown.bind(this);
        this.eventSearch = this.eventSearch.bind(this);
        this.outsideClick = this.outsideClick.bind(this);
        this.dropDownEvent = this.dropDownEvent.bind(this);
        this.focusUnits = this.focusUnits.bind(this);
        this.saveUnits = this.saveUnits.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.search = null;
        this.value = {
            name: null,
            unitsValue: 0,
            unitsLabel: 0
        };
        this.array = null;
        this.selected = false;
        this.focusBoolean = false;
    }
    event() {
        this.inputSearch.onfocus = this.focus;
        this.inputSearch.onblur = () => this.focusBoolean = false;
        this.inputUnits.onfocus = this.focusUnits;
        this.buttonAdd.addEventListener('click', this.addIngredient)
    }

    focus () {
        this.inputSearch.addEventListener('input',this.eventSearch);
        this.focusBoolean = true;
        if(this.array !== null && this.selected === false &&  this.focusBoolean) {
            this.showDropDown();
        }
    }
    focusUnits() {
        this.inputUnits.addEventListener('input', this.saveUnits)
    }
    saveUnits (e) {
        if(e.target.value === '') {
            this.value.unitsValue = 0;
        }
        this.value.unitsValue = Number(e.target.value);

    }
    addIngredient () {
        if(this.value.name !== 0 && this.value.unitsValue !== 0) {
            this.clearInput(this.inputSearch);
            this.clearInput(this.inputUnits);
            this.container.insertAdjacentElement('afterend',this.templateItem());
            this.selected = true;
            this.nullify();
        }
    }
    templateItem () {
        const data = this.value;
        const elem = document.createElement('div');
        elem.classList.add('form__field-item-ingredient');
        elem.id = `ing${this.currentId}`;
        elem.innerHTML = `<span> ${data.name} ${data.unitsValue}${data.unitsLabel}</span> <span class="form__field-item-delete"></span>
                         <input id="nameIngredient_${this.currentId}" name="nameIngredient_${this.currentId}" type="hidden" value="${data.name}">
                         <input id="valueIngredient_${this.currentId}" name="valueIngredient_${this.currentId}" type="hidden" value="${data.unitsValue}">
                         <input id="unitsIngredient_${this.currentId}" name="unitsIngredient_${this.currentId}" type="hidden" value="${data.unitsLabel}">`;
        this.currentId++;
        elem.addEventListener('click', this.eventDelete);
        return elem;
    }
    eventDelete (e) {
        if(e.target.classList.contains('form__field-item-delete')) {
            const item = e.target.closest('.form__field-item-ingredient');
            item.removeEventListener('click',this.eventDelete);
            item.remove();
        }
    };
    nullify () {
        this.search = null;
        this.value = {
            name: null,
            unitsValue: 0,
            unitsLabel: 0
        };
        this.array = null;
        this.selected = null;
    }
    showDropDown () {
        this.dropdownContainer.style.display = 'flex';
        window.addEventListener('click', this.outsideClick);
        this.dropdownContainer.addEventListener('click', this.dropDownEvent);
    }
    hideDropDown () {
        this.dropdownContainer.style.display = '';
        window.removeEventListener('click', this.outsideClick);
        this.dropdownContainer.removeEventListener('click', this.dropDownEvent);
        this.focusBoolean = false;
    }
    outsideClick (e) {
        if(e.target.closest('.form__dropdown-items') || (e.target.id !== 'nameIngredient' || e.target.classList.contains('form__dropdown-items'))) {
            this.hideDropDown()
        }
    }
    clearDropDown () {
        this.dropdownContainer.innerHTML = '';
    }
    clearInput (input) {
        input.value = '';
    }
    dropDownEvent (e) {
        if(e.target.classList.contains('form__item-list')) {
            this.value = {
                name: e.target.textContent,
                unitsLabel: e.target.getAttribute('data-val')
            };
            this.inputSearch.value = this.value.name;
            this.value.unitsValue = 0;
            this.labelUnits.textContent = this.value.unitsLabel;
            this.hideDropDown();
            this.clearDropDown();
            this.selected = true;
            this.search = this.value.name;
        }
    }
    eventSearch (e) {
        this.search = e.target.value;
        this.value.name = this.search;
        this.api.getIngredients(e.target.value).then( e => {
            if(e.length !== 0 ) {
                this.array = e;
                const items = e.map( elem => {
                    return `<a class="form__item-list" data-val="${elem.dimension}"">${elem.title}</a>`
                }).join(' ');
                this.focusBoolean &&this.showDropDown();

                formDropdownItems.innerHTML = items;
            }
        })
        .catch( e => {
            console.log(e)
        })
    }
}
const ingredients = new Ingredients(api,nameIngredient,formDropdownItems, cantidad,cantidadVal,addIng, formFieldIngredinet);
ingredients.event();
