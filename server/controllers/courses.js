const ErrorResponse = require('../tools/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const Course = require('../models/Course')

// @desc        GET all bootcamps
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Public
const getCourses = asyncHandler(async (req, res, next) => {
  let query

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId })
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    })
  }

  const courses = await query

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  })
})

module.exports = {
  getCourses,
}
