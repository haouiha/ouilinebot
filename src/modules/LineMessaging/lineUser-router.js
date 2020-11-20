import { Router } from 'restify-router';
import * as LineCtrl from '../controllers/lineUser-ctrl';

const router = new  Router();
router.post('/createLineUser', LineCtrl.createLineUser);


export default router;
