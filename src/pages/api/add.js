import connect from "../../lib/db/connect";
import Meal from "../../lib/models/meal";

const add = async (req, res) => {
  const { meal, name, calories } = req.body;
  console.log(meal, name, calories);
  if (meal == undefined || name == undefined || calories == undefined) {
    return res.status(400).json({
      status: "error",
      message: "Please provide all required fields",
    });
  }
  const intCalories = parseInt(calories);
  if (intCalories < 0) {
    return res.status(400).json({
      status: "error",
      message: "Calories must be a positive number",
    });
  }

  console.log(req.body);
  try {
    await connect();
    const newMeal = new Meal({
      meal,
      name,
      calories: intCalories,
    });

    await newMeal.save();

    return res.status(200).json({
      status: "success",
      message: "Meal added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export default add;
