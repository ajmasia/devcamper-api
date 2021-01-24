const express = require('express')
const controller = require('../controllers/courses')
const Course = require('../models/Course')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    controller.getCourses
  )
  .post(controller.addCourse)
router
  .route('/:id')
  .get(controller.getCourse)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse)

module.exports = router
