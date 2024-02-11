-- CreateTable
CREATE TABLE "ArretImage" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "arretId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArretImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusImage" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "busId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArretImage" ADD CONSTRAINT "ArretImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArretImage" ADD CONSTRAINT "ArretImage_arretId_fkey" FOREIGN KEY ("arretId") REFERENCES "Arret"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusImage" ADD CONSTRAINT "BusImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusImage" ADD CONSTRAINT "BusImage_busId_fkey" FOREIGN KEY ("busId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
