class CrudRepository {
    constructor(collection) {
        this.collection = collection;
    }

    findAll() {
        return this.collection.find({}, {projection: {_id: 0}}).toArray();
    }

    find(id) {
        return this.collection.findOne({id}, {projection: {_id: 0}});
    }

    save(entity) {
        return this.collection.insertOne({...entity});
    }

    update(id, entity) {
        return this.collection.replaceOne({id}, {...entity});
    }

    delete(id) {
        return this.collection.deleteOne({id});
    }
}

module.exports = CrudRepository;
