const errorRef = require('../utils/errorRef');

const validateId = db => async (req, res, next) => {
  try {
    const resource = await db.get(req.params.id);

    if (!resource) return res.status(404).json({
      message: `Could not find a resource with an id of (${req.params.id})`,
    });

    req.resource = resource;

    next();
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
}

module.exports = validateId;
