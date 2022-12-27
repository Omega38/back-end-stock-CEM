const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getUser = (request, response) => {
  pool.query('SELECT * FROM utilisateur INNER JOIN  compte_user ON utilisateur.num_compte = compte_user.num_compte ORDER BY id_user ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { num_compte, code_user, nom_user, departement } = request.body

  pool.query('INSERT INTO utilisateur (code_user, nom_user, departement, num_compte) VALUES ($1, $2, $3, $4)',
  [code_user, nom_user, departement, num_compte], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Utilisateur ajouter avec ID: ${results.id_user}`)
  })
}

const updateUser = (request, response) => {
  const id_user = parseInt(request.params.id_user)
  const { code_user, nom_user, departement } = request.body
  pool.query(
    'UPDATE utilisateur SET code_user = $1, nom_user = $2, departement = $3 WHERE id_user = $4',
    [code_user, nom_user, departement, id_user],
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