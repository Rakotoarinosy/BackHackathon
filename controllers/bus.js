const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



exports.addBus = async (req, res, next) => {
    try {
    const newBus= {
        nom: req.body.nom,
        matricule: req.body.matricule,
        idStatu: 1,
        typeBusId: 1
      }
      //Ajouter la notification
  
      const bus = await prisma.bus.create({
        data: newBus,
      })
      
      res.json(bus)
      
    } catch (error) {
        next(error)
    }

};



exports.getBus = async (req, res, next) => {

    try{   
        const id = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!id) {
          throw new RequestError('Missing parameter')
        }
    
    
        const bus = await prisma.bus.findUnique({
            where: {
              id: Number(id),
    
            },
            include:{
                typeBus : true
            }
    
          })
          res.json(bus)
     
    } catch (error) {
      next(error)
    }
};


exports.updateBus = async (req, res, next) => {
    try {
        const Busid = parseInt(req.body.id);
        const updatedBus = await prisma.bus.update({
            where: { 
                id: Busid 
            },
            data: {
                nom: req.body.nom,
                matricule: req.body.matricule
            },
        });
        
        res.json(updatedBus);
        
    } catch (error) {
        next(error)
    }
};


exports.getAllBus = async (req, res, next) => {
    try {
        const bus = await prisma.bus.findMany({
            include:{
                typeBus : true
            }
        })
       
        res.json({bus})
    } catch (error) {
        next(error)
    }
};


exports.getArretBus = async (req, res, next) => {  

  const token = req.body.token
  try {
  const decodedToken = jwt.decode(token);
    
  if (decodedToken) {
    const { id, email, nom } = decodedToken;
  }

  

  const busId = parseInt(req.body.id)
  const arret = await prisma.typeBusArret.findMany({
        where: {
            typeBusId: parseInt(busId),
          },
          include :{
            arret: true
          }
        })
        
        const arrets = arret.map(typeBusArret => typeBusArret.arret);

       
        res.json({arrets})
    } catch (error) {
        next(error)
    }
};