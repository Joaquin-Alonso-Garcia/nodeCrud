module.exports = (app, path, model, message = '') => {
  return {
    setup: (methods) => {
      if (methods.get === true) {
        app.get(path, async (req, res) => {
          try {
            const result = await model.get();

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
            const result = await model.post(req.body);

            res.status(201).json({
              success: true,
              data: result,
              message: `New ${message} created successfully`
            });
          } catch (error) {
            if (error.name === 'ValidationError') {
              return res.status(400).json({
                success: false,
                message: error.message
              });
            }

            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
              return res.status(400).json({
                success: false,
                message: 'Email already exists'
              });
            }

            res.status(500).json({
              success: false,
              message: `Server error occurred while posting: ${error}`
            });
          }
        });
      }

      if (methods.put === true) {
        app.put(path, async (req, res) => {
          try {
            const result = await model.put(req.body);

            res.status(201).json({
              success: true,
              data: result,
              message: `${message} updated successfully`
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: `Server error occurred while updting: ${error}`
            });
          }
        });

        if (methods.delete === true) {
          app.delete(path, async (req, res) => {
            try {
              const result = await model.delete(req.body);

              res.status(200).json({
                success: true,
                data: result,
                message: `${message} deleted successfully`
              });
            } catch (error) {
              res.status(500).json({
                success: false,
                message: `Server error occurred while deleting: ${error}`
              });
            }
          });
        }
      }
    }
  };
};
