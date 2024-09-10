// import our Supabase instance
const supabase = require("../../supabaseInstance");

const getAll = async (request, response, next) => {
  try {
    console.log(request);
    // response.json(BEVERAGES);
    const res = await supabase.get("/beverages");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
