// build your `Task` model here
const db = require('../../data/dbConfig')

 const getTasks = async () => {
    const tasks = await db('tasks as t')
    .leftJoin('projects as p', 'p.project_id','t.project_id' )
    .select('p.project_name','t.task_description', 'p.project_description', 't.task_notes', 't.task_completed', 't.task_id')
    tasks.forEach(
        (pjk) => (pjk.task_completed = !!pjk.task_completed)
    )
    return tasks
}

async function createTask(task) {
    const [task_id] = await db("tasks")
    .insert(task);
  
    const tasks = await db("tasks").where({ task_id }).first();
  
    return {
      ...tasks,
      task_completed: !!task.task_completed,
    };
  }

  module.exports = {
    getTasks,
    createTask,
  }