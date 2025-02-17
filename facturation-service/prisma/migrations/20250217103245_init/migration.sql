-- CreateTable
CREATE TABLE `Facture` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `customer` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `invoice_link` VARCHAR(191) NOT NULL,
    `invoice_download` VARCHAR(191) NOT NULL,
    `start` INTEGER NOT NULL,
    `end` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
