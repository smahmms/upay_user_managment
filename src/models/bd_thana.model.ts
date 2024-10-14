import { Table, Column, Model, DataType,Sequelize, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { BdDistrictModel} from './index'

@Table({ tableName: 'bd_thana' })

export class BdThanaModel extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @ForeignKey(() => BdDistrictModel)
    @Column({
        type: DataType.INTEGER,
        allowNull : false
    })
    districtid : number

    @Column({
        type: DataType.TEXT,
        allowNull : false
    })
    name: string;

    @Column({
        type: DataType.TEXT
    })
    localname: string;

}