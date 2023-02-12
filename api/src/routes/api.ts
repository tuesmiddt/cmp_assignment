import { Router } from "express";

import Paths from "./constants/Paths";

import DeclarationFormRoutes from "./DeclarationFormRoutes";

// **** Variables **** //

const apiRouter = Router();

// Add Declaration Form Submission Router

const declarationFormRouter = Router();

declarationFormRouter.post(
  Paths.DeclarationForm.Create,
  DeclarationFormRoutes.submit
);

declarationFormRouter.get(
  Paths.DeclarationForm.Get,
  DeclarationFormRoutes.getAll
);

apiRouter.use(Paths.DeclarationForm.Base, declarationFormRouter);

// **** Export default **** //

export default apiRouter;
