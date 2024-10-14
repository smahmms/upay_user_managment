import { Table, Column, Model, DataType,Sequelize, CreatedAt, UpdatedAt ,ForeignKey, HasMany} from 'sequelize-typescript';
import { BdDivisionModel, BdThanaModel} from './index'

@Table({ tableName: 'bd_districts' })
export class BdDistrictModel extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @ForeignKey(() => BdDivisionModel)
    @Column({
        type: DataType.INTEGER,
        allowNull : false
    })
    division_id : number

    @Column({
        type: DataType.TEXT,
        allowNull : false
    })
    name: string;

    @Column({
        type: DataType.TEXT
    })
    localname: string;

    @HasMany(() => BdThanaModel)
    thana: BdThanaModel[]
}