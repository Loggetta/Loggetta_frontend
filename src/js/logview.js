
var app = new Vue({
  delimiters: ['${', '}'],
    el: '#app',
    data: {
	  lines: [],
	  filterText:'',
	  filterTextInput: '',
	  message: 'Hello Vue!',
	  loading:true,
	  currentLinesCount:0,
	  totalLinesCount:0,
        loglevelList:[
            {logLevel:"DEBUG",background:"#fff",color:"#000", active:true},
            {logLevel:"ERROR",background:"#ffc7ce",color:"#9c0006", active:true},
            {logLevel:"FATAL",background:"#ffc7ce",color:"#9c0006", active:true},
            {logLevel:"INFO",background:"#fff",color:"#fa7d00", active:true},
            {logLevel:"TRACE",background:"#fff",color:"#000", active:true},
            {logLevel:"WARN",background:"#ffeb9c",color:"#9c6500", active:true}
        ]
	},
	methods: {
		openLog: function (logfile) {
			console.log(logfile.name);
		},
		useFilter(line) {  
			//let filter = this.filterText.toLowerCase();
			//let line = line[2].toLowerCase();
			//console.log((line[2]+"").toLocaleLowerCase().indexOf(this.filterText.toLowerCase()));
		  return (line[2]+"").toLocaleLowerCase().indexOf(this.filterText.toLowerCase()) != -1;// line[2].toLowerCase().indexOf(this.filterText.toLowerCase()) != -1;
		},
		setFilterText : function() {
			this.filterText = this.filterTextInput;	
		},
        checkLevel(line) {  
			//let filter = this.filterText.toLowerCase();
			//let line = line[2].toLowerCase();
            for(var i = 0; i < this.loglevelList.length; i++) {
                console.log("+ "  + this.loglevelList[i].logLevel)
                if(this.loglevelList[i].logLevel == line[0]){
                   console.log("> "+ line[0] + " > " + this.loglevelList[i].logLevel)
                    // if this loglevel.active === false return false, else return true
                   if(this.loglevelList[i].active === false){
                       return false;
                   }
                    
                }
            }
            return true;
		},
        getLevelClass: function(line, index) {
            console.log("level test")
            if(index > 0) {
                return "";
            }
            return line[0]; // TODO fixme index
		}, 
		applyLevelFitler: function() {
			
			this.lines = [];
// TODO
$.ajax({
	method: "GET",
	url: "http://localhost:3000/getlog",
	data: { 
		id: id,
		textFilter: app.filterText,
		appLevelFilter: JSON.stringify(app.loglevelList)
	}
})
.done(function( msg ) {
	app.loading= false;
	//app.lines = app.lines.concat(msg);
	for(var i = 0; i < msg.length; i ++) {
		app.lines.push(msg[i]);
	}
});


		}
	}        
});

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log("open " + id);
function initAjax() {
	$.ajax({
		method: "GET",
		url: "http://localhost:3000/init",
		data: { id: id }
	})
	.done(function( msg ) {
		console.log(msg);
		app.totalLinesCount = msg;
		console.log("init complete")
		loadFirstData();
	});
}

function loadFirstData() {
	$.ajax({
		method: "GET",
		url: "http://localhost:3000/getlog",
		data: { 
			id: id,
			textFilter: app.filterText,
			appLevelFilter: JSON.stringify(app.loglevelList)  
		}
	})
	.done(function( msg ) {
		app.loading= false;
		//app.lines = app.lines.concat(msg);
		for(var i = 0; i < msg.length; i ++) {
			app.lines.push(msg[i]);
		}
	});
}

initAjax();
/*
$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		//alert("near bottom!");
		loadFirstData();
	}
});
*/