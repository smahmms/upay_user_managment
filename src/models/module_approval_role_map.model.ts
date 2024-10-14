import { Table, Column, Model, DataType,Sequelize, CreatedAt, UpdatedAt, ForeignKey, HasOne } from 'sequelize-typescript';
import { RilacModulesModel, ADminUserRoleModel} from './index'

@Table({ tableName: 'module_approval_role_map' })

export class ModuleApprovalRoleMapModel extends Model{

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

    @HasOne(() => RilacModulesModel, { sourceKey: 'module_id', foreignKey: 'module_id', as: 'module' })
    module: RilacModulesModel

    @HasOne(() => ADminUserRoleModel, { sourceKey: 'role_id', foreignKey: 'id', as: 'role' })
    role: ADminUserRoleModel

}