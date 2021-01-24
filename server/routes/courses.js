const express = require('express')
const controller = require('../controllers/courses')
const router = express.Router({ mergeParams: true })

router.route('/').get(controller.getCourses).post(controller.addCourse)
router
  .route('/:id')
  .get(controller.getCourse)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse)

module.exports = router
