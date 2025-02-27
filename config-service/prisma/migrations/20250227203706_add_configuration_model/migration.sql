-- CreateTable
CREATE TABLE `Configuration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscriptionId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `brand_name` VARCHAR(191) NOT NULL,
    `admin_email` VARCHAR(191) NOT NULL,
    `website_type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Configuration_subscriptionId_key`(`subscriptionId`),
    UNIQUE INDEX `Configuration_url_key`(`url`),
    UNIQUE INDEX `Configuration_brand_name_key`(`brand_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Configuration` ADD CONSTRAINT `Configuration_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
