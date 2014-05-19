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

    initialize: function() {
	var self = this;
        this.store = new MemoryStore(function() {
	    $('body').html(new HomeView(self.store).render().el);
	});
    }

};

app.initialize();