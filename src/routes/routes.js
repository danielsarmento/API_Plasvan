import express from 'express';

import {home} from '../controllers/controller_home.js'
import {createRecord} from '../controllers/controller_pipefy.js'

const routes = express.Router();

routes.get("/", home);
routes.post("/createData", createRecord)

export default routes