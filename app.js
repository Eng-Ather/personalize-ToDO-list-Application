
var title = document.getElementById("title");//main heading wher current user id display

var login_box = document.getElementById("login_box");//home page, disappear when user get login

var email = document.getElementById("email"); //getting email from index.html page
var password = document.getElementById("password"); //getting pasword from index.html page

var todo = document.getElementById("todo"); //todo block, dispaly after login

var input_bar = document.getElementById("input_bar") //initally hidden it display when click on add todo button
var search_bar = document.getElementById("search_bar")//initally hidden it display when click on search todo button

// var search_bar_button = document.getElementById('search_bar_button')
// var search_type = document.getElementById('search_type')
// var search_bar_id = document.getElementById('search_bar_id')
// var search_bar_due_date = document.getElementById('search_bar_due_date')
 var search_bar_catagory = document.getElementById('search_bar_catagory')
// var submit_btn = document.getElementById('submit_btn')
 var search_btn = document.getElementsByClassName('search_btn')





checkuserlogin(); //jub first time website search hoge yea page refresh kia jay ga to yea check kry ga or jis ke id login hoeve hoge us ke detail display krda ga

//*_____________________________________ ( user login functin ) _______________________________________________*/

function sumbit() {
  //agar koe bhe pehly sa login nahe hoga to submit button pa yea function chaly ga

  if (!email.value || !password.value) {
    return alert("enter email and pasword");
  } else {
    localStorage.setItem("eml", email.value); //input type email sa email id la ga os usko localac storage ma save krva da ga
  
  //agar app sirf Authentic people ko login allow krna cahty han in ka account pehly sa bna hoa ha to yeaha us ka kam hoga
  
  }
  checkuserlogin(); // jub user login ho jay ga to yea login form ko huta da ga or todo wala page show kr da ga
  displaytodolist(); //jub user login ho or pehly sa todo list ma koe data save ha to display ho jay ga
}

//*___________________________________( user login check functin ) _________________________________________*/

//yea function check kry ga koe user login ha yea nahe agar koe login hoga to yea us ka todo wala div display kr da ga or login form huta da
function checkuserlogin() {
  var login_user = localStorage.getItem("eml");
  if (login_user) {
    todo.style.display = "block";
    title.innerText = login_user; //display current user id in title box 
    login_box.style.display = "none";
    email.value = "";
    password.value = "";
  } else {
    todo.style.display = "none";
    login_box.style.display = "block";
  }
  // if(login_user){location.href="todoPage.html";} //setting todo page link in login conditio
  //  else{ location.href="index.html" }//setting main page link in logout conditio
}

//*__________________________________________ ( logout function ) __________________________________________*/

//logout ka function local stogae sa user ke email delete kr da ga or phr check user ka function call kry ga
//check waly funtion ko user ke mail nahe mily ge qk wo delete ho chuki ha to check user wala funtion
// login wala div display kr day or todo wala div huta da ga
// logout k function sa sirf user ke email delete hoge use k object(todo items) ab bhe local storage ma save rhy gy

function logout() {
  localStorage.removeItem("eml");
  checkuserlogin();
  title.innerText = " Simple Notes App Using Local Storage "; //display title on top
}

/*****************************************(Login page work ends here)*****************************************/ 

/*_______________________________________ ( Add TODO button function ) _______________________________________*/ 
function show_input_bar(){
  input_bar.style.display = "block";
  search_bar.style.display="none";
}

/*_______________________________________ ( search TODO button function ) ____________________________________*/ 
function show_search_bar(){
  input_bar.style.display = "none";
  search_bar.style.display="block";
  // search_type.style.display='block';
  // submit_btn.style.display='block'

  // search_btn[0].style.display='none'
  // search_bar_due_date.style.display='none'
  // search_bar_id.style.display='none'
  // search_bar_catagory.style.display='none'

}

//*_______________________________________ ( add_todo functin ) ______________________________________________*/

// yeha function pehly user_id or todo k text sa object bnay ga phr object array bnay ga
// or phr us array ko local storage ma save kr da ga

