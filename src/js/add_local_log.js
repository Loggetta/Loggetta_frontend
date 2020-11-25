// Local logfile
var localLogApp = new Vue({
	el: '#localLogForm',
	delimiters: ['${', '}'],
    data: {
        name: '',
		filePath:''
    },
    methods: {
        loadLocalLogFirstLine: function() {
            $('#collapseOne').collapse("show");
            console.log(this.name + " -> " + this.filePath);          
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
        },
        onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
              return;
            console.log(files[0].path)
			this.filePath = files[0].path;  
			console.log(files[0])

        }
    }

})



// TODO
const holder = document.getElementById('holder');
holder.ondragover = () => {
  return false;
};
holder.ondragleave = holder.ondragend = () => {
  return false;
};
holder.ondrop = (e) => {
  e.preventDefault();
  for (let f of e.dataTransfer.files) {
	console.log('File(s) you dragged here: ', f.path);
	localLogApp.filePath = f.path;
  }
  return false;
};