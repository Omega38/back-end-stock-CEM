const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getDemande = (request, response) => {
  pool.query('SELECT * FROM demande INNER JOIN utilisateur on demande.id_user = utilisateur.id_user INNER JOIN departement on demande.id_dep = departement.id_dep INNER JOIN designation on demande.id_designation = designation.id_designation ORDER BY id_demande DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDemandeByDate= (request, response) => {
    const date_debut_demande = request.params.date_debut_demande
    const date_fin_demande = request.params.date_fin_demande
  
    pool.query('SELECT * FROM demande INNER JOIN utilisateur on demande.id_user = utilisateur.id_user INNER JOIN departement on demande.id_dep = departement.id_dep INNER JOIN designation on demande.id_designation = designation.id_designation WHERE date_demande BETWEEN $1 AND $2', 
    [date_debut_demande, date_fin_demande], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createDemande = (request, response) => {
  const { nom_user, departement_demande, libelle_designation, quantite_demande, description_demande, date_demande } = request.body

  pool.query("INSERT INTO demande (id_user, id_dep, id_designation, quantite_demande, description_demande, date_demande) VALUES ((select id_user from utilisateur where nom_user = $1), ( select id_dep from departement where (nom_dep || ' ' || code_dep || ' ' || emplacement_dep) = $2), (select id_designation from designation where libelle_designation = $3), $4, $5, $6)", 
  [nom_user, departement_demande, libelle_designation, quantite_demande, description_demande, date_demande], 
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Utilisateur ajouter avec ID: ${results.id_demande}`)
  })
}

const updateDemande = (request, response) => {
  const id_demande = parseInt(request.params.id_demande)
  const { nom_user, departement_demande, libelle_designation, quantite_demande, description_demande, date_demande } = request.body


  pool.query(
    "UPDATE demande SET id_user = (select id_user from utilisateur where nom_user = $1), id_dep = ( select id_dep from departement where (nom_dep || ' ' || code_dep || ' ' || emplacement_dep) = $2), id_designation = (select id_designation from designation where libelle_designation = $3) ,quantite_demande = $4, description_demande = $5, date_demande = $6 WHERE id_demande = $7",
    [nom_user, departement_demande, libelle_designation, quantite_demande, description_demande, date_demande, id_demande],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Demande modifier avec ID: ${id_demande}`)
    }
  )
}

const deleteDemande = (request, response) => {
  const id_demande = parseInt(request.params.id_demande)

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