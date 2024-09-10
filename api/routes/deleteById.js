// import our Supabase instance
const supabase = require("../../supabaseInstance");

const deleteById = async (request, response, next) => {
  try {
    const res = await supabase.delete(`/beverages?id=eq.${request.params.id}`);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
