// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
    $$.getJSON('http://viraadv.ir/backend/web/peyk/data/orders', function (data) {
        $$.each(data, function (key, value) {
            var html = '<div class="card">' +
                '<a href="about.html">' +
                '<div class="card-header">'+ value.title +'</div>' +
                '<div class="card-content">' +
                '<img src="http://viraadv.ir/backend/web/uploads/peyk_orders/1.jpg" style="width: 100%">' +
                '</div></a></div>';

            $$('#getOrders').append(html);
        });
    });
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name == 'index') {

        $$.getJSON('http://viraadv.ir/backend/web/peyk/data/orders', function (data) {
            $$.each(data, function (key, value) {
                var html = '<div class="card">' +
                    '<a href="about.html">' +
                    '<div class="card-header">'+ value.title +'</div>' +
                    '<div class="card-content">' +
                    '<img src="http://viraadv.ir/backend/web/uploads/peyk_orders/'+ value.pic +'" style="width: 100%">' +
                    '</div></a></div>';
                
                $$('#getOrders').append(html);
            });
        });
    }
    
    if (page.name == 'category') {

        $$.getJSON('http://viraadv.ir/backend/web/peyk/data/categories', function (data) {
            $$.each(data, function (key, value) {
                var html = '<li class="item-content">' +
                    '<div class="item-media"><i class="icon icon-f7"></i></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title">'+ value.name +'</div>' +
                    ' </div>' +
                    ' </li>';
                $$('#getCategory').append(html);
            });
        });
    }


    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
})