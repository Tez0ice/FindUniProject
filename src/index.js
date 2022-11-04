const { table } = require('console');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { formatWithOptions } = require('util');
const fs = require('fs');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function display(){
  var u_name = document.getElementById("name").value;
  var u_country = document.getElementById("country").value; 

  var namestoring = []
  namestoring.push(u_name)
  namestoring.push(u_country)

  fetch(`http://universities.hipolabs.com/search?name=${u_name}&country=${u_country}`)
  .then((response) => response.json())
  .then((data) => {
    
    console.log(data) 

    const table_store = document.getElementById("table-display")
  
    

    if (table_store.rows.length > 1){ // ust an condition if list lenght == 5 then we removing the "li" element

      while (table_store.rows[0]){
        table_store.removeChild(table_store.rows[0]) //Remove "li" element in html if there is already previous "li" 
      } 

      //list_store.innerHTML = "" (another method of removing the "li" but it looks so bland and not smort!!!)      
    }
    // core operation of creating all ther random five links

    if (data.length > 9 ){
      counter = 10
    }

    else{
      counter = 5
    }
    
    var storing = []

    for (let count = 0; count < counter ; count++){
      
   

     if (table_store.firstElementChild == null || data == []){
      table_store.style.border = "3px solid rgba(0, 0, 0, 0.7)"
      table_store.style.borderSpacing="10px" 
      const first_row = document.createElement("tr")
      
      table_store.append(first_row)
      const name = document.createElement("td")
      const URL_ = document.createElement("td")
      const country =document.createElement("td")


      name.innerHTML = "University Name"
      URL_.innerHTML = "Webpages"
      country.innerHTML = "Country"

      first_row.append(name)
      first_row.append(URL_)
      first_row.append(country)
       
     }

      
      const row = document.createElement("tr")
      const content = document.createElement("td")
      const content1 = document.createElement("td")
      const content2 = document.createElement("td") 
      let random = (Math.floor(Math.random() * data.length)) //give random number

      
      if (data.length == 1){
        
        content.innerHTML = data[0].name
        content1.innerHTML = data[0].web_pages[0];
        content2.innerHTML = data[0].country
        row.append(content)
        row.append(content1)
        row.append(content2)
        table_store.append(row)
        storing.push(data[0])
        
        { break; }  
      }

      else{
        content.innerHTML = data[random].name
        content1.innerHTML = data[random].web_pages[0];
        content2.innerHTML = data[random].country
        row.append(content)
        row.append(content1)
        row.append(content2)
        table_store.append(row)
        storing.push(data[random])
      }      
    }

    let pathName = path.join(__dirname, 'TempFile')
    var stringstore = JSON.stringify(storing)
    let file = path.join(pathName, "uni.json")

    fs.writeFile(file, stringstore, function(err) {
    if(err){
      console.log('error', err);
    } 
    
    });


  })

}



