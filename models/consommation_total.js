const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getConsoTot = (request, response) => {
  pool.query('select libelle_designation_conso_dep, sum(quantite_conso_dep) as quantite_conso_dep from consommation_departement group by libelle_designation_conso_dep order by libelle_designation_conso_dep', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getConsoTotByDate= (request, response) => {
    const date_debut = request.params.date_debut
    const date_fin = request.params.date_fin
  
    pool.query('select libelle_designation_conso_dep, sum(quantite_conso_dep) as quantite_conso_dep from consommation_departement WHERE date_conso_dep BETWEEN $1 AND $2 group by libelle_designation_conso_dep order by libelle_designation_conso_dep', 
    [date_debut, date_fin], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  module.exports = {
    getConsoTot,
    getConsoTotByDate,
}