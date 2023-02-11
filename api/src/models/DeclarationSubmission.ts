import { z } from "zod";
import db from "@src/services/DatabaseService";

export const Submission = z.object({
  name: z.string().min(1),
  temperature: z.number().min(35).max(42),
  hasSymptoms: z.boolean(),
  hasContact: z.boolean(),
  createdAt: z.date().optional(),
});

export type TSubmission = z.infer<typeof Submission>;

export async function createSubmission(submission: TSubmission): Promise<void> {
  await db("submissions").insert({
    name: submission.name,
    temperature: submission.temperature,
    has_symptoms: submission.hasSymptoms,
    has_contact: submission.hasContact,
  });
}

export async function getSubmissions(): Promise<Array<TSubmission>> {
  const result = (await db("submissions").select([
    "name",
    "temperature",
    "has_symptoms as hasSymptoms",
    "has_contact as hasContact",
    "created_at as createdAt",
  ])) as Array<TSubmission>;

  return result;
}
