const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);
// router.use(tourController.checkBody);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addNewTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
