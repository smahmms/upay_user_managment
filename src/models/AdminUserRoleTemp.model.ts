import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany, ForeignKey } from 'sequelize-typescript';
import { ADminUserRoleModel, ApplicationUserModel } from './index'

@Table({ tableName: 'adminuser_role_temp' })
export class ADminUserRoleTempModel extends Model{

    @Column({
        type: DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    role_name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    action: string;

    @Column({
        type: DataType.TEXT
    })
    created_by : string

    @ForeignKey(() => ADminUserRoleModel )
    @Column({
        type: DataType.INTEGER
    })
    ref_id : number

    @Column({
        type: DataType.DATE
    })
    created_at: Date

    @HasMany(() => ApplicationUserModel, { sourceKey: 'ref_id'})
    users: ApplicationUserModel[]
}