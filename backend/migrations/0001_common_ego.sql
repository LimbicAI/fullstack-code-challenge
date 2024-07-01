DROP INDEX IF EXISTS "question_id_answer_id";--> statement-breakpoint
DROP INDEX IF EXISTS "user_id_answer_id";--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "question_id_answer_id_created_at" ON "answers" USING btree ("question_id","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_answer_id_created_at" ON "answers" USING btree ("creator_id","id");