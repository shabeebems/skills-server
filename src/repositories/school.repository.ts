import SchoolModel, { ISchool } from '../models/school.model';
import { BaseRepository } from './base.repository';

export class SchoolRepository extends BaseRepository<ISchool> {
  constructor() {
    super(SchoolModel);
  }

}
