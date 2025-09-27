import subjectModel, { ISubject } from '../models/subject.model';
import { BaseRepository } from './base.repository';

export class SubjectRepository extends BaseRepository<ISubject> {
  constructor() {
    super(subjectModel);
  }

}
