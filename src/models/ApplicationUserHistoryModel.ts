import { Table, Column, Model,Sequelize, DataType, CreatedAt, UpdatedAt, HasOne, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'adminuserhistory' })
export class ApplicationUserHistoryModel extends Model{
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
        type: DataType.TEXT,
        allowNull: true
    })
    action : string

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
   
    @Column({
        type: DataType.INTEGER,
        defaultValue : 0
    })
    role_id: number;
}