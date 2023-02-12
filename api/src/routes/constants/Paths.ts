/**
 * Express router paths go here.
 */

import { Immutable } from "@src/other/types";

const Paths = {
  Base: "/api",
  DeclarationForm: {
    Base: "/declaration_form",
    Create: "/submit",
    Get: "/",
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
