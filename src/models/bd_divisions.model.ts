import { Table, Column, Model, DataType,Sequelize, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { BdDistrictModel} from './index'

@Table({ tableName: 'bd_divisions' })
export class BdDivisionModel extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull : false
    })
    name: string;

    @Column({
        type: DataType.TEXT
    })
    localname: string;

    @HasMany(() => BdDistrictModel)
    districts: BdDistrictModel[]
}