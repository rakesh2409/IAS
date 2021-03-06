/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/angularjs2/
*/

var handleEmailToInput = function() {
    $('#email-to').tagit({
        availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"]
    });
};

var handleEmailContent = function() {
    $('#wysihtml5').wysihtml5();
};

var EmailCompose = function () {
	"use strict";
    return {
        //main function
        init: function () {
            $.getScript('assets/plugins/jquery-tag-it/js/tag-it.min.js').done(function() {
                handleEmailToInput();
            });
            
            $.getScript('assets/plugins/bootstrap-wysihtml5/dist/bootstrap3-wysihtml5.all.min.js').done(function() {
                handleEmailContent();
            });
        }
    };
}();