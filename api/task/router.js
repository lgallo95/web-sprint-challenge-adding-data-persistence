// build your `/api/tasks` router here
const router = require('express').Router()
const Tasks = require('../task/model')

router.get('/', async (req, res, next) => {
    try {
      const task = await Tasks.getTasks()
      res.status(200).json(task)
    } catch (error) {
      next({ status: 500, message: 'you done broke your server!' })
    }
  })

  router.post('/', async (req, res) => {
    try {
      const project = await Tasks.createTask(req.body)
      res.status(200).json(project)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })

  module.exports = router
