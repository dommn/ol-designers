const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here - above the module.exports line

  router.post('/support-request', function(request, response) {

    var country = request.session.data['support-req']
    if (country == "gov-service-start-using-sign-in"){
        response.redirect("product-site/contact-us-details")
    } 
    else if (country == "gov-service-uses-sign-in"){
        response.redirect("product-site/contact-us")
    }
    else {
        response.redirect("product-site/contact-us-public")
    }
})


module.exports = router
