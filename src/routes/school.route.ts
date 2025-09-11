import { Router } from 'express';
import { SchoolController } from '../controller/school.controller';

const router = Router();
const schoolController = new SchoolController();

router.post('/', (req, res) => schoolController.createSchool(req, res));
router.get('/', (req, res) => schoolController.getSchool(req, res));

export default router;
