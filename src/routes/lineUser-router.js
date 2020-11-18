import express from 'express';
const router = express.Router();
import * as LineCtrl from '../controllers/lineUser-ctrl';

router.post('/createLineUser', LineCtrl.createLineUser);
router.post('/updateLineUser/:id', LineCtrl.updateLineUser);
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.get('/movies', MovieCtrl.getMovies)

export default router;
