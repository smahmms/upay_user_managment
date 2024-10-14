import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt,ForeignKey } from 'sequelize-typescript';

import {ApplicationUserMenuModel} from './index'

@Table({ tableName: 'applicationusersubmenu' })
export class ApplicationUserSubMenuModel extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true
    })
    id: number;

    @ForeignKey(() => ApplicationUserMenuModel) 
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    menu_id:number

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    name: string;
   
}