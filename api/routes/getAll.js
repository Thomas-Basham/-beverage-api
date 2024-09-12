// import our Supabase instance
const supabase = require("../../supabaseInstance");

const cache = {};

const getAll = async (request, response, next) => {
  try {
    if (cache["beverages"]) {
      console.log("CACHE MONEY!!!");
      return response.json(cache["beverages"]);
    }

    const res = await supabase.get("/beverages");

    // add the response data to our cache
    cache["beverages"] = res.data;

    console.log("ADDED TO CACHE");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
