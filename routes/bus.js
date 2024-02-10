const bcrypt = require('bcrypt');

const router = require('express').Router();

const bus_C = require('../controllers/bus')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('AUTH Time:', event.toString())
  next()
})



router.post('/createBus', bus_C.addBus)
router.get('/', bus_C.getAllBus)
router.patch('/updateBus', bus_C.updateBus)
router.get('/:id', bus_C.getBus)




module.exports = router;