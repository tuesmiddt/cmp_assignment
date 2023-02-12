import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import type { TSubmission } from "@src/models/DeclarationSubmission";
import {
  Submission,
  createSubmission,
  getSubmissions,
} from "@src/models/DeclarationSubmission";
import { IReq, IRes } from "./types/express/misc";

async function submit(req: IReq<{ submission: TSubmission }>, res: IRes) {
  const parsed = Submission.safeParse(req.body);
  if (!parsed.success) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(parsed.error).end();
  }

  await createSubmission(parsed.data);
  res.status(HttpStatusCodes.CREATED).json({}).end();
}

async function getAll(req: IReq, res: IRes) {
  const data = await getSubmissions();
  res.status(HttpStatusCodes.OK).json(data).end();
}

export default {
  submit,
  getAll,
} as const;
