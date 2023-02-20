const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

const designation = require('./models/designation')
const type_fourniture = require('./models/type_fourniture')
const entree_stock = require('./models/entree_stock')
const role = require('./models/roles')
const compte_user = require('./models/compte_user')
const utilisateur = require('./models/utilisateur')
const departement = require('./models/departement')
const dep_demande = require('./models/dep_demande')
const demande = require('./models/demande')
const consommation_departement = require('./models/consommation_departement')
const consommation_total = require('./models/consommation_total')

const entree_stock_montant = require('./models/entree_stock_montant')
const stock = require('./models/stock')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//Pour écouter des autres port
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'NodeJs, Express, et Postgres API' })
  })

//Designation
app.get('/designation', designation.getDesignation)
app.post('/designation', designation.createDesignation)
app.put('/designation/:id_designation', designation.updateDesignation)
app.delete('/designation/:id_designation', designation.deleteDesignation)

//type_fourniture
app.get('/type_fourniture', type_fourniture.getTypeFourniture)
app.post('/type_fourniture', type_fourniture.createTypeFourniture)
app.put('/type_fourniture/:id_type_fourniture', type_fourniture.updateTypeFourniture)
app.delete('/type_fourniture/:id_type_fourniture', type_fourniture.deleteTypeFourniture)

// entree_stock
app.get('/entree_stock', entree_stock.getEntreeStock)
app.get('/entree_stock/:date_debut/:date_fin', entree_stock.getEntreeStockByDate)
app.post('/entree_stock', entree_stock.createEntreeStock)
app.put('/entree_stock/:id_entree', entree_stock.updateEntreeStock)
app.delete('/entree_stock/:id_entree', entree_stock.deleteEntreeStock)

//entree_stock_montant
app.get('/entree_stock_montant', entree_stock_montant.getEntreeStockMontant)
app.get('/entree_stock_montant/:date_debut/:date_fin', entree_stock_montant.getEntreeStockMontantByDate)

//stock
app.get('/stock', stock.getStock)
app.get('/stock/:date_debut/:date_fin', stock.getStockByDate)
app.post('/stock', stock.createStock)
// app.put('/stock/:designation', stock.updateStock)

//roles
app.get('/roles', role.getRole)
app.post('/roles', role.createRole)
app.put('/roles/:id_role', role.updateRole)
app.delete('/roles/:id_role', role.deleteRole)

//compte_user
app.get('/compte_user', compte_user.getCompteUser)
app.post('/compte_user', compte_user.createCompteUser)
app.put('/compte_user/:num_compte', compte_user.updateCompteUser)
app.delete('/compte_user/:num_compte', compte_user.deleteCompteUser)

//utilisateur
app.get('/utilisateur', utilisateur.getUser)
app.post('/utilisateur', utilisateur.createUser)
app.put('/utilisateur/:id_user', utilisateur.updateUser)
app.delete('/utilisateur/:id_user', utilisateur.deleteUser)

//departement
app.get('/departement', departement.getDepartement)
app.post('/departement', departement.createDepartement)
app.put('/departement/:id_dep', departement.updateDepartement)
app.delete('/departement/:id_dep', departement.deleteDepartement)

//dep_demande
app.get('/dep_demande', dep_demande.getDepDemande)

//demande
app.get('/demande', demande.getDemande)
app.get('/demande/:date_debut_demande/:date_fin_demande', demande.getDemandeByDate)
app.post('/demande', demande.createDemande)
app.put('/demande/:id_demande', demande.updateDemande)
app.delete('/demande/:id_demande', demande.deleteDemande)

//consommation_departement
app.get('/consommation_departement', consommation_departement.getConsoDep)
app.get('/consommation_departement/:date_debut/:date_fin', consommation_departement.getConsoDepByDate)
app.post('/consommation_departement', consommation_departement.createConsoDep)

//consommation_total
app.get('/consommation_total', consommation_total.getConsoTot)
app.get('/consommation_total/:date_debut/:date_fin', consommation_total.getConsoTotByDate)

//renvoie url
app.listen(port, () => {
    console.log(`Ecoute sur le port ${port}.`)
  })