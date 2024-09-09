import express from 'express';
import { getAllServices, getCoaforPrices, getFrizeriePrices, getManipediPrices, getVopsitPrices,getVopsitPachete, getCosmeticaFemeiPrices, getCosmeticaBarbatiPrices,getVopsitPacheteFara,getGeneralPrices } from '../controllers/services.controller.js';


const preturiRouter = express.Router();

preturiRouter.get('/services', getAllServices);
preturiRouter.get('/coafor', getCoaforPrices);
preturiRouter.get('/frizerie', getFrizeriePrices);
preturiRouter.get('/manipedi', getManipediPrices);
preturiRouter.get('/vopsit', getVopsitPrices);
preturiRouter.get('/cosmeticafemei', getCosmeticaFemeiPrices);
preturiRouter.get('/cosmeticabarbati', getCosmeticaBarbatiPrices);
preturiRouter.get('/vopsit/pachete-fara', getVopsitPacheteFara);
preturiRouter.get('/vopsit/pachete', getVopsitPachete);


preturiRouter.get('/general', getGeneralPrices);



export default preturiRouter;