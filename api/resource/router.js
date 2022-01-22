// build your `/api/resources` router here
const router = require('express').Router()
const Resources = require('../resource/model')


router.get('/', async (req, res) => {
    try {
      const source = await Resources.getResources()
      res.status(200).json(source)
    } catch (error) {
        console.log(error)
    }
  })

  router.post('/', async (req, res) => {
    try {
      const source = await Resources.createResource(req.body)
      res.status(200).json(source)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })

  module.exports = router