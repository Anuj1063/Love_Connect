const Preference = require("../model/preference.model");

const findByUserId = async (userId) => {
  return await Preference.findOne({ userId });
};

const createOrUpdate = async (userId, preferenceData) => {
  return await Preference.findOneAndUpdate(
    { userId },
    preferenceData,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

module.exports = {
  findByUserId,
  createOrUpdate
};
