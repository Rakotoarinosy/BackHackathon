-- CreateTable
CREATE TABLE "UserTypeBus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeBusId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTypeBus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTypeBus" ADD CONSTRAINT "UserTypeBus_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTypeBus" ADD CONSTRAINT "UserTypeBus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
