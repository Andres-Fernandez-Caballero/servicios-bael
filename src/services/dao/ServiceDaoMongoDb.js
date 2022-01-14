const ServiceDao = require('./ServiceDao');
const client = require('./../../database/mongodb/mongoDB');
const {Week} = require("../models/Week");
const {Service} = require("../models/Service");
const {CalendarDate} = require("../../utils/Date.utils");


class ServiceDaoMongoDb extends ServiceDao {

    constructor() {
        super();
        this.database = 'services'
        this.weekCollectionName = 'week';
    }

    async storeWeek(week) {
        if(week === null || week === undefined) throw Error("week don't be null or undefined")
        if(!(week instanceof Week)) throw TypeError('week must be a Week object');

        await client.connect()
            const weekToStore =
                {
                    services: week.services
                        .map(service => (
                            {...service, date: service.date.toISODateString()}
                        ))
                }
        await client.db(this.database)
            .collection(this.weekCollectionName)
            .insertOne(weekToStore)

        await client.db(this.database).collection(this.weekCollectionName)
        await client.close();
    }

    async getWeek() {
        return new Promise((resolve, reject) => {
            client.connect()
                .then(async () => {
                    const cursor = client.db(this.database).collection(this.weekCollectionName)
                        .find()
                        .sort({_id: -1})
                        .limit(1)

                    if (await cursor.hasNext()) {
                        const {services} = (await cursor.next())
                        const servicesUnSerialized = services.map(
                            service => new Service(service.code, new CalendarDate(service.date))
                        )
                        resolve(new Week(servicesUnSerialized))

                    } else {
                        resolve(null)
                    }
                    await cursor.close();
                    await client.close()
                })
        });

    }

    async cleanWeek() {

    }

}

module.exports = ServiceDaoMongoDb;