const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getEntreeStock= (request, response) => {
  pool.query('SELECT * FROM entree_stock ORDER BY id_entree ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEntreeStockByDate= (request, response) => {
  const date_debut = request.params.date_debut
  const date_fin = request.params.date_fin

  pool.query('SELECT * FROM entree_stock WHERE date_entree BETWEEN $1 AND $2', [date_debut, date_fin], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEntreeStock = (request, response) => {
  const { quantite_entree, pu_entree, date_entree, id_designation } = request.body
  const montant_entree = parseFloat(quantite_entree * pu_entree)

  pool.query('INSERT INTO entree_stock (quantite_entree, pu_entree, date_entree, id_designation, montant_entree) VALUES ($1, $2, $3, $4, $5)', [quantite_entree, pu_entree, date_entree, id_designation, montant_entree], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Entree_stock ajouter avec ID: ${results.id_entree}`)
  })
}

const updateEntreeStock = (request, response) => {
  const id_entree = parseInt(request.params.id_entree)
  const { quantite_entree, pu_entree, date_entree, id_designation } = request.body
  const montant_entree = parseFloat(quantite_entree * pu_entree)

  pool.query(
    'UPDATE entree_stock SET quantite_entree = $1, pu_entree = $2, date_entree = $3, id_designation = $4, montant_entree = $5 WHERE id_entree = $6',
    [quantite_entree, pu_entree, date_entree, id_designation, montant_entree, id_entree],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Entree_stock modifier avec ID: ${id_entree}`)
    }
  )
}

const deleteEntreeStock = (request, response) => {
  const id_entree = parseInt(request.params.id_entree)

  pool.query('DELETE FROM entree_stock WHERE id_entree = $1', [id_entree], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Entree_stock supprimer avec ID: ${id_entree}`)
  })
}

module.exports = {
  getEntreeStock,
  getEntreeStockByDate,
  createEntreeStock,
  updateEntreeStock,
  deleteEntreeStock,
}