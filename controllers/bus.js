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

    try{
        const userId = getUserByToken(req.params.token)
       
        const userBus = await prisma.userBus.findMany({
            where:{
                userId:userId
            },
            orderBy:{
                id: 'asc'
            },
            include:{
                bus : {
                    include:{
                        typeBus:{
                            include:{
                                typeBusArret:{
                                    include:{
                                        arret: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        let rep = []
        userBus.map(async (element) => { 
            rep= element.bus.typeBus.typeBusArret
        })
        let data = []
        rep.map((element) => { 
                data.push({
                "id": element.id,
                "arret":element.arret.nom,
                "nbpa":element.nbpa
                })
        })

            res.json(data)
    } catch (error) {
        next(error)
    }
};

















const getUserByToken = async (token) => {

    try {
      const decodedToken = jwt.decode(token);
      
      
      if (!decodedToken) {
  
      // Si le token est invalide ou non décodé, vous pouvez renvoyer une réponse appropriée.
      return res.status(400).json({ error: 'Invalid token' });
  
      }
  
      const { id } = decodedToken;
        
        const user = await prisma.user.findUnique({
          where: {
            id: Number(id),
          }
        })
  
        if (user.length == 0) {
          throw new UserError(`L\'utilisateur n\'existe pas`, 0)
      
        }
      
      
        return user[0].id
      
      
    } catch (error) {
      // En cas d'erreur lors du décodage du token, vous pouvez renvoyer une réponse d'erreur.
      return  'Internal server error' 
    }
  
  }
  
  
  const getImageNom = async (idImage) => {
    const image = await prisma.image.findUnique({
      where: {
        id: parseInt(idImage),
      }
      
    })
    return image.nom
  }