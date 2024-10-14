import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany, ForeignKey } from 'sequelize-typescript';
import { ADminUserRoleModel, ADminUserRoleTempModel } from './index'

@Table({ tableName: 'adminuser' })
export class ApplicationUserModel extends Model{
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
    username: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    password: string;
   
    @ForeignKey(() => ADminUserRoleModel )
    @ForeignKey(() => ADminUserRoleTempModel )
    @Column({
        type: DataType.BIGINT,
        defaultValue : 0
    })
    roleid: bigint;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    emailid : string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    storeid : string

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    mobileno : string

    @Column({
        type: DataType.SMALLINT,
        defaultValue : 0
    })
    userstatus : number

    @Column({
        type: DataType.SMALLINT,
        defaultValue : 0
    })
    retry : number

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    fullname : string

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    fcm : string

    @Column({
        type: DataType.INTEGER
    })
    title : number

    @Column({
        type: DataType.TEXT
    })
    created_by : string

    @Column({
        type: DataType.TEXT
    })
    approve_by : string

    @Column({
        type: DataType.DATE,
        defaultValue : Sequelize.literal("(now())")
    })
    approve_at : Date

    //200 = supper admin , others admin
    @Column({
        type: DataType.INTEGER,
        defaultValue : 201
    })
    user_type : number
   
    @HasOne(() => ADminUserRoleModel, { sourceKey: 'roleid'} )
    role_info : ADminUserRoleModel
}