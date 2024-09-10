const addItem = async (request, response, next) => {
  try {
    // destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;

    // error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !inStock) {
      return response
        .status(400)
        .json({ message: "Missing required fields!!" });
    }

    // create a new object with a new ID
    const newBeverage = {
      // id: BEVERAGES.length + 1,
      name,
      description,
      price,
      category,
      inStock,
    };

    // send our object to our SQL db
    const res = await supabase.post("/beverages", newBeverage);

    response.status(201).json(newBeverage);
  } catch (error) {
    next(error);
  }
};

module.exports = addItem;
