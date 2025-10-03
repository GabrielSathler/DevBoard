CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"github_username" varchar(255),
	"username" varchar(255) NOT NULL,
	"email" varchar(255),
	"curriculun" varchar(255) NOT NULL
);
