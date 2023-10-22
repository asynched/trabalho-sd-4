CREATE TABLE `sessions` (
	`session_id` text(32) PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`username` text(32) NOT NULL,
	`avatar` text(255) NOT NULL,
	`role` text DEFAULT 'guest' NOT NULL,
	`grade` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);