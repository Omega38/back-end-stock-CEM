const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getEntreeStockMontant= (request, response) => {
pool.query('select sum(montant_entree) as somme_montant from entree_stock', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEntreeStockMontantByDate= (request, response) => {
    const date_debut = request.params.date_debut
    const date_fin = request.params.date_fin
  
    // if(date_debut == '' && date_fin == ''){
    //   pool.query('select sum(montant_entree) as somme_montant from entree_stock', 
    //   (error, results) => {
    //     if (error) {
    //       throw error
    //     }
    //     response.status(200).json(results.rows)
    //   })
    // }
  
    pool.query('select sum(montant_entree) as somme_montant from entree_stock WHERE date_entree BETWEEN $1 AND $2', 
    [date_debut, date_fin], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getEntreeStockMontant,
    getEntreeStockMontantByDate,
}