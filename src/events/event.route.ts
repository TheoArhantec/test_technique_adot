import {Router} from "express";
import {getEventByCoordinate} from "./event.controller";

const router = Router();

router.post('/event', getEventByCoordinate)

export default router;
