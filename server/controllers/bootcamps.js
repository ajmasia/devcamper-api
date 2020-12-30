// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}

// @desc        GET single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
const getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`,
  })
}

// @desc        CREATE bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
const createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamps' })
}

// @desc        UPDATE bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
const updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` })
}

// @desc        DELETE bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
const deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
}

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
}