function add_todo() {
  var login_user = localStorage.getItem("eml");
  var input_bar_tod_text = document.getElementById("input_bar_tod_text");
  var due_date = document.getElementById("due_date")
  var input_bar_catagory = document.getElementById("input_bar_catagory")
  console.log(input_bar_catagory.value);
  var d = new Date();//getting current(today date)
  var task_due_date = new Date(due_date.value); //to gate user selected date which is going to be use as a due date 
  
  var remaining_days = task_due_date - d;// getting difference in due date and current date
  var remaining_days = Math.floor(remaining_days/1000/60/60/24); //calculating how many days are remaining in due date

  if (input_bar_tod_text.value && due_date.value && input_bar_catagory.value) {
   
    var dayy = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "friday",
      "saturday",
    ];

    var object = {
      checkBox: false,
      id: login_user,
      catagory : input_bar_catagory.value, 
      work: input_bar_tod_text.value,
      due_date :due_date.value,
      reminder : remaining_days,
      day: dayy[d.getDay()],
      date: `${d.getDate()} - ${d.getMonth()+1}- ${d.getFullYear()}`,
    };
    console.log(object);
    var local_storage_array = localStorage.getItem("local_storage_array"); //geting arry from local storage

    //**************( if array is not epmty this part execute )*********************
    if (local_storage_array) {
      object_wala_array = JSON.parse(local_storage_array); //converting back value in array form
      object_wala_array.push(object); // pushing the created object in array
      localStorage.setItem(
        "local_storage_array",
        JSON.stringify(object_wala_array)
      );
      input_bar_tod_text.value = "";
      input_bar_catagory.value = "";
      due_date.value = "";
    }

    //*************( if array is epmty this part execute )****************************
    else {
      object_wala_array = [object];
      console.log(object_wala_array);
      localStorage.setItem(
        "local_storage_array",
        JSON.stringify(object_wala_array)
      );
      input_bar_tod_text.value = "";
      input_bar_catagory.value = "";
      due_date.value = "";
    }
  } else {
    alert("must fill all fields(todo text, due date, catagory)");
  }

  

  displaytodolist(); //jub user todo bna la ga tub yea unko list ma display kry ga
}

function displaytodolist() {
  var todo_display_list = document.getElementById("todo_display_list");
  var arr = localStorage.getItem("local_storage_array"); //geting arry from local storage
  var login_user = localStorage.getItem("eml");

  todo_display_list.innerHTML = ""; // removing the perivous data to display current user dat

  if (arr) {
    arr = JSON.parse(arr);
    arr.forEach(function (data, index) {
      //***************( display all data b/c admin is login)*****************
      if (login_user == "admin@gmail.com" && data.id == "admin@gmail.com") {
        var li = `<li class="unchecked_style"> 
        <input type="checkbox" class="box" onclick="checkboox_check(this)" ${data.checkBox} >
        <span style="color: "> ${data.work} <hr> ${data.id} </span>
        <span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
        <span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>   
        <span> <button onclick = "del(${index})" class="del_button"> Delete </button> </span> 
         </li>`;
        todo_display_list.innerHTML += li;
      } else if (
        login_user == "admin@gmail.com" &&  data.id != "admin@gmail.com") {
        var li = `<li class="unchecked_style">  
          <span> ${data.work} <hr> ${data.id} </span>
           <span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
            <span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>    
           </li> `;
        todo_display_list.innerHTML += li;
      }

      //***************(display current user data only)************************
      if (login_user === data.id && login_user != "admin@gmail.com") {
        var li = `<li class="unchecked_style " >  
        <input type="checkbox"  class="box" onclick="checkboox_check(this)" >
        <span>${data.work} </span> 
        <span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
        <span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>      
        <span> <button onclick = "del(${index})" del_button> Delete </button> </span>  
         </li> `;
        todo_display_list.innerHTML += li;
      }
    });
  } else {
    todo_display_list.innerHTML = "<h1> Todo is empty </h1>";
  }
}

//*******************************( Delete Function )*********************************

/*yea (object delete krny ka function) function delte k button press krny pa call hoga 
yea button apny sath us specific object ka index:no as an arrgument la k ay ga jo
is function ka parameter ban jay ga next step yea function local storage sa array
get kry ga or local storage sa isko delete kr day ga ab array uthany k bad us per 
JSON.parse() ka method chla kr is ko orignial form(array form) ma convert kry ga phr is
array ma sa us specific index:no waly object ko delet kr day ga us or is updated array ko 
JSON.stringify() lga kr local storage ma update kr day ga od display wala function call krva 
kr todo ke updated lis show kr day ga*/

