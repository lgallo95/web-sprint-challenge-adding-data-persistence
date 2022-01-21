// build your `Resource` model here
const db = require('../../data/dbConfig')

const getResources = () => {
    return db('resources');
  }

  async function createResource (thing) {
    const [resource_id] = await db('resources').insert(thing);
    return getResources().where({ resource_id }).first();
  }


  module.exports = {
    getResources,
    createResource,
  }
  