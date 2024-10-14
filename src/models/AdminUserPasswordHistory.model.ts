import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany, ForeignKey } from 'sequelize-typescript';
import { ADminUserRoleTempModel, ApplicationUserMenuMapModel, ApplicationUserModel, ApplicationUserTempModel } from './index'

@Table({ tableName: 'adminuser_password_activity_log' })
export class ADminUserPasswordHistoryModel extends Model{

    @Column({
        type: DataType.BIGINT,
        primaryKey : true,
        autoIncrement : true
    })
    id: bigint;

    @Column({
        type: DataType.TEXT
    })
    username: string;

    @Column({
        type: DataType.TEXT
    })
    password : string

    @Column({
        type: DataType.TEXT
    })
    activity : string
}