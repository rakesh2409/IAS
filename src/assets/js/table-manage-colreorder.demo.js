/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/angularjs2/
*/

var handleDataTableColReorder = function() {
	"use strict";
    
    if ($('#data-table').length !== 0) {
        $('#data-table').DataTable({
            colReorder: true,
            responsive: true
        });
    }
};

var TableManageColReorder = function () {
	"use strict";
    return {
        //main function
        init: function () {
            $.getScript('assets/plugins/DataTables/media/js/jquery.dataTables.js').done(function() {
                $.getScript('assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js').done(function() {
                    $.getScript('assets/plugins/DataTables/extensions/ColReorder/js/dataTables.colReorder.min.js').done(function() {
                        $.getScript('assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js').done(function() {
                            handleDataTableColReorder();
                        });
                    });
                });
            });
        }
    };
}();