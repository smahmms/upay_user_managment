import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey } from 'sequelize-typescript';
import { ADminUserRoleModel } from './index'

@Table({ tableName: 'applicationusermenumap' })
export class ApplicationUserMenuMapModel extends Model{
    @Column({
        type: DataType.BIGINT,
        primaryKey : true,
        autoIncrement : true
    })
    id: bigint;

    @ForeignKey(() => ADminUserRoleModel)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    user_id: bigint;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    submenu_id : number

    @Column({
        type: DataType.INTEGER
    })
    menu_id : number
    
    @Column({
        type: DataType.BOOLEAN,
        defaultValue : false
    })
    is_admin_user:boolean

    @Column({
        type: DataType.TEXT
    })
    created_by: string;

    @Column({
        type: DataType.DATEONLY,
        defaultValue : Sequelize.literal("(now())")
    })
    created_at: Date;
   
}