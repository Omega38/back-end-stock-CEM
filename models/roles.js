const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getRole = (request, response) => {
  pool.query('SELECT * FROM roles ORDER BY id_role ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRole = (request, response) => {
  const { nom_role } = request.body

  pool.query('INSERT INTO roles (nom_role) VALUES ($1)', [nom_role], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Role ajouter avec ID: ${results.id_role}`)
  })
}
module.exports = {
    getRole,
    createRole,
}