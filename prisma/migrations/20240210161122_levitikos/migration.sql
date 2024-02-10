-- CreateTable
CREATE TABLE "Coordonnee" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordonnee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordonneeArret" (
    "id" SERIAL NOT NULL,
    "coordonneeId" INTEGER NOT NULL,
    "arretId" INTEGER NOT NULL,

    CONSTRAINT "CoordonneeArret_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoordonneeArret" ADD CONSTRAINT "CoordonneeArret_coordonneeId_fkey" FOREIGN KEY ("coordonneeId") REFERENCES "Coordonnee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordonneeArret" ADD CONSTRAINT "CoordonneeArret_arretId_fkey" FOREIGN KEY ("arretId") REFERENCES "Arret"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
