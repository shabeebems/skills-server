import express from "express";
import { LocationController } from "../controller/location.controller";
import { validate } from "../middlewares/zodValidate";
import { countrySchema, stateSchema, districtSchema } from "../schemas/location.schema";

const router = express.Router();
const locationController = new LocationController();

// Country
router.post("/countries", validate(countrySchema), locationController.createCountry);
router.get("/countries", locationController.getAllCountries);

// State
router.post("/states", validate(stateSchema), locationController.createState);
router.get("/states/:countryCode", locationController.getStatesByCountryCode);

// District
router.post("/districts", validate(districtSchema), locationController.createDistrict);
router.get("/districts/state/:stateCode", locationController.getDistrictsByStateCode);
router.get("/districts/country/:countryCode", locationController.getDistrictsByCountryCode);

export default router;
