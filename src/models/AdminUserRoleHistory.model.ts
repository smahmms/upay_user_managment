import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'adminuser_role_history' })
export class ADminUserRoleHistoryModel extends Model{
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

    @Column({
        type: DataType.INTEGER
    })
    ref_id : number

    @Column({
        type: DataType.INTEGER
    })
    temp_id : number
   
}