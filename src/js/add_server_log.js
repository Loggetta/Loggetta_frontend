var serverApp = new Vue({
    delimiters: ['${', '}'],
    el: '#serverView',
    data: {
        message: 'Hello Vue!',
        server: {
            "name":	"",
            "host": "",
            "user": "roko",
            "port": "",
            "ppkPath":	""
        },
        savedServers: []
    },
    methods: {
        addServer: function() {
            console.log(this.server);
            $.ajax({
                method: "GET",
                url: "http://localhost:3000/saveServer",
                data: { 
                    "name":	this.server.name,
                    "host": this.server.host,
                    "user":this.server.user,
                    "port":this.server.port,
                    "ppkPath":	this.server.ppkPath
                    }
                })
                .done(function( msg ) {
                    serverApp.savedServers = msg;
                });
    
        }
    }
});

$.ajax({
method: "GET",
url: "http://localhost:3000/getServer"
})
.done(function( msg ) {
    serverApp.savedServers = msg;
});

/*
function addServer(name, host, user, port, ppkPath) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/saveServer",
        data: { 
            "name":	name,
            "host": host,
            "user":user,
            "port":port,
            "ppkPath":	ppkPath
        })
        .done(function( msg ) {
            app.logfiles = msg;
        });
}
*/




// Local logfile
var localLogApp = new Vue({
    el: '#localLogForm',
    data: {
        name: '',
        filePath:''
    },
    methods: {
        loadLocalLogFirstLine: function() {
            $('#collapseOne').collapse("show");
            console.log(this.name + " -> " + this.filePath);
           
            // TODO send data to log settings app
// get first line of file 
$.ajax({
    method: "GET",
    url: "http://localhost:3000/localLogFirstLine",
    data: { 
        "path":	localLogApp.filePath
        }
    })
    .done(function( msg ) {
        //alert(msg);
        logSettingsApp.firstLogLine = msg;
    });
    return;

    //this.name= "";
    //this.filePath = "";

        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
              return;
            console.log(files[0].path)
            this.filePath = files[0].path;   
        }
    }

})

// general log settings

var logSettingsApp = new Vue({
    delimiters: ['${', '}'],
    el: '#logSettingsApp',
    data: { // todo group
        firstLogLine: "",
        regex:"",
        simpleDateFormat: "",
		groups:[],
		newLogLevelName:"",
        loglevelList: [
            {
                "logLevel":"DEBUG",
                "background":"#fff",
                "color":"#000"
            },{
                "logLevel":"ERROR",
                "background":"#ffc7ce",
                "color":"#9c0006"
            },{
                "logLevel":"FATAL",
                "background":"#ffc7ce",
                "color":"#9c0006"
            },{
                "logLevel":"INFO",
                "background":"#fff",
                "color":"#fa7d00"
            },{
                "logLevel":"TRACE",
                "background":"#fff",
                "color":"#000"
            },{
                "logLevel":"WARN",
                "background":"#ffeb9c",
                "color":"#9c6500"
            }
        ]
    },
    methods: {
        checkGroups() {
            console.log("check groupps:");

            const string = this.firstLogLine;
            const regexp = this.regex; //----->  /(?:^|\s)format_(.*?)(?:\s|$)/g;
            const matches = string.matchAll(regexp);    
            for (const match of matches) {
              //console.log(match);
              for(var i = 1; i < match.length; i++) {
                  console.log(match[i]);
                  this.groups.push({
                      text:match[i]
                  });
              }
              //console.log(match.index)
            }
            console.log(this.groups);
		},
		addNewLoglevel: function() {
            this.loglevelList.push({
                "logLevel":this.newLogLevelName,
                "background":"#fff",
                "color":"#000"
                
            });
            this.newLogLevelName = "";
		},
		removeLevel: function(index) {
			this.loglevelList.splice(index, 1);
		}
    }

})
