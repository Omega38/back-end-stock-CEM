const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getDepDemande = (request, response) => {
  pool.query("select (nom_dep || ' ' || code_dep || ' ' || emplacement_dep) as departement_demande from departement ORDER BY id_dep ASC", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getDepDemande,
}
