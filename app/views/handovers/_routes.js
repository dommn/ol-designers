const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here - above the module.exports line

 
router.post('/support-answer', function (req, res) {

    var whoIssued = req.session.data['support-request']
  
    if (whoIssued == "live-service-issue"){
      res.redirect('handovers/sse-2993/contact-us')
    } else if (whoIssued == "more-information") {
      res.redirect('handovers/sse-2993/contact-us-details')
    }
})

module.exports = router