module.exports = (app, path, model, message = '') => {
  return {
    setup: (methods) => {
      if (methods.get === true) {
        app.get(path, async (req, res) => {
          try {
            const result = await model.get();
            console.log('🚀 ~ result:', result);

            res.status(200).json({
              success: true,
              data: result,
              count: result.length
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: `Server error occurred while fetching ${message}: ${error}`
            });
          }
        });
      }

      if (methods.post === true) {
        app.post(path, async (req, res) => {
          try {
            const result = await model.post();

            res.status(201).json({
              success: true,
              data: result,
              message: `New ${message} created successfully`
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: `Server error occurred while posting: ${error}`
            });
          }
        });
      }
    }
  };
};
