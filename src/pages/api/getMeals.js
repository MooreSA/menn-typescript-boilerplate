import connect from "../../lib/db/connect";
import Meal from "../../lib/models/meal";

const getMeals = async (req, res) => {
  try {
    await connect();
    const meals = await Meal.find();

    return res.status(200).json({
      status: "success",
      data: {
        meals,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export default getMeals;
