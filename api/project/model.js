// build your `Project` model here
const db = require("../../data/dbConfig");

async function getProjects() {
  const projects = await db("projects");

  projects.forEach(
    (pjk) => (pjk.project_completed = !!pjk.project_completed)
  );

  return projects;
}

async function createProjects(pjk) {
  const [project_id] = await db("projects")
  .insert(pjk);

  const projects = await db("projects").where({ project_id }).first();

  return {
    ...projects,
    project_completed: !!pjk.project_completed,
  };
}

module.exports = {
  getProjects,
  createProjects,
};
