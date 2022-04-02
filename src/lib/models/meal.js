import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
});

const Meal = mongoose.models.Meal || mongoose.model("Meal", mealSchema);

export default Meal;
