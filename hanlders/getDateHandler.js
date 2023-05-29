const { MyData } = require("../database");

const getDateHandler = async (req, res) => {
  try {
    const { date } = req.params;
    const data = await MyData.find({ date });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getDateHandler;
