import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany } from 'sequelize-typescript';

import { ApplicationUserSubMenuModel} from './index'

@Table({ tableName: 'applicationusermenu' })
export class ApplicationUserMenuModel extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true
    })
    id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.BOOLEAN
    })
    is_admin_menu: boolean;
   
    @HasMany(() => ApplicationUserSubMenuModel)
    submenu: ApplicationUserSubMenuModel[]
}