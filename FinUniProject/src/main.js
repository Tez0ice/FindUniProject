const { app, BrowserWindow } = require('electron');

const fs = require('fs')
const path = require('path')


const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
      
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

}

// creating file starting here
var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var btnUpdate = document.getElementById('btnUpdate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

// fetch data from temporary uni store for user to create 
fetch('./TempFile/uni.json')
.then((response) => response.json())
.then((json) => {
  console.log(json)

  

  for (let count = 0 ; count < json.length ; count ++){
    
    
    var listing ="University Name : " + String(json[count].name) + "\nUniversity Url/Links : "  + String(json[count].web_pages[0]) + "\nUniversity Country : " + String(json[count].country + "\n-----------------------" + "\n" )
    fileContents.value = fileContents.value + listing
  }


  btnCreate.addEventListener('click', function(){  //creating text file when user click CREATE button
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file
      if(err){
        return console.log(err)
      }
      var txtfile = document.getElementById("fileName").value
      alert(txtfile + " text file was created")    
    
    })
    
  })
  
  btnRead.addEventListener('click', function(){  //read contents of the created text file
    let file = path.join(pathName, fileName.value)
   
    fs.readFile(file, function(err, data){ 
      if(err){
        return console.log(err)
      }
      fileContents.value = data
      alert("The file was read!")
    })
    
  })

  btnUpdate.addEventListener('click',function(){
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value 
    fs.writeFile(file, contents, function(err){ //Identical with adding the file but this time it update the file only
      if(err){
        return console.log(err)
      }
      var txtfile = document.getElementById("fileName").value
      alert( txtfile + " file was Updated")
    
    })
    
  })
  
  btnDelete.addEventListener('click', function(){  
    let file = path.join(pathName, fileName.value)
   
    fs.unlink(file, function(err){ 
      if(err){
        return console.log(err)
      }
      fileName.value = ""
      fileContents.value = ""
      alert("The file was deleted!")
    })
    
  })
  
  window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    document.getElementById('fileName').innerHTML = data.name;
    document.getElementById('fileContents').innerHTML = data.name;
  }
  
  

});





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


