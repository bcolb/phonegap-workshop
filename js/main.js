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

    renderHomeView: function() {
	$('body').html(this.homeTpl());
	$('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    findByName: function() {
	var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    initialize: function() {
	var self = this;
	this.homeTpl = Handlebars.compile($("#home-tpl").html());
	this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        this.store = new MemoryStore(function() {
	    self.renderHomeView();
	});
    }

};

app.initialize();