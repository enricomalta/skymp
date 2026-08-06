import { Router } from "express";
import { AntiCheatController } from "./AntiCheatController";


const router = Router();

const controller =
    new AntiCheatController();


router.post(
    "/events",
    controller.create.bind(controller)
);


export default router;