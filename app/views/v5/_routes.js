const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here - above the module.exports line


// always make post actions absolute in relation to the router, but make the redirects relative
//(or make them absolute relating to the full path)

router.post('/create/create-email', function (req, res) {
  res.redirect('create-checkemail');
  console.log('AFTER SERVICE EMAIL PAGE DATA: ', req.session.data);
});


router.post('/create/create-entermobile', function (req, res) {
  res.redirect('create-checkphone');
  console.log('AFTER SERVICE EMAIL PAGE DATA: ', req.session.data);
});



//Copy URL from form action attribute to post
//Copy URL button redirect to res.redirect
//Remove URL from button on page, remove , from line before
/* router.post('/create-service-name', function (req, res) {
  res.redirect("/" + req.folder + "/service/index");
  console.log('AFTER SERVICE EMAIL PAGE DATA: ', req.session.data);
}); */





// log all the things

router.use((req, res, next) => {
        const log = {
        method: req.method,
        url: req.originalUrl,
        data: req.session.data
      }
      console.log(JSON.stringify(log, null, 2))

    next()
  })

  // FLASH! AH-AH … this allows for one time showing of success banner

  // Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
  router.use(function(req, res, next){
        // if there's a flash message in the session request, make it available in the response, then delete it
        if (req.session.sessionFlash) {
        res.locals.sessionFlash = req.session.sessionFlash;
        req.session.sessionFlash = undefined;
        delete req.session.sessionFlash;
        }
        next();
    });


router.post('/team-members/change-permissions-router', function(req, res){
  req.session.sessionFlash = "new user";
  res.redirect("/" + req.folder + "/team-members/index");
})


router.post('/change-service-name-router', function(req, res){
  req.session.sessionFlash = "service name";
  res.redirect("/" + req.folder + "/service/index");
})

router.post('/create/create-name-router', function (req, res){
req.session.sessionFlash = "joined";

  res.redirect("/" + req.folder + "/service/index");
})


router.post('/service-update-details-redirect-uris-router', function (req, res){
req.session.sessionFlash = "Redirect URI";

  res.redirect("/" + req.folder + "/service/index");
})


router.post('/service-update-details-user-attributes-router', function (req, res){
req.session.sessionFlash = "User attributes";
  res.redirect("/" + req.folder + "/service/index");
})

// TO ADD - public key and post logout redirect uris

//change account details

router.post('/your-account/change-name-router', function (req, res){
req.session.sessionFlash = "Name";

  res.redirect( "/" +  req.folder + '/your-account/index');
})


router.post('/your-account/change-email-router', function (req, res){
req.session.sessionFlash = "Email";

  res.redirect("/" +  req.folder + '/your-account/index');
})

router.post('/your-account/change-password-router', function (req, res){
req.session.sessionFlash = "Password";

  res.redirect("/" +  req.folder + '/your-account/index');
})

router.post('/your-account/change-checkphone-router', function (req, res){
   req.session.sessionFlash = "Phone number";

  res.redirect("/" +  req.folder + '/your-account/index');
})


// invite page links to this router which then pushes the form data to an array that can be played back on the team page
router.post('/team-members/invite-router', function (req, res) {

 if (!req.session.data.newUser) {
   req.session.data.newUser = [];
 }

var tempUser = {"inviteEmail": req.session.data.inviteEmail , "invitePermissions" : req.session.data.invitePermissions };

  req.session.data.newUser.push(tempUser);

  req.session.data.lastEmail = req.session.data.inviteEmail; // use this to keep email for next page

req.session.data.inviteEmail = undefined;

req.session.data.invitePermissions = undefined;

delete req.session.data.inviteEmail;
delete req.session.data.invitePermissions

    res.redirect('invite-sent');

  });


router.get("/private-beta/index", function(req,res){
  const dateObj = new Date()
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  res.locals.date = dateObj.toLocaleString("en-GB", options)
  res.render("v3/private-beta/index")
})

module.exports = router
