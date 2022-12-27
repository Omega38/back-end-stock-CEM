const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getCompteUser = (request, response) => {
  pool.query('select * from compte_user inner join roles on compte_user.id_role = roles.id_role ORDER BY num_compte ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCompteUser = (request, response) => {
  const { nom_role,username, mdp_user } = request.body

  pool.query('INSERT INTO compte_user (id_role,username, mdp_user) VALUES ((select distinct id_role from roles where nom_role = $1), $2, $3)', 
  [nom_role,username, mdp_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Compte_user ajouter avec ID: ${results.num_compte}`)
  })
}

const updateCompteUser = (request, response) => {
  const num_compte = parseInt(request.params.num_compte)
  const { nom_role,username, mdp_user } = request.body

  pool.query(
    'UPDATE compte_user SET  id_role = (select distinct id_role from roles where nom_role = $1), username = $2, mdp_user = $3 WHERE num_compte = $4',
    [nom_role, username, mdp_user, num_compte],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Compte_user modifier avec ID: ${num_compte}`)
    }
  )
}

const deleteCompteUser = (request, response) => {
  const num_compte = parseInt(request.params.num_compte)

  pool.query('DELETE FROM compte_user WHERE num_compte = $1', [num_compte], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Compte_user supprimer avec ID: ${num_compte}`)
  })
}

module.exports = {
  getCompteUser,
  createCompteUser,
  updateCompteUser,
  deleteCompteUser,
}