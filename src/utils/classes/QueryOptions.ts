import { FindOptions, FindAttributeOptions, WhereOptions } from 'sequelize';

export default class QueryOptions<T> implements FindOptions<T> {
    where: WhereOptions<T>;
    include: Array<{ model: any; as?: string; required?: boolean; where?: Partial<Record<string, unknown>> }>;
    attributes: FindAttributeOptions;
    order: Array<[string, string]>;
    limit?: number;
    offset?: number;

    constructor() {
        this.where = {};
        this.include = [];
        this.attributes = [];
        this.order = [];
        this.limit = undefined;
        this.offset = undefined;
    }
}