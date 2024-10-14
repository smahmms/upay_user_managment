import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany, ForeignKey } from 'sequelize-typescript';
import { ADminUserRoleTempModel, ApplicationUserMenuMapModel, ApplicationUserModel, ApplicationUserTempModel } from './index'

@Table({ tableName: 'adminuser_role' })
export class ADminUserRoleModel extends Model{

    @ForeignKey(() => ApplicationUserModel )
    @ForeignKey(() => ApplicationUserTempModel )
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
        type: DataType.TEXT
    })
    created_by : string

    @Column({
        type: DataType.DATE
    })
    created_at: Date
   
    @HasOne(() => ADminUserRoleTempModel )
    temp_info : ADminUserRoleTempModel

    @HasMany(() => ApplicationUserMenuMapModel)
     menu_submenu: ApplicationUserMenuMapModel[]

     @HasMany(() => ApplicationUserModel)
     users: ApplicationUserModel[]
}