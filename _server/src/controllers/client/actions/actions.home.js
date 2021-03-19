const asyncHandler = require('../../middleware/handleAsync');

/**
 * @route   GET /
 * @desc    view home page 
 * @access  public
 */

exports.v_home = asyncHandler(async function(req, res, next) {
  //res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
  return res
    .status(200)
    .render('pages/index', {
      success: true,
      title: 'home'
    });
});

/**
 * @route   GET /
 * @desc    view profile 
 * @access  private
 */

 exports.v_profile = asyncHandler(async function(req, res, next) {
  //res.send(req.oidc.user);
  return res
    .status(200)
    .render('pages/profile', {
      success: true,
      title: 'profile',
      
    });  
});

/**
 * @route   GET /
 * @desc    view profile json
 * @access  private
 */

 exports.api_profile = asyncHandler(async function(req, res, next) {
  //res.send(req.oidc.user);
  return res
    .status(200)
    .json({
      success: true,
      user: req.oidc.user
    });
});
