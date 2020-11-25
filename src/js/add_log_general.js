
// general log settings

var logSettingsApp = new Vue({
    delimiters: ['${', '}'],
    el: '#logSettingsApp',
	data: { // todo group
		saveDisabled: true,
		checkGroupsDisabled: true,

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
		saveLocalLogfile: function () {
			console.log(localLogApp.name);
			console.log(localLogApp.filePath);
			console.log(this.simpleDateFormat);
			console.log(this.regex);
			let groupArray = [];
			for(var i = 0; i < this.groups.length; i++) {
				console.log(this.groups[i].selected)
				groupArray[i] = this.groups[i].selected;
			}
			console.log(groupArray);
			console.log("try ajax")
			$.ajax({
				method: "GET",
				url: "http://localhost:3000/addLocalLogfile",
				data: { 
					name: localLogApp.name, 
					location: localLogApp.filePath,
					regex:this.regex,
					simpleDateFormat:this.simpleDateFormat,
					loglevelList: this.loglevelList
				}
			})
			.done(function( msg ) {
				console.log( "Data Saved: " + msg );
				window.location.href = "/";
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});;
		},
        checkGroups() {
            console.log("check groupps:");

			this.groups = [];
            const string = this.firstLogLine;
            const regexp = this.regex; //----->  /(?:^|\s)format_(.*?)(?:\s|$)/g;
            const matches = string.matchAll(regexp);    
            for (const match of matches) {
              //console.log(match);
              for(var i = 1; i < match.length; i++) {
                  console.log(i + " > "+match[i]);
                  this.groups.push({
                      text:match[i]
                  });
              }
              //console.log(match.index)
            }
			console.log(this.groups);
			this.saveDisabled = false;
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
