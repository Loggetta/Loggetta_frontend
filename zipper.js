var zipFolder = require('zip-folder');
 
zipFolder('/home/travis/build/Kaito23/electron-ci-test/electron-quick-start-linux-x64', 'deploy.zip', function(err) {
//zipFolder('electron-quick-start-win32-x64', 'deploy.zip', function(err) {
    if(err) {
        console.log('oh no!', err);
    } else {
        console.log('EXCELLENT');
    }
});