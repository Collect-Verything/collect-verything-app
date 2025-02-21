-- CreateTable
CREATE TABLE `Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_stripe_id` VARCHAR(191) NOT NULL,
    `sub_stripe_id` VARCHAR(191) NOT NULL,
    `active_stripe` BOOLEAN NOT NULL DEFAULT true,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `configured` BOOLEAN NOT NULL DEFAULT false,
    `current_period_end` INTEGER NOT NULL,
    `current_period_start` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Subscription_sub_stripe_id_key`(`sub_stripe_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
