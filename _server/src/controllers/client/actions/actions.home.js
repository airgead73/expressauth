const asyncHandler = require('../../middleware/handleAsync');

/**
 * @route   GET /
 * @desc    view home page 
 * @access  public
 */

exports.v_home = asyncHandler(async function(req, res, next) {
  res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
});

/**
 * @route   GET /
 * @desc    view profile 
 * @access  private
 */

 exports.v_profile = asyncHandler(async function(req, res, next) {
  res.send(req.oidc.user);
});
