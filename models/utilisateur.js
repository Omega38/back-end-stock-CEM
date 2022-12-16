const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getUser = (request, response) => {
  pool.query('SELECT * FROM utilisateur ORDER BY id_user ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { id_compte_user, code_user, nom_user, emplacement_user } = request.body

  pool.query('INSERT INTO utilisateur (id_compte_user, code_user, nom_user, emplacement_user) VALUES ($1, $2, $3, $4)', [id_compte_user, code_user, nom_user, emplacement_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Utilisateur ajouter avec ID: ${results.id_user}`)
  })
}

const updateUser = (request, response) => {
  const id_user = parseInt(request.params.id_user)
  const { id_compte_user, code_user, nom_user, emplacement_user } = request.body

  pool.query(
    'UPDATE utilisateur SET  id_compte_user = $1, code_user = $2, nom_user = $3, emplacement_user = $4 WHERE id_user = $5',
    [id_compte_user, code_user, nom_user, emplacement_user, id_user],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Utilisateur modifier avec ID: ${id_user}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id_user = parseInt(request.params.id_user)

  pool.query('DELETE FROM utilisateur WHERE id_user = $1', [id_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Utilisateur supprimer avec ID: ${id_user}`)
  })
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
}