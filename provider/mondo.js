"use strict";
var utility_1 = require("../utility");
var PROVIDER_NAME = "Mondo";
var Mondo = (function () {
    function Mondo(options) {
        if (options === void 0) { options = {}; }
        if (!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        this.MondoOptions = options;
        this.MondoOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowURL = "https://auth.getmondo.co.uk/?client_id=" + this.MondoOptions.clientId + "&redirect_uri=" + this.MondoOptions.redirectUri + "&response_type=code&state=" + this.MondoOptions.stateToken;
    }
    Mondo.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var browserRef = window.cordova.InAppBrowser.open(_this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
                if ((event.url).indexOf(_this.MondoOptions.redirectUri) === 0) {
                    browserRef.removeEventListener("exit", function (event) { });
                    browserRef.close();
                    var parsedResponse = (new utility_1.OauthUtility()).parseImplicitResponse(((event.url).split("#")[1]).split("&"));
                    if (parsedResponse) {
                        resolve(parsedResponse);
                    }
                    else {
                        reject("Problem authenticating with " + PROVIDER_NAME);
                    }
                }
            });
            browserRef.addEventListener("exit", function (event) {
                reject("The " + PROVIDER_NAME + " sign in flow was canceled");
            });
        });
    };
    return Mondo;
}());
exports.Mondo = Mondo;
