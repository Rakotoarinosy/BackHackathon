-- CreateTable
CREATE TABLE "ControlleurArret" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "arretId" INTEGER NOT NULL,

    CONSTRAINT "ControlleurArret_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ControlleurArret" ADD CONSTRAINT "ControlleurArret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlleurArret" ADD CONSTRAINT "ControlleurArret_arretId_fkey" FOREIGN KEY ("arretId") REFERENCES "Arret"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
