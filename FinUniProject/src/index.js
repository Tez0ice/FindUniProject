const { table, count } = require('console');
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



// function start here 
function display(){
  var u_name = document.getElementById("name").value;
  var u_country = document.getElementById("country").value;  // get university name and country name as input



  fetch(`http://universities.hipolabs.com/search?name=${u_name}&country=${u_country}`) // starting of fetch based on the input
  .then((response) => response.json())
  .then((dataset) => {
    
    // make sure the data is random,  the list has multiple duplicate things resulting the same 
    console.log(dataset) 
    var data = [...new Set(dataset)]

    const table_store = document.getElementById("table-display")  // select empty table from index.HTML
  
    

    if (table_store.rows.length > 1){ // just an condition if table lenght > 5 then we removing the table row element else they will overlapping

      while (table_store.rows[0]){
        table_store.removeChild(table_store.rows[0]) //Remove "tr" element in html if there is already previous "tr" 
      } 

    }

    // core operation of displaying all of the 5 or 10 links

    //condition to check if data.length < 9 then we wil only display 5 links
    if (data.length > 9 ){
      counter = 10
    }

    else if (data.length == 1 || data.length == 2){
      counter = 1
    }

    else{
      counter = 5
    }
    
    var storing = []


    // the start of the loop and display

    for (let count = 0; count < counter ; count++){
      
   

     if (table_store.firstElementChild == null || data == []){
      table_store.style.border = "3px solid rgba(0, 0, 0, 0.7)"
      table_store.style.borderSpacing="10px" 
      const first_row = document.createElement("tr")  //styling the display table
      
      table_store.append(first_row)
      const name = document.createElement("td")   // make the categorising row before displaying 
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
      let random = (Math.floor(Math.random() * (data.length/2))) + (Math.floor(Math.random() * (data.length/2))) //give random number

      
      if (data.length == 1){
        // data fetch is in list therefore data require an index number to get an object
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
        content.innerHTML = data[random].name    //Get a random university from the data we fetch
        content1.innerHTML = data[random].web_pages[0];
        content2.innerHTML = data[random].country
        row.append(content)
        row.append(content1)
        row.append(content2)
        table_store.append(row)
        storing.push(data[random])
      }      
    }

    // messages 

    var section = document.querySelector(".second-section")
    var paragraph = document.createElement("p")
    paragraph.style.color="white"
  

    if (section.lastElementChild != document.querySelector("p") && section.lastElementChild == table_store  ){ //check if an messages already exits or not
      if (data == [] ){
      paragraph.innerHTML= ""
      section.append(paragraph)
      }

      else{
      paragraph.innerHTML = "You can Save this list by clicking the CRUD link on the top of the header!!";
      section.append(paragraph)
  
      }
    }
    

    // messages 

    // a temporary file created for to store an object we display as a json used for the next page
    let pathName = path.join(__dirname, 'TempFile')
    let file = path.join(pathName, "uni.json")
    
    var stringstore = JSON.stringify(storing)

    fs.writeFile(file, stringstore, function(err) {
    if(err){
      console.log('error', err);
    } 
    
    });


  })

 
}

// index code end

