
const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient()
const { UserError, RequestError } = require('../error/customError')



exports.addPersonne = async (req, res, next) => {
    try {
        const rep = await prisma.typeBusArret.findMany({
                where: {
                    arretId: req.body.arretId,
                    typeBusId: req.body.typeBusId
                }
            }) 

            let updateNb = rep[0].nbpa + 1

            await prisma.typeBusArret.update({
                where: {
                  id: rep[0].id,
                },
                data: {
                    arretId: req.body.arretId,
                    typeBusId: req.body.typeBusId,
                    nbpa: updateNb
                },
              })

        
            return res.json(rep)

    } catch (error) {
        next(error)
    }

};

exports.removePersonne = async (req, res, next) => {
    try {
        const rep = await prisma.typeBusArret.findMany({
                where: {
                    arretId: req.body.arretId,
                    typeBusId: req.body.typeBusId
                }
            }) 

            let updateNb = rep[0].nbpa - req.body.nb
            if (updateNb <0){
                updateNb = 0
            }

            await prisma.typeBusArret.update({
                where: {
                  id: rep[0].id,
                },
                data: {
                    arretId: req.body.arretId,
                    typeBusId: req.body.typeBusId,
                    nbpa: updateNb
                },
              })
            return res.json(rep)

    } catch (error) {
        next(error)
    }

};


exports.getPersonnePa = async (req, res, next) => {
    try {
        const rep = await prisma.typeBusArret.findMany({
            where: {
                arretId: req.body.arretId,
                typeBusId: req.body.typeBusId
            }
        }) 
        return res.json(rep[0].nbpa)

    } catch (error) {
        next(error)
    }

};


exports.getTrajet = async (req, res, next) => {
    try {
        typeBusId = req.params.id

        const rep = await prisma.typeBusArret.findMany({
            where: {
                typeBusId: req.body.typeBusId
            }
        }) 


        trajet = []
        await Promise.all(
        rep.map(async (element)  => {
        
            const arret = await prisma.arret.findUnique({
               
                where:{
                    id: element.arretId
                },
                include: {
                    coordonneeArret: {
                      include: {
                        coordonnee: true
                      }
                    }
                  }
            
            })
            let data = {
                "nomArret" : arret.nom,
                "lat": arret.coordonneeArret[0].coordonnee.lat,
                "long": arret.coordonneeArret[0].coordonnee.long,
                "nbpa": element.nbpa,
            }
            trajet.push(data)
        
        }))
        return res.json(trajet)

    } catch (error) {
        next(error)
    }

};

