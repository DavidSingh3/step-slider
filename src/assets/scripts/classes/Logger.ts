class Logger {

    #name: string = 'Default Logger'

    constructor(name: string = 'Default Logger') {
        this.#name = name
    }

    log(...args: any[]) {
        console.log(`${this.#name} -`, ...args)
    }
}

export default Logger