"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(doc) {
        const createdEntity = new this.model(doc);
        return await createdEntity.save();
    }
    async findById(id, option) {
        return this.model.findById(id, option).lean();
    }
    async findByCondition(filter, field, option, populate) {
        return this.model.findOne(filter, field, option).populate(populate).lean();
    }
    async getByCondition(filter, field, option, populate) {
        return this.model.find(filter, field, option).populate(populate).lean();
    }
    async findAll() {
        return this.model.find().lean();
    }
    async aggregate(option) {
        return this.model.aggregate(option);
    }
    async populate(result, option) {
        return await this.model.populate(result, option);
    }
    async deleteOne(id) {
        return this.model.deleteOne({ _id: id });
    }
    async deleteMany(id) {
        return this.model.deleteMany({ _id: { $in: id } });
    }
    async deleteByCondition(filter) {
        return this.model.deleteMany(filter);
    }
    async findByConditionAndUpdate(filter, update) {
        return this.model.findOneAndUpdate(filter, update).lean();
    }
    async findByIdAndUpdate(id, update) {
        return this.model.findByIdAndUpdate(id, update).lean();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map