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

    registerEvents: function() {
	var self = this;
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
        this.store = new MemoryStore(function() {
	    $('body').html(new HomeView(self.store).render().el);
	});
	this.registerEvents();
    }

};

app.initialize();