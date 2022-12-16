const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getDemande = (request, response) => {
  pool.query('SELECT * FROM demande ORDER BY id_demande ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDemandeByDate= (request, response) => {
    const date_debut_demande = request.params.date_debut_demande
    const date_fin_demande = request.params.date_fin_demande
  
    pool.query('SELECT * FROM demande WHERE date_demande BETWEEN $1 AND $2', [date_debut_demande, date_fin_demande], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createDemande = (request, response) => {
  const { id_user, id_stock, quantite_demande, code_dep, nom_dep, emplacement_dep, date_demande, id_designation } = request.body

  pool.query('INSERT INTO utilisateur (id_user, id_stock, quantite_demande, code_dep, nom_dep, emplacement_dep, date_demande, id_designation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
  [id_user, id_stock, quantite_demande, code_dep, nom_dep, emplacement_dep, date_demande, id_designation], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Utilisateur ajouter avec ID: ${results.id_demande}`)
  })
}

const updateDemande = (request, response) => {
  const id_demande = parseInt(request.params.id_user)
  const { id_user, id_stock, quantite_demande, code_dep, nom_dep, emplacement_dep, date_demande, id_designation } = request.body


  pool.query(
    'UPDATE utilisateur SET  id_user = $1, id_stock = $2, quantite_demande = $3, code_dep = $4, nom_dep = $5, amplacement_dep = $6, date_demande = $7, id_designation = $8 WHERE id_user = $9',
    [id_user, id_stock, quantite_demande, code_dep, nom_dep, emplacement_dep, date_demande, id_designation, id_user],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Demande modifier avec ID: ${id_demande}`)
    }
  )
}

const deleteDemande = (request, response) => {
  const id_user = parseInt(request.params.id_user)

  pool.query('DELETE FROM demande WHERE id_demande = $1', [id_demande], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Demande supprimer avec ID: ${id_demande}`)
  })
}

module.exports = {
  getDemande,
  getDemandeByDate,
  createDemande,
  updateDemande,
  deleteDemande,
}