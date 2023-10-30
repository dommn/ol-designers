const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here - above the module.exports line


/*
router.get('/get-started-with-gov-uk-sign-in-v1', function (req, res) {
  res.render( req.folder  + '/get-started-with-gov-uk-sign-in-v1.html');
});

router.get('/create-account-or-sign-in-v1', function (req, res) {
  res.render( req.folder  + '/create-account-or-sign-in-v1.html');
});

router.get('/create-email-v1', function (req, res) {
  res.render( req.folder  + '/create-email-v1.html');
});

router.get('/create-checkemail-v1', function (req, res) {
  res.render( req.folder  + '/create-checkemail-v1.html');
});

router.get('/create-password-v1', function (req, res) {
  res.render( req.folder  + '/create-password-v1.html');
});

router.get('/create-entermobile-v1', function (req, res) {
  res.render( req.folder  + '/create-entermobile-v1.html');
});

router.get('/create-checkphone-v1', function (req, res) {
  res.render( req.folder  + '/create-checkphone-v1.html');
});

router.get('/you-have-created-your-account-v1', function (req, res) {
  res.render( req.folder  + '/you-have-created-your-account-v1.html');
});

router.get('/create-service-name-v1', function (req, res) {
  res.render( req.folder  + '/create-service-name-v1.html');
});
*/

router.post('/create-email-v1', function (req, res) {
  res.redirect('create-checkemail-v1');
  console.log('AFTER SERVICE EMAIL PAGE DATA: ', req.session.data);
});

router.post('/create-service-name-validation-v1', function (req, res) {
  if (req.session.data.clientName === '') {
    res.render( req.folder  + '/create-service-name-v1.html', {
      errorField: 'serviceName',
      errorMessage: 'Enter your service name',
      errorElementId: '#create-service-name'
    });
  } else {
    var clientNameDetailsSet = req.session.data.clientNameDetails = req.session.data.clientName;
    res.redirect('service-dashboard-v1');
    console.log('AFTER SERVICE NAME PAGE DATA: ', req.session.data);
  }

});

router.get('/service-dashboard-v1', function (req, res) {
  var insertCheckboxSession = req.session.data.optionalScopes = [];
  insertCheckboxSession[0] = 'Email';
  insertCheckboxSession[1] = 'Phone';
  if (!req.session.data.clientName) {
    var insertServiceName = req.session.data.clientName = 'Get a juggling licence';
    var insertClientName = req.session.data.clientNameDetails = 'Get a juggling licence';
  }

  var insertSectorIdentifierUrl = req.session.data.sectorIdentifierUrl = 'https://gds.gov.uk';
  var insertSectorRedirectrUrl = req.session.data.redirectUrl = 'https://get-a-juggling-licence.gov.uk/redirect/endpoint';
  var insertPublicKey = req.session.data.userPublicKey = '';
  var insertPostLogoutURL = req.session.data.postLogoutRedirectUrl = '';

  var previousValues = req.session.previousValues = req.session.data;

  res.render( req.folder  + '/service-dashboard-v1.html');
  console.log('DATA: ', req.session.data);
  console.log('previousValues: ', req.session.previousValues);
});


