const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getTypeFourniture = (request, response) => {
  pool.query('SELECT * FROM type_fourniture ORDER BY id_type_fourniture ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const getIdFourniture = (request, response) => {
//   const libelle_type_fourniture = request.params.libelle_type_fourniture

//   pool.query('select id_type_fourniture from type_fourniture where libelle_type_fourniture = $1',[libelle_type_fourniture], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

const createTypeFourniture = (request, response) => {
  const { libelle_type_fourniture } = request.body

  pool.query('INSERT INTO type_fourniture (libelle_type_fourniture) VALUES ($1)', [libelle_type_fourniture], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Type_fourniture ajouter avec ID: ${results.id_type_fourniture}`)
  })
}

const updateTypeFourniture = (request, response) => {
  const id_type_fourniture = parseInt(request.params.id_type_fourniture)
  const { libelle_type_fourniture } = request.body

  pool.query(
    'UPDATE type_fourniture SET  libelle_type_fourniture = $1 WHERE id_type_fourniture = $2',
    [libelle_type_fourniture, id_type_fourniture],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Type_fourniture modifier avec ID: ${id_type_fourniture}`)
    }
  )
}

const deleteTypeFourniture = (request, response) => {
  const id_type_fourniture = parseInt(request.params.id_type_fourniture)

  pool.query('DELETE FROM type_fourniture WHERE id_type_fourniture = $1', [id_type_fourniture], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Type_fourniture supprimer avec ID: ${id_type_fourniture}`)
  })
}

module.exports = {
  // getIdFourniture,
  getTypeFourniture,
  createTypeFourniture,
  updateTypeFourniture,
  deleteTypeFourniture,
}