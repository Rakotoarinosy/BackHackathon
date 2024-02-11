
const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient()
const { UserError, RequestError } = require('../error/customError');
const { cp } = require('fs');



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
            },
            orderBy: {
                id:'asc',
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

          let coordonnee = []
          let bus = []
          await Promise.all(
            duplicates.map(async (element)  => {
            let oneCoordonnee = []
            let oneBus = []
            let nomBus = await getNomBus(element)
            oneBus.push(nomBus)
              let estDansleTrajet = false
              const rep = await prisma.typeBusArret.findMany({
                include: {
                    arret: {
                        include: {
                            coordonneeArret: {
                                include: {
                                    coordonnee: true
                                }
                            }
                    }
                }, typeBus: {
                    include: {
                        typeBusArret: true
                    }
                }

                },
                orderBy: {
                    id: 'asc'
                }
              });

              rep.map(async (elem, index) => {
                //console.log(elem )

                if(elem.arret.nom ==  start){
                    estDansleTrajet = true
                    if(index >= 1){
                        const targetId = index;
                        const foundObject = rep.find(obj => obj.id === targetId);
    
                        let data={
                            "nomArret":foundObject.arret.nom,
                            "lat": foundObject.arret.coordonneeArret[0].coordonnee.lat,
                            "long": foundObject.arret.coordonneeArret[0].coordonnee.long,
                            "nbpa": foundObject.nbpa
                        }
                        oneCoordonnee.push(data)
    
                    }
                }

                if(estDansleTrajet == true){

                    let data={
                        "nomArret":elem.arret.nom,
                        "lat": elem.arret.coordonneeArret[0].coordonnee.lat,
                        "long": elem.arret.coordonneeArret[0].coordonnee.long,
                        "nbpa": elem.nbpa
                    }
                    oneCoordonnee.push(data)

                    //oneCoordonnee.push(elem.arret.nom)
                }
               
               
                if(elem.arret.nom ==  end){
                    estDansleTrajet = false
                }
              })
              coordonnee.push(oneCoordonnee)
              bus.push(oneBus)
            }))

            let data = {
                "coordonnee": coordonnee[0],
                "bus": bus[0]
            }
        let bestArret = 1
        lem:
            if(coordonnee.length <= 3){
                if((coordonnee[1].nbpa - coordonnee[0].nbpa) > 10 ) {
                        bestArret = 0;
                        bestDif=coordonnee[1].nbpa - coordonnee[0].nbpa;
                }
            
            }
    


        return res.json(data)

    } catch (error) {
        next(error)
    }

};


const getNomBus = async (typeBusArret)  => {
    const rep = await prisma.typeBus.findUnique({
        where: {
            id: typeBusArret 
        }
      });

      return rep.nom
}








