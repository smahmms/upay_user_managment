import { Table, Column, Model, DataType,Sequelize, CreatedAt, UpdatedAt, ForeignKey, HasOne } from 'sequelize-typescript';
import { RilacModulesModel,ADminUserRoleModel} from './index'

@Table({ tableName: 'module_approval_role_map_history' })

export class ModuleApprovalRoleMapHistoryModel extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull : false
    })
    module_id : number

    @Column({
        type: DataType.INTEGER,
        allowNull : false
    })
    role_id: number;
    
    @Column({
        type: DataType.TEXT,
    })
    created_by: string;

    @Column({
        type: DataType.TEXT,
    })
    action: string;

    @Column({
        type: DataType.INTEGER,
    })
    status: number;

}