const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../tools/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const geocoder = require('../tools/geocoder')

// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find()
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

// @desc        GET single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    )
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  })
})

// @desc        CREATE bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

// @desc        UPDATE bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    mew: true,
    runValidations: true,
  })

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc        DELETE bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: {} })
})

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
}
