const { MyData } = require("../database");

const getDataHandler = async (req, res) => {
  try {
    const data = await MyData.find();
    res.json(data);
    console.log("/data  ********************");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getDataHandler;
