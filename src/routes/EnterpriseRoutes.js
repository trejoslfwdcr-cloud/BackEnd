import {Router} from 'express';
import EnterpriseController from '../controllers/EnterpriseController.js';

const router = Router();

router.get('/info', EnterpriseController.getEnterpriseData);
router.post('/departments', EnterpriseController.createDepartment);
router.post('/employees', EnterpriseController.addEmployee);
router.put('/employee/:deptName/:empName', EnterpriseController.updateEmployee);
router.delete('/departments/:name', EnterpriseController.deleteDepartment);

export default router;