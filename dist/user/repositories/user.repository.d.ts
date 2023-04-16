import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { UserDocument } from '../schemas/user.schema';
export declare class UserRepository extends BaseRepository<UserDocument> {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
}
