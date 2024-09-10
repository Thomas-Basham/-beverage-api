// import our Supabase instance
const supabase = require("../../supabaseInstance");

const getAll = async (request, response, next) => {
  try {
    const res = await supabase.get("/beverages");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
