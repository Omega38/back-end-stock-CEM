const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getConsoDep = (request, response) => {
  pool.query('SELECT * FROM consommation_departement ORDER BY id_conso_dep ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getConsoDepByDate= (request, response) => {
    const date_debut_conso = request.params.date_debut_conso
    const date_fin_conso = request.params.date_fin_conso
  
    pool.query('SELECT * FROM consommation_departement WHERE date_conso_dep BETWEEN $1 AND $2', [date_debut_conso, date_fin_conso], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
module.exports = {
    getConsoDep,
    getConsoDepByDate,
}