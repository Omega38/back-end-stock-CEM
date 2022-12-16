const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getCompteUser = (request, response) => {
  pool.query('SELECT * FROM compte_user ORDER BY id_compte_user ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCompteUser = (request, response) => {
  const { id_role,username, mdp_user } = request.body

  pool.query('INSERT INTO compte_user (compte_user,username, mdp_user) VALUES ($1, $2, $3)', [id_role,username, mdp_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Compte_user ajouter avec ID: ${results.id_compte_user}`)
  })
}

const updateCompteUser = (request, response) => {
  const id_compte_user = parseInt(request.params.id_compte_user)
  const { id_role,username, mdp_user } = request.body

  pool.query(
    'UPDATE compte_user SET  id_role = $1, username = $2, mdp_user = $3 WHERE id_compte_user = $4',
    [id_role, username, mdp_user, id_compte_user],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Compte_user modifier avec ID: ${id_compte_user}`)
    }
  )
}

const deleteCompteUser = (request, response) => {
  const id_compte_user = parseInt(request.params.id_compte_user)

  pool.query('DELETE FROM compte_user WHERE id_compte_user = $1', [id_compte_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Compte_user supprimer avec ID: ${id_compte_user}`)
  })
}

module.exports = {
  getCompteUser,
  createCompteUser,
  updateCompteUser,
  deleteCompteUser,
}