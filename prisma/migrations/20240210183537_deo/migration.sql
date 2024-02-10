-- CreateTable
CREATE TABLE "BusTypeBus" (
    "id" SERIAL NOT NULL,
    "busId" INTEGER NOT NULL,
    "typeBusId" INTEGER NOT NULL,

    CONSTRAINT "BusTypeBus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusTypeBus" ADD CONSTRAINT "BusTypeBus_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusTypeBus" ADD CONSTRAINT "BusTypeBus_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
