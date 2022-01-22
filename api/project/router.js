// build your `/api/projects` router here
const router = require('express').Router()
const Projects = require('../project/model')

router.get('/', async (req, res) => {
    try {
      const project = await Projects.getProjects()
      res.status(200).json(project)
    } catch (error) {
        console.log(error)
    }
  })

  router.post('/', async (req, res) => {
    try {
      const project = await Projects.createProjects(req.body)
      res.status(200).json(project)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
  
module.exports = router;