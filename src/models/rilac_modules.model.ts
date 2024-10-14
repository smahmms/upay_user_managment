import { Table, Column, Model, DataType,Sequelize, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { BdDistrictModel} from './index'

@Table({ tableName: 'rilac_modules' })

export class RilacModulesModel extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement : true,
        primaryKey : true
    })
    module_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull : false
    })
    module_name : number

}