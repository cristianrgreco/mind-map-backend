class CrudRepository {
    constructor(collection) {
        this.collection = collection;
    }

    find(id) {
        return this.collection.findOne({id}, {projection: {_id: 0}});
    }

    upsert(id, entity) {
        return this.collection.replaceOne({id}, {...entity, id}, {upsert: true});
    }
}

module.exports = CrudRepository;
