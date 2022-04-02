import connect from "../../lib/db/connect";
import Meal from "../../lib/models/meal";

const deleteItem = async (req, res) => {
  try {
    await connect();
    const { id } = req.body;
    await Meal.deleteOne({ _id: id });
    return res.status(200).json({
      status: "success",
      data: {
        message: "Meal deleted successfully",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

export default deleteItem;
