var app = {

    showAlert: function(message, title) {
	// Message modification for troubleshooting purposes
	if (navigator.notification) {
	    message = "Native Notification " + message;
	    navigator.notification.alert(message, null, title, 'OK');
	} else {
	    message = "Browser Notification " + message;
	    alert(title ? (title + ": " + message) : message);
	}
    },

    route: function() {
	var hash = window.location.hash;
	if (!hash) {
	    $('body').html(new HomeView(this.store).render().el);
	    return;
	}
	var match = hash.match(app.detailsURL);
	if (match) {
	    this.store.findById(Number(match[1]), function(employee) {
		$('body').html(new EmployeeView(employee).render().el);
	    });
	}
    },

    registerEvents: function() {
	var self = this;
	$(window).on('hashchange', $.proxy(this.route, this));
	// Check of browser supports touch events
	if (document.documentElement.hasOwnProperty('ontouchstart')) {
	    // ... if yes: register touch even listener to change the "selected" state of the item
	    $('body').on('touchstart', 'a', function(even) {
		$(event.target).removeClass('tappable-active');
	    });
	} else {
	    // ... if not: register mouse events instead
	    $('body').on('mousedown', 'a', function(event) {
		$(event.target).addClass('tappable-active');
	    });
	    $('body').on('mouseup', 'a', function(event) {
		$(event.target).removeClass('tappable-active');
	    });
	}
    },

    initialize: function() {
	var self = this;
	this.detailsURL = /^#employees\/(\d{1,})/;
	this.registerEvents();
	this.store = new MemoryStore(function() {
	    self.route();
	});
    }

};

app.initialize();