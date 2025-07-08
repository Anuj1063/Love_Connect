const express = require("express");
const router = express.Router();
const preferenceController = require("../../module/preference/controller/preference.controller");
const authCheck = require("../../middleware/auth.middleware")();

// POST /api/preferences
router.post("/preference", authCheck.authenticateAPI, preferenceController.createOrUpdatePreferences);

module.exports = router;
