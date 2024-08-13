import express from 'express';
import { getAllServices, getCoaforPrices, getFrizeriePrices, getManipediPrices, getVopsitPrices, getCosmeticaFemeiPrices, getCosmeticaBarbatiPrices,getGeneralPrices } from '../controllers/services.controller.js';


const preturiRouter = express.Router();

preturiRouter.get('/services', getAllServices);
preturiRouter.get('/coafor', getCoaforPrices);
preturiRouter.get('/frizerie', getFrizeriePrices);
preturiRouter.get('/manipedi', getManipediPrices);
preturiRouter.get('/vopsit', getVopsitPrices);
preturiRouter.get('/cosmeticafemei', getCosmeticaFemeiPrices);
preturiRouter.get('/cosmeticabarbati', getCosmeticaBarbatiPrices);


preturiRouter.get('/general', getGeneralPrices);



export default preturiRouter;