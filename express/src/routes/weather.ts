import express from 'express';
import controllers from '../controllers/weather';
const router = express.Router();

router.post('/tempFromCities', controllers.getTempsFromCities);
router.post('/weatherFromCities', controllers.getWeatherFromCities);

export = router;