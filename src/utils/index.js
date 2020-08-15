const path = require('path');
const fs = require("fs");


 const uuid =  () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      })
    }

  const  readRecursiveDirectory = (dir, filelist = ['']) => {
      try {
          let pathDir = path.join(process.cwd(), './src', dir);
          let files = fs.readdirSync(pathDir);
          filelist = filelist.length ? filelist : [''];
          files.forEach((file) => {
              if (fs.statSync(path.join(pathDir, file)).isDirectory()) {
                  filelist = readRecursiveDirectory(path.join(dir, file), filelist);
              } else {
                  filelist.push(path.join(dir, file));
              }
          });
      } catch (e) {
  
          console.log(e)
          throw e;
      }
      return filelist;
  };
  

module.exports = {
  uuid,
  readRecursiveDirectory
}