const bcrypt = require('bcrypt');

const router = require('express').Router();


const arret_C = require('../controllers/arret')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('AUTH Time:', event.toString())
  next()
})




router.post('/getPersonne', controlleur_C.getPersonnePa)
router.post('/addPersonne', controlleur_C.addPersonne)
router.post('/removePersonne', controlleur_C.removePersonne)
router.get('/arret', arret_C.getAllArret)



module.exports = router;