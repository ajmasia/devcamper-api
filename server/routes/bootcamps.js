const express = require('express')
const controller = require('../controllers/bootcamps')
const router = express.Router()

router.route('/').get(controller.getBootcamps)
router.route('/:id').get(controller.getBootcamp)
router.route('/').post(controller.createBootcamp)
router.route('/:id').put(controller.updateBootcamp)
router.route('/:id').delete(controller.deleteBootcamp)

module.exports = router
