import express from 'express';
import controller from '../controllers/weather';
const router = express.Router();

router.post('/tempFromCities', controller.getTempsFromCities);
router.post('/weatherFromCities', controller.getWeatherFromCities);

export = router;