class Header {
    constructor(counter) {
        this.counter = counter;
        this.api = api;
        this.counterNum = null;
        this.plusCounter = this.plusCounter.bind(this)
        this.minusCounter = this.minusCounter.bind(this)
        this.setCounter = this.setCounter.bind(this)
    }

    plusCounter  ()  {
        this.counterNum = ++this.counterNum;
        this.counter.textContent = this.counterNum;
    }
    minusCounter ()  {
        this.counterNum = --this.counterNum;
        this.counter.textContent = this.counterNum;
    }
    setCounter  ()  {
        this.api.getPurchases().then(e=>{
            this.counterNum = e.length;
            this.counter.textContent = e.length;
        }).catch( e => {
            console.log(e)
        })
    }
}
