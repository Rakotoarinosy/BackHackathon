const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



exports.addBus = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }

};



exports.getAllBus = async (req, res, next) => {

    try{   


      const bus = await prisma.gare.findMany()
     
      res.json({bus})
    } catch (error) {
      next(error)
    }
};


exports.updateBus = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};


exports.getAllBus = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};
