const preferenceRepository = require("../repository/preference.repository");

const createOrUpdatePreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const { gender, ageRange, distance } = req.body;

    // Prepare the preference data
    const preferenceData = {
      gender,
      ageRange,
      distance
    };

    // Call the repository
    const preferences = await preferenceRepository.createOrUpdate(userId, preferenceData);

    res.status(200).json({
      status: true,
      message: "Preferences saved successfully",
      data: preferences
    });
  } catch (error) {
    console.error("Error saving preferences:", error);
    res.status(500).json({
      status: false,
      message: "Server error while saving preferences"
    });
  }
};

module.exports = { createOrUpdatePreferences };
