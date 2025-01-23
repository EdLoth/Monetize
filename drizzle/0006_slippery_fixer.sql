CREATE TABLE IF NOT EXISTS "achievements" (
	"id" text PRIMARY KEY NOT NULL,
	"amountTotal" integer NOT NULL,
	"amountReceived" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"monthlyPayment" integer NOT NULL,
	"paymentHistory" text DEFAULT '[]' NOT NULL
);
