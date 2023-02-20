const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tsarafara',
  host: 'localhost',
  database: 'realisation',
  password: 'tsarafara',
  port: 5432,
})

const getStock = (request, response) => {
  pool.query('select designation.libelle_designation, sum(quantite_stock) as quantite_stock, sum(pu_stock) as cump_stock, (sum(quantite_stock)*sum(pu_stock)) as montant_stock from stock inner join designation on stock.id_designation = designation.id_designation group by designation.libelle_designation', 
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStockByDate= (request, response) => {
  const date_debut = request.params.date_debut
  const date_fin = request.params.date_fin
  pool.query('select designation.libelle_designation, sum(quantite_stock) as quantite_stock, sum(pu_stock) as cump_stock, (sum(quantite_stock)*sum(pu_stock)) as montant_stock from stock inner join designation on stock.id_designation = designation.id_designation WHERE date_stock BETWEEN $1 AND $2 group by designation.libelle_designation', 
  [date_debut, date_fin], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createStock = (request, response) => {
  const { quantite_stock, pu_stock, date_stock, libelle_designation } = request.body
  const montant_stock = parseFloat(quantite_stock * pu_stock)

  pool.query('INSERT INTO stock (quantite_stock, pu_stock, date_stock, id_designation, montant_stock) VALUES ($1, $2, $3, (select distinct id_designation from designation where libelle_designation = $4), $5)', 
  [quantite_stock, pu_stock, date_stock, libelle_designation, montant_stock], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`stock ajouter avec ID: ${results.id_stock}`)
  })
}

// const updateStock = (request, response) => {
//   const designation = request.params.designation
//   const { quantite, date } = request.body

//   pool.query(
//     "update stock set quantite_stock = quantite_stock - $1, montant_stock = ((quantite_stock - $1) * pu_stock) where id_designation = (select id_designation from designation where libelle_designation = $2) and quantite_stock >= $1 and (select extract(month from date_stock) = $3)",
//     [quantite, designation, date],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`Stock modifier avec ID: ${id_stock}`)
//     }
//   )
// }

module.exports = {
  getStock,
  getStockByDate,
  createStock,
  // updateStock,
}