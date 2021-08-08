import express from 'express';
import controller from '../controllers/weather';
const router = express.Router();

router.post('/tempFromCities', controller.getTempsFromCities);

export = router;