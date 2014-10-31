/*
*   Tests the nodejs wrapper. Also can serve as examples to use the wrapper.
*   Only tests operaations done with sessions. Should call all the functions at 
*   least once.
*
*/

var OktaAPI = require("../index.js");
var okta = new OktaAPI("", "", false);
var should = require("should");
var log = function(str, newline) {
	if(newline == undefined) newline = false;
	process.stdout.write(str + (newline ? "\n" : ""));
}
var checking = function(str) {
	log("Checking " + str + "()");
}
var ok = function() {
	log(" OK!", true);
}

var now = new Date().valueOf();
var username = "";
var password = "";

log("Starting Test Suite...", true);

var sessionId;


/*
*   creates a session
*/
okta.createSession(username, password, null, function(d) {
    checking("createSession");
    d.should.have.property("success", true);
    d.should.have.property("resp").with.property("id");
    sessionId = d.resp.id;
    ok();
    doThingsWithSession();
});

/*
*   creates a session, with a token
*/
okta.createSession(username, password, {'additionalFields' : 'cookieToken'}, function(d) {
    checking("createSession with one time token");
    d.should.have.property("success", true);
    d.should.have.property("resp").with.property("id");
    //sessionId = d.resp.id;
    ok();
});

function doThingsWithSession() {

    /*
    *   validates a session
    */
    okta.validateSession(sessionId, function(d) {
        checking("validateSession");
        d.should.have.property("success", true);
        d.should.have.property("resp").with.property("id", sessionId);
        ok();
    });

    /*
    *   extends a session
    */
    okta.extendSession(sessionId, function(d) {
        checking("extendSession");
        d.should.have.property("success", true);
        d.should.have.property("resp").with.property("id", sessionId);
        ok();
    });
}

setTimeout(function() {

    /*
    *   closes a session
    */
    okta.closeSession(sessionId, function(d) {
        checking("closeSession");
        d.should.have.property("success", true);
        ok();
    });
}, 5000);