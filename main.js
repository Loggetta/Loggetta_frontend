// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

//const express = require('./node_modules/express'); //your express app

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
	require('../loggetta_express/app/init.js')();	
	
  /** TODO : express auslagern!
 
	var app = express();
  //var routes = require('./resources/server.js')(app);
  var logfilesExpress = require('./resources/logfiles.js')(app);
  var verwalter = require('./app/verwalter.js')(app); // TODO
  app.use(express.static('public'));
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
	*/

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./public/index.html')
  //mainWindow.loadURL('http://localhost:4000/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
