const Bootcamp = require('../models/Bootcamp')

// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

// @desc        GET single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
      })
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

// @desc        CREATE bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

// @desc        UPDATE bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      mew: true,
      runValidations: true,
    })

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({ success: true, data: bootcamp })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

// @desc        DELETE bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
}
