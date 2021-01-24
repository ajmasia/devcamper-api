const express = require('express')
const controller = require('../controllers/courses')
const router = express.Router({ mergeParams: true })

router.route('/').get(controller.getCourses)

module.exports = router
