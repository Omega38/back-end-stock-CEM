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

const updateRole = (request, response) => {
  const id_role = parseInt(request.params.id_role)
  const { nom_role } = request.body

  pool.query(
    'UPDATE roles SET  nom_role = $1 WHERE id_role = $2',
    [nom_role, id_role],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`role modifier avec ID: ${id_role}`)
    }
  )
}

const deleteRole = (request, response) => {
  const id_role = parseInt(request.params.id_role)

  pool.query('DELETE FROM roles WHERE id_role = $1', [id_role], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Role supprimer avec ID: ${id_role}`)
  })
}

module.exports = {
    deleteRole,
    updateRole,
    getRole,
    createRole,
}