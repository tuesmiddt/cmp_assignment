import { z } from "zod";

const Submission = z.object({
  name: z.string().min(1),
  temperature: z.number().min(35).max(42),
  hasSymptoms: z.boolean(),
  hasContact: z.boolean(),
});

export type TSubmission = z.infer<typeof Submission>;

export default Submission;
