/*
  Warnings:

  - You are about to drop the `grades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "grades_user_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "grades";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "grade" INTEGER NOT NULL DEFAULT 0,
    "github_profile_url" TEXT NOT NULL,
    "github_api_profile_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("avatar", "created_at", "github_api_profile_url", "github_profile_url", "name", "role", "updated_at", "user_id", "username") SELECT "avatar", "created_at", "github_api_profile_url", "github_profile_url", "name", "role", "updated_at", "user_id", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
