import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { loginController, meController, registerController, } from "./auth.controller.js";
const authRouter = Router();
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", requireAuth, meController);
export default authRouter;
//# sourceMappingURL=auth.route.js.map