function del(objectIndexNo) {
  var arrayFromstorage = localStorage.getItem("local_storage_array"); //geting arry from local storage
  var array_from_storage_parse = JSON.parse(arrayFromstorage);
  console.log(objectIndexNo);
  console.log(array_from_storage_parse);

  array_from_storage_parse.splice(objectIndexNo, 1);
  console.log(array_from_storage_parse);

  localStorage.removeItem("local_storage_array");
  localStorage.setItem(
    "local_storage_array",
    JSON.stringify(array_from_storage_parse)
  );

  displaytodolist(); // yea updated array(todo list display kry ga)
}

displaytodolist();


function checkboox_check(ele){
 
    if (ele.checked === true) {
      ele.parentElement.classList = "checkbox_style";
      ele.parentElement.children[3].style.display = "none";
    } else if (ele.checked === false) {
      ele.parentElement.classList = "unchecked_style";
      ele.parentElement.children[3].style.display = "block";
    }
  }


//  select catagory funtion...
// function select_search_option(){
  
// console.log(search_type.value);

//   if(search_type.value == 'email' ){  
//    search_bar_id.style.display='block'
//    search_btn[0].style.display='block'
//     search_type.style.display='none'
//     submit_btn.style.display='none'}

//     else if(search_type.value == 'due__date' ){  
//       search_bar_due_date.style.display='block'
//       search_btn[0].style.display='block'
//        search_type.style.display='none'
//        submit_btn.style.display='none'}

//     else if(search_type.value == 'catagoryy' ){  
//       search_bar_catagory.style.display='block'
//         search_btn[0].style.display='block'
//          search_type.style.display='none'
//          submit_btn.style.display='none'}
//     else{     
//     alert("select catagory")
//     }
//         search_type.value = "";
// }

  function search_by_catagory() {

var search_bar_catagory = document.getElementById("search_bar_catagory")
var arrayFromstorage = localStorage.getItem("local_storage_array"); //geting arry from local storage
  var array_from_storage_parse = JSON.parse(arrayFromstorage);
// var search_item=[];

if( search_bar_catagory.value){
var search_item = array_from_storage_parse.filter((data,index)=>data.catagory === search_bar_catagory.value)
console.log(search_item);


todo_display_list.innerHTML = "";

search_item.forEach(function(data,index){
var li = `<li class="unchecked_style"> 

<span style="color: "> ${data.work} <hr> ${data.id} </span>
<span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
<span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>   

 </li>`;
todo_display_list.innerHTML += li;
})
}



if( search_bar_catagory.value){

  var search_item = array_from_storage_parse.filter((data,index)=>data.catagory === search_bar_catagory.value)
  console.log(search_item);
  
  
  todo_display_list.innerHTML = "";
  
  search_item.forEach(function(data,index){
    var login_user = localStorage.getItem("eml");

    if (login_user == "admin@gmail.com" && data.id == "admin@gmail.com") {
      var li = `<li class="unchecked_style"> 
      
      <span style="color: "> ${data.work} <hr> ${data.id} </span>
      <span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
      <span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>   

       </li>`;
      todo_display_list.innerHTML += li;
    } else if (
      login_user == "admin@gmail.com" &&  data.id != "admin@gmail.com") {
      var li = `<li class="unchecked_style">  
        <span> ${data.work} <hr> ${data.id} </span>
         <span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
          <span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>    
         </li> `;
      todo_display_list.innerHTML += li;
    }

    if (login_user === data.id && login_user != "admin@gmail.com") {
      var li = `<li class="unchecked_style " >  
      <span>${data.work} </span> 
      <span style="font-size:15px"> Catagory <hr> ${data.catagory}</span>
      <span style="font-size:15px"> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>      
      <span> <button onclick = "del(${index})" del_button> Delete </button> </span>  
       </li> `;
      todo_display_list.innerHTML += li;
    }

  })
  }
else{ alert("fill both field (todo text and catagory)")}

search_bar_tod_text.value = "";
search_bar_catagory.value = "";

}