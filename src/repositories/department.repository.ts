import departmentModel, { IDepartment } from '../models/department.model';
import { BaseRepository } from './base.repository';

export class DepartmentRepository extends BaseRepository<IDepartment> {
  constructor() {
    super(departmentModel);
  }

}
