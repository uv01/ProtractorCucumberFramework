"use strict";
var secureRandomui_page = require("../pages/secureRandomUi");
var pageUtils = require("../resusableFunctions/reusableStepUtils");
var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {
    Given(/^As a user on the home page$/, function () {
        browser.refresh();
        return pageUtils.verifyText(secureRandomui_page.messageValidation,"Secure Random Hexadecimal Strings");
    });

    When(/^I enter "(.*?)" and click submit$/, function (value) {
        pageUtils.enterText(secureRandomui_page.numberOfStringsToGenerateTextBox,value);
        pageUtils.clickElement(secureRandomui_page.submitButton);
    });

    Then(/^It should show me "(.*?)" random strings I requested$/, function (value) {
        var result = secureRandomui_page.numberOfStringsGenerated.count().then(function (count) {
            return expect(count).to.equal(parseInt(value));
        });
        return result;
    });

    Then(/^I should see an input field for the number of random strings I want to generate$/, function () {
        var isDisplayed = secureRandomui_page.numberOfStringsToGenerateTextBox.isDisplayed().then(function (displayed) {
            return expect(displayed).to.equal(true);
        });
        return isDisplayed;
    });

    Then(/^It should display "(.*?)"$/, function (expectedMessage) {
        var Result = secureRandomui_page.messageValidation.getText().then(function (actualMessage) {
            return expect(actualMessage).to.equal(expectedMessage);
        });
        return Result;
    });

    Then(/^I should see a submit button$/, function () {
        var isDisplayed = secureRandomui_page.submitButton.isDisplayed().then(function (displayed) {
            return expect(displayed).to.equal(true);
        });
        return isDisplayed;
    });

});
