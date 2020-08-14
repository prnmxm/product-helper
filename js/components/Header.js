class Header {
    constructor(counter) {
        this.counter = counter;
        this.api = api;
        this.counterNum = null;
    }
    updateCounter = (type) => {
        if(type === 'add') {
            this.counterNum = ++this.counterNum;
            console.log(this.counterNum)
            this.counter.textContent = this.counterNum;
        } else if(type === 'remove')  {
            this.counterNum = --this.counterNum;
            this.counter.textContent = this.counterNum;
        }
    }
    setCounter = () => {
        this.api.getPurchases().then(e=>{
            this.counterNum = e.length;
            this.counter.textContent = e.length;
        }).catch( e => {
            console.log(e)
        })
    }
}
