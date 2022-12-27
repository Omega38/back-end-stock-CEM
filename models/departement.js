const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getDepartement = (request, response) => {
  pool.query('SELECT * FROM departement ORDER BY id_dep ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createDepartement = (request, response) => {
  const {nom_dep, code_dep, emplacement_dep} = request.body

  pool.query('INSERT INTO departement (nom_dep, code_dep, emplacement_dep) VALUES ($1, $2, $3)', 
  [nom_dep, code_dep, emplacement_dep], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Departement ajouter avec ID: ${results.id_dep}`)
  })
}

const updateDepartement = (request, response) => {
  const id_dep = parseInt(request.params.id_dep)
  const { nom_dep, code_dep, emplacement_dep } = request.body

  pool.query(
    'UPDATE departement SET  nom_dep = $1, code_dep = $2, emplacement_dep = $3 WHERE id_dep = $4',
    [nom_dep, code_dep, emplacement_dep, id_dep],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Departement modifier avec ID: ${id_dep}`)
    }
  )
}

const deleteDepartement = (request, response) => {
  const id_dep = parseInt(request.params.id_dep)

  pool.query('DELETE FROM departement WHERE id_dep = $1', [id_dep], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Departement supprimer avec ID: ${id_dep}`)
  })
}

module.exports = {
  getDepartement,
  createDepartement,
  updateDepartement,
  deleteDepartement,
}