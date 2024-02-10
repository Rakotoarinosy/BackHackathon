-- CreateTable
CREATE TABLE "userBus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "busId" INTEGER NOT NULL,

    CONSTRAINT "userBus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userArret" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "arretId" INTEGER NOT NULL,

    CONSTRAINT "userArret_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userBus" ADD CONSTRAINT "userBus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userBus" ADD CONSTRAINT "userBus_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userArret" ADD CONSTRAINT "userArret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userArret" ADD CONSTRAINT "userArret_arretId_fkey" FOREIGN KEY ("arretId") REFERENCES "Arret"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
