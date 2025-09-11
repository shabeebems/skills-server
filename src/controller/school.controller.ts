import { Request, Response } from 'express';
import { SchoolRepository } from '../repositories/school.repository';

const schoolRepo = new SchoolRepository();

export class SchoolController {
  async createSchool(req: Request, res: Response): Promise<Response> {
    const school = await schoolRepo.create(req.body);
    return res.status(201).json(school);
  }

  async getSchool(req: Request, res: Response): Promise<Response> {
    const schools = await schoolRepo.findAll();
    return res.status(200).json(schools);
  }
}
