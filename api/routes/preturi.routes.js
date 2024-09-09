import express from 'express';
import { getAllServices, getCoaforPrices, getFrizeriePrices,getSuviteVopseaPrices,getSuvitePrices, getCreponatPrices,getOcaziePrices,getCoafatPrices,getAfroPrices, getManipediPrices,getDecoloratPrices,getDecoloratPachete, getVopsitPrices,getVopsitPachete, getCosmeticaFemeiPrices, getCosmeticaBarbatiPrices,getVopsitPacheteFara,getGeneralPrices } from '../controllers/services.controller.js';


const preturiRouter = express.Router();

preturiRouter.get('/services', getAllServices);
preturiRouter.get('/coafor', getCoaforPrices);
preturiRouter.get('/creponat', getCreponatPrices);
preturiRouter.get('/coafat', getCoafatPrices);
preturiRouter.get('/afro', getAfroPrices);
preturiRouter.get('/ocazie', getOcaziePrices);
preturiRouter.get('/frizerie', getFrizeriePrices);
preturiRouter.get('/manipedi', getManipediPrices);
preturiRouter.get('/vopsit', getVopsitPrices);
preturiRouter.get('/suvite', getSuvitePrices);
preturiRouter.get('/suvitevopsea', getSuviteVopseaPrices);
preturiRouter.get('/cosmeticafemei', getCosmeticaFemeiPrices);
preturiRouter.get('/cosmeticabarbati', getCosmeticaBarbatiPrices);
preturiRouter.get('/vopsit/pachete-fara', getVopsitPacheteFara);
preturiRouter.get('/vopsit/pachete', getVopsitPachete);
preturiRouter.get('/decolorat/pachete', getDecoloratPachete);
preturiRouter.get('/decolorat/pachete', getDecoloratPrices);


preturiRouter.get('/general', getGeneralPrices);



export default preturiRouter;