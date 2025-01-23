CREATE TABLE IF NOT EXISTS "wishlist" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"title" text NOT NULL,
	"link" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
