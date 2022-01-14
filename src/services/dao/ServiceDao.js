

class ServiceDao {

    #collectionName;

    constructor() {
        this.#collectionName = 'week'
    }


    async storeWeek(week) {
        throw Error ('method not implemented')
    }

    async getWeek() {
        throw Error ('method not implemented')
    }

    async cleanWeek() {
        throw Error ('method not implemented')
    }
}

module.exports = ServiceDao;