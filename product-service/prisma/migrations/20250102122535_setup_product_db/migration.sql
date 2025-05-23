-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stripe_id` VARCHAR(191) NOT NULL,
    `stripe_id_price` VARCHAR(191) NOT NULL,
    `picture_path` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `details` TEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_stripe_id_key`(`stripe_id`),
    UNIQUE INDEX `Product_stripe_id_price_key`(`stripe_id_price`),
    UNIQUE INDEX `Product_name_key`(`name`),
    UNIQUE INDEX `Product_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
