
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



exports.getTrajetByArret = async (req, res, next) => {
    try {

        let start = req.body.start
        let end = req.body.end
// GET ID COORDONNEE 
        const rep = await prisma.arret.findMany({
            include: {
                typeBusArret: true
            },
            where: {
              OR: [
                {
                  nom: start
                },
                {
                  nom: end
                }
              ]
            }
          });
          console.log(rep)
          let elementCount = new Map();
          let duplicates = [];

          await Promise.all(
          rep.map((element)  => {

            testElement = element.typeBusArret[0].typeBusId
            if (elementCount.has(testElement)) {
                duplicates.push(testElement)
            } else {
                elementCount.set(testElement,  1);
              }
            })
          )

          await Promise.all(
            duplicates.map((element)  => {
              console.log(element)
            }))

        return res.json(duplicates)

    } catch (error) {
        next(error)
    }

};








