// import our Supabase instance
const supabase = require("../../supabaseInstance");

const getById = async (request, response, next) => {
  try {
    const res = await supabase.get(`/beverages?id=eq.${request.params.id}`);

    //Error Handling
    if (!res.data.length) {
      return response.status(404).json({ message: "Beverage does not exist!" });
    }

    // send our beverage object
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
