const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getDesignation = (request, response) => {
  pool.query('select * from designation inner join type_fourniture on designation.id_type_fourniture = type_fourniture.id_type_fourniture ORDER BY id_designation ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createDesignation = (request, response) => {
  const { libelle_type_fourniture, libelle_designation } = request.body

  pool.query('INSERT INTO designation (id_type_fourniture, libelle_designation) VALUES ((select distinct id_type_fourniture from type_fourniture where libelle_type_fourniture = $1), $2)', 
  [libelle_type_fourniture, libelle_designation], (error, results) => {
    if (error) {
      throw error
    }  
    response.status(201).send(`Designation ajouter avec ID: ${results.id_designation}`)
  })
}

const updateDesignation = (request, response) => {
  const id_designation = parseInt(request.params.id_designation)
  const { libelle_type_fourniture, libelle_designation } = request.body

  pool.query(
    'UPDATE designation SET  id_type_fourniture = (select distinct id_type_fourniture from type_fourniture where libelle_type_fourniture = $1), libelle_designation = $2 WHERE id_designation = $3',
    [libelle_type_fourniture, libelle_designation, id_designation],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Designation modifier avec ID: ${id_designation}`)
    }
  )
}

const deleteDesignation = (request, response) => {
  const id_designation = parseInt(request.params.id_designation)

  pool.query('DELETE FROM designation WHERE id_designation = $1', [id_designation], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Designation supprimer avec ID: ${id_designation}`)
  })
}

module.exports = {
  getDesignation,
  createDesignation,
  updateDesignation,
  deleteDesignation,
}