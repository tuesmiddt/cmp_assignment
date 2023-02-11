import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import type { TSubmission } from "@src/models/DeclarationSubmission";
import Submission from "@src/models/DeclarationSubmission";
import { IReq, IRes } from "./types/express/misc";

function submit(req: IReq<{ submission: TSubmission }>, res: IRes) {
  const parsed = Submission.safeParse(req.body);
  if (!parsed.success) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(parsed.error).end();
  }

  console.log(parsed.data);

  return res.status(HttpStatusCodes.CREATED).json({}).end();
}

export default {
  submit,
} as const;
