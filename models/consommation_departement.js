const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getConsoDep = (request, response) => {
  pool.query('select nom_dep_conso_dep, libelle_designation_conso_dep, sum(quantite_conso_dep) as quantite_conso_dep from consommation_departement group by libelle_designation_conso_dep, nom_dep_conso_dep order by nom_dep_conso_dep', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getConsoDepByDate= (request, response) => {
    const date_debut = request.params.date_debut
    const date_fin = request.params.date_fin
  
    pool.query('select nom_dep_conso_dep, libelle_designation_conso_dep, sum(quantite_conso_dep) as quantite_conso_dep from consommation_departement WHERE date_conso_dep BETWEEN $1 AND $2 group by libelle_designation_conso_dep, nom_dep_conso_dep', 
    [date_debut, date_fin], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createConsoDep = (request, response) => {
    const {nom_user_conso_dep, nom_dep_conso_dep, libelle_designation_conso_dep, quantite_conso_dep, date_conso_dep, description_conso_dep} = request.body

    pool.query('INSERT INTO consommation_departement (nom_user_conso_dep, nom_dep_conso_dep, libelle_designation_conso_dep, quantite_conso_dep, date_conso_dep, description_conso_dep) VALUES ($1, $2, $3, $4, $5, $6)', 
    [nom_user_conso_dep, nom_dep_conso_dep, libelle_designation_conso_dep, quantite_conso_dep, date_conso_dep, description_conso_dep], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`stock ajouter avec ID: ${results.id_stock}`)
    })
  }
module.exports = {
    getConsoDep,
    getConsoDepByDate,
    createConsoDep,
}