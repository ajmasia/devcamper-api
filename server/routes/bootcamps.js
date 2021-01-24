const express = require('express')
const controller = require('../controllers/bootcamps')
const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router()

// Include other resource routers
const courseRouter = require('./courses')

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), controller.getBootcamps)
  .post(controller.createBootcamp)
router
  .route('/:id')
  .get(controller.getBootcamp)
  .put(controller.updateBootcamp)
  .delete(controller.deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(controller.getBootcampsInRadius)
router.route('/:id/photo').put(controller.bootcampPhotoUpload)

module.exports = router
