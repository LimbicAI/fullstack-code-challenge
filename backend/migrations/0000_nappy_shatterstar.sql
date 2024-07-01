CREATE TABLE IF NOT EXISTS "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"question_id" integer NOT NULL,
	"creator_id" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "answers_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(123),
	"description" varchar(256),
	"author_id" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "questions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"birthday" date NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "question_id_answer_id" ON "answers" USING btree ("question_id","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_answer_id" ON "answers" USING btree ("creator_id","id");