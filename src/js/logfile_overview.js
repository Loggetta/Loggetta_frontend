
var logfileOverview = new Vue({
	delimiters: ['${', '}'],
	el: '#app',
	data: {
		logfiles: []
	},
	methods: {
		openLog: function (logfile) {
			console.log("open "+logfile.name);
			window.location.href = "logview.html?id="+logfile.id;
		}
	}
});

$.ajax({
	method: "GET",
	url: "http://localhost:3000/logfiles",
	data: { name: "John", location: "Boston" }
}).done(function( msg ) {
	console.log(msg);
	logfileOverview.logfiles = msg;
});