router.post('/amend-details-v1', function (req, res) {

  function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
  }

  console.log('DATA: ', req.session.data);
  console.log('previousValues: ', req.session.previousValues);

  if (req.session.data.clientNameDetails === '') {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'clientNameDetails',
      errorMessage: 'Enter a client name',
      errorElementId: '#client-name'
    });

  } else if (req.session.previousValues.redirectUrl !== '' && req.session.data.redirectUrl === '') {

    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'redirectUrlEmpty',
      errorMessage: 'Enter a redirect URI',
      errorElementId: '#redirect-url'
    });

  } else if (!isURL(req.session.data.redirectUrl) && req.session.data.redirectUrl !== '') {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'redirectUrlInvalid',
      errorMessage: 'Enter a URI in the correct format, like https://example.com',
      errorElementId: '#redirect-url'
    });



  } else if (req.session.previousValues.userPublicKey !== '' && req.session.data.userPublicKey === '') {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'userPublicKeyEmpty',
      errorMessage: 'Enter a public key',
      errorElementId: '#public-key'
    });



  } else if (req.session.previousValues.postLogoutRedirectUrl !== '' && req.session.data.postLogoutRedirectUrl === '') {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'postLogoutRedirectUrlEmpty',
      errorMessage: 'Enter a post logout URI',
      errorElementId: '#post-logout-redirect-url'
    });

  } else if (req.session.data.postLogoutRedirectUrl !== '' && !isURL(req.session.data.postLogoutRedirectUrl)) {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'postLogoutRedirectUrlInvalid',
      errorMessage: 'Enter a URI in the correct format, like https://example.com',
      errorElementId: '#post-logout-redirect-url'
    });



  } else if (req.session.previousValues.sectorIdentifierUrl !== '' && req.session.data.sectorIdentifierUrl === '') {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'sectorIdentifierUrlEmpty',
      errorMessage: 'Enter a sector identifier URI',
      errorElementId: '#slector-identifier-url'
    });

  } else if (req.session.data.sectorIdentifierUrl !== '' && !isURL(req.session.data.sectorIdentifierUrl)) {
    res.render( req.folder  + '/service-update-details-v1.html', {
      errorField: 'sectorIdentifierUrlInvalid',
      errorMessage: 'Enter a URI in the correct format, like https://example.com',
      errorElementId: '#slector-identifier-url'
    });


  } else {
    var isDataUpdated = req.session.data.userDetailsUpdated = 'yes';
    res.redirect('/service-dashboard-updated-v1');
    console.log(req.session.data);
    console.log(req.session.data.userDetailsUpdated);
  }
});

router.get('/service-dashboard-updated-v1', function (req, res) {
  if (req.session.data.userDetailsUpdated === 'yes') {
    res.render( req.folder  + '/service-dashboard-updated-v1.html', {userDetailsUpdated: 'yes'});
  } else {
    res.render( req.folder  + '/service-dashboard-updated-v1.html');
  }
  var isNotDataUpdated = req.session.data.userDetailsUpdated = 'no';
  const previousValues = req.session.previousValues = req.session.data;

  console.log('DATA: ', req.session.data);
  console.log('previousValues: ', req.session.previousValues);

});



router.get('/service-settings-page-v1', function (req, res) {
  if (req.session.data.serviceNameUpdated === 'yes') {
    res.render( req.folder  + '/service-settings-page-v1.html', {serviceNameUpdated: 'yes'});
    req.session.data.serviceNameUpdated = 'no';
  } else {
    res.render( req.folder  + '/service-settings-page-v1.html');
  }
});

router.post('/amend-settings-v1', function (req, res) {
  if (req.session.data.clientName === '') {
    res.render( req.folder  + '/service-settings-page-updated-v1.html', {
      errorField: 'clientName',
      errorMessage: 'Enter your service name',
      errorElementId: '#client-name'
    });
  } else {
    var isServiceNameUpdated = req.session.data.serviceNameUpdated = 'yes';
    res.redirect('service-settings-page-v1');
  }

});



router.post('/request-to-join-pb-v1', function (req, res) {
  if (req.session.data.userHumanName === '') {
    res.render( req.folder  + '/request-to-join-private-beta-v1.html', {
      errorField: 'userHumanName',
      errorMessage: 'Enter your name',
      errorElementId: '#userHumanName'
    });
    console.log(req.session.data);
  } else if (req.session.data.userDepartment === ''){
    res.render( req.folder  + '/request-to-join-private-beta-v1.html', {
      errorField: 'userDepartment',
      errorMessage: 'Enter your department',
      errorElementId: '#userDepartment'
    });
    console.log(req.session.data);
  } else {
    res.redirect('/private-beta-request-submitted-v1');
    console.log(req.session.data);
  }

});

module.exports = router
