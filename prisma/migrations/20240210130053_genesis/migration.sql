-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "typeBusId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statu" (
    "id" SERIAL NOT NULL,
    "labelle" TEXT NOT NULL,

    CONSTRAINT "Statu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statu_user_role" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "statuId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statu_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeBus" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "TypeBus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "idStatu" INTEGER NOT NULL,
    "typeBusId" INTEGER NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arret" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Arret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeBusArret" (
    "id" SERIAL NOT NULL,
    "typeBusId" INTEGER NOT NULL,
    "arretId" INTEGER NOT NULL,
    "nbpa" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TypeBusArret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckPoint" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "CheckPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "busCheckPoint" (
    "id" SERIAL NOT NULL,
    "typeBusId" INTEGER NOT NULL,
    "arretId" INTEGER NOT NULL,
    "checkPointId" INTEGER NOT NULL,

    CONSTRAINT "busCheckPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeBusImage" (
    "id" SERIAL NOT NULL,
    "typeBusId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypeBusImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTypeBus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeBusId" INTEGER NOT NULL,

    CONSTRAINT "UserTypeBus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "busId" INTEGER NOT NULL,

    CONSTRAINT "UserBus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Statu_user_role" ADD CONSTRAINT "Statu_user_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statu_user_role" ADD CONSTRAINT "Statu_user_role_statuId_fkey" FOREIGN KEY ("statuId") REFERENCES "Statu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statu_user_role" ADD CONSTRAINT "Statu_user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBusArret" ADD CONSTRAINT "TypeBusArret_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBusArret" ADD CONSTRAINT "TypeBusArret_arretId_fkey" FOREIGN KEY ("arretId") REFERENCES "Arret"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "busCheckPoint" ADD CONSTRAINT "busCheckPoint_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "busCheckPoint" ADD CONSTRAINT "busCheckPoint_arretId_fkey" FOREIGN KEY ("arretId") REFERENCES "Arret"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "busCheckPoint" ADD CONSTRAINT "busCheckPoint_checkPointId_fkey" FOREIGN KEY ("checkPointId") REFERENCES "CheckPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBusImage" ADD CONSTRAINT "TypeBusImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBusImage" ADD CONSTRAINT "TypeBusImage_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTypeBus" ADD CONSTRAINT "UserTypeBus_typeBusId_fkey" FOREIGN KEY ("typeBusId") REFERENCES "TypeBus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTypeBus" ADD CONSTRAINT "UserTypeBus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBus" ADD CONSTRAINT "UserBus_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBus" ADD CONSTRAINT "UserBus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
