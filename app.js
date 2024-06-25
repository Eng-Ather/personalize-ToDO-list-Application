var title = document.getElementById("title"); //main heading wher current user id display

var login_box = document.getElementById("login_box"); //home page, disappear when user get login

var email = document.getElementById("email"); //getting email from index.html page
var password = document.getElementById("password"); //getting pasword from index.html page

var todo = document.getElementById("todo"); //todo block, dispaly after login

var input_bar = document.getElementById("input_bar"); //initally hidden it display when click on add todo button
var search_bar = document.getElementById("search_bar"); //initally hidden it display when click on search todo button

var search_btn = document.getElementsByClassName("search_btn");


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

  search_type_dropdown.value = "";
  search_bar_input_feild.style.display = "none";
  searching_element_catagory.value="";
  searching_element_catagory.style.display = "none";
  search_bar.style.display = "none";


  title.innerText = " Simple Notes App Using Local Storage "; //display title on top
}

/*****************************************(Login page work ends here)*****************************************/

/*_______________________________________ ( Add TODO button function ) _______________________________________*/
function show_input_bar() {
  input_bar.style.display = "block";
  search_bar.style.display = "none";
}

/*_______________________________________ ( search TODO button function ) ____________________________________*/
function show_search_bar() {
  input_bar.style.display = "none";
  search_bar.style.display = "block";
  search_block_update()
}

//*_______________________________________ ( add_todo functin ) ______________________________________________*/

// yeha function pehly user_id or todo k text sa object bnay ga phr object array bnay ga
// or phr us array ko local storage ma save kr da ga

function add_todo() {
  var login_user = localStorage.getItem("eml");
  var input_bar_tod_text = document.getElementById("input_bar_tod_text");
  var due_date = document.getElementById("due_date");
  var input_bar_catagory = document.getElementById("input_bar_catagory");
  console.log(input_bar_catagory.value);
  var d = new Date(); //getting current(today date)
  var task_due_date = new Date(due_date.value); //to gate user selected date which is going to be use as a due date

  var remaining_days = task_due_date - d; // getting difference in due date and current date
  var remaining_days = Math.floor(remaining_days / 1000 / 60 / 60 / 24); //calculating how many days are remaining in due date

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
      catagory: input_bar_catagory.value,
      work: input_bar_tod_text.value,
      due_date: due_date.value,
      reminder: remaining_days,
      day: dayy[d.getDay()],
      date: `${d.getDate()} - ${d.getMonth() + 1}- ${d.getFullYear()}`,
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
        <span> ${index+1} </span>
        <span> ${data.work} <hr> ${data.id} </span>
        <span> Catagory <hr> ${data.catagory}</span>
        <span> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>   
        <span> <button onclick = "del(${index})" class="del_button"> <i class="fa-solid fa-trash-can"></i> </button> </span> 
         </li>`;
        todo_display_list.innerHTML += li;
      } else if (
        login_user == "admin@gmail.com" &&
        data.id != "admin@gmail.com"
      ) {
        var li = `<li class="unchecked_style">  
        <span> ${index+1} </span>
          <span> ${data.work} <hr> ${data.id} </span>
           <span> Catagory <hr> ${data.catagory}</span>
            <span> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>    
           </li> `;
        todo_display_list.innerHTML += li;
      }

      //***************(display current user data only)************************
      if (login_user === data.id && login_user != "admin@gmail.com") {
        var li = `<li class="unchecked_style " >
        <span> ${index+1} </span>  
        <span>${data.work} </span> 
        <span> Catagory <hr> ${data.catagory}</span>
        <span> Due date : ${data.due_date} <hr> ${data.reminder} days left</span>      
        <span> <button onclick = "del(${index})" del_button> <i class="fa-solid fa-trash-can"></i> </button> </span>  
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

function checkboox_check(ele) {
  if (ele.checked === true) {
    ele.parentElement.classList = "checkbox_style";
    ele.parentElement.children[3].style.display = "none";
  } else if (ele.checked === false) {
    ele.parentElement.classList = "unchecked_style";
    ele.parentElement.children[3].style.display = "block";
  }
}


// jub user search type select kry ga to yea function run hoga
search_type_dropdown.addEventListener("click", function () {
search_block_update()
})

  function search_block_update(){
    
var login_user = localStorage.getItem("eml");
var search_type_dropdown = document.getElementById("search_type_dropdown");
var search_bar_center_div = document.getElementById("search_bar_center_div");
var search_bar_input_feild = document.getElementById("search_bar_input_feild");
var searching_element_catagory = document.getElementById("searching_element_catagory");
  
  if (login_user !== "admin@gmail.com") {
    search_type_dropdown.children[1].style.display = "none";

    if (search_type_dropdown.value == "due__date") {
      searching_element_catagory.style.display = "none";
      search_bar_input_feild.style.display = "block";
      search_bar_input_feild.setAttribute("type", "date");
    }
     else if (search_type_dropdown.value == "catagoryy") {
      searching_element_catagory.style.display = "block";
      search_bar_input_feild.style.display = "none";
      // search_bar_input_feild.setAttribute('type', 'date')
    } 
    else {
    }
  } 
  else if (login_user === "admin@gmail.com") {
    search_type_dropdown.children[1].style.display = "block";

    if (search_type_dropdown.value == "email") {
      searching_element_catagory.style.display = "none";
      search_bar_input_feild.style.display = "block";
      search_bar_input_feild.setAttribute("type", "email");
    }

    if (search_type_dropdown.value == "due__date") {
      searching_element_catagory.style.display = "none";
      search_bar_input_feild.style.display = "block";
      search_bar_input_feild.setAttribute("type", "date");
    } 
    else if (search_type_dropdown.value == "catagoryy") {
      searching_element_catagory.style.display = "block";
      search_bar_input_feild.style.display = "none";
    }
     else {
    }
  } 
  
  else {
  }

}


function search_by_catagory() {
  var login_user = localStorage.getItem("eml");
  var arrayFromstorage = localStorage.getItem("local_storage_array"); //geting arry from local storage
  var array_from_storage_parse = JSON.parse(arrayFromstorage);
  console.log(login_user);

  // when user search with email(this option is avilable for admin only)
  if (search_type_dropdown.value == "email"){

       var search_item_by_email = array_from_storage_parse.filter(
      (data, index) => data.id === search_bar_input_feild.value );
      //  console.log(search_item_by_email);
      
       todo_display_list.innerHTML = "";

       search_item_by_email.forEach(function(data,index){

       var dueDate_till_today = calculating_remaing_days_in_due_date(data.due_date)

       var li = `<li class="unchecked_style">
        <span> ${index+1} </span>
        <span> ${data.work} <hr> ${data.id} </span>
        <span> Catagory <hr> ${data.catagory}</span>
        <span> 
        Due date : ${data.due_date} <hr> ${dueDate_till_today} </span>
        </li>`;
        todo_display_list.innerHTML += li;})
      }
  
  // when user search with due date (this option is avilable for all user)

     if (search_type_dropdown.value == "due__date" ) {
    console.log("search_item_by_duedate");

        if(login_user != 'admin@gmail.com'){
        var search_item_by_duedate = array_from_storage_parse.filter(
          (data, index)=>data.due_date == search_bar_input_feild.value && data.id == login_user);
          console.log(search_item_by_duedate);
        }

        if(login_user == 'admin@gmail.com'){
          var search_item_by_duedate = array_from_storage_parse.filter(
            (data, index)=>data.due_date == search_bar_input_feild.value);
            console.log(search_item_by_duedate);
          }
      todo_display_list.innerHTML = "";

       search_item_by_duedate.forEach(function(data,index){

       var dueDate_till_today = calculating_remaing_days_in_due_date(data.due_date)

       var li = `<li class="unchecked_style">
        <span> ${index+1} </span>
        <span> ${data.work} <hr> ${data.id} </span>
        <span> Catagory <hr> ${data.catagory}</span>
        <span> Due date : ${data.due_date} <hr> ${dueDate_till_today} </span>

        </li>`;
        todo_display_list.innerHTML += li;})

  } 

  // when user search with catagory (this option is avilable for all user)

  if (search_type_dropdown.value == "catagoryy" ) {

  if(login_user != 'admin@gmail.com'){
    var search_item_by_catagory = array_from_storage_parse.filter(
      (data, index)=>data.catagory == searching_element_catagory.value && data.id == login_user);
      console.log(search_item_by_catagory);
    }

    if(login_user == 'admin@gmail.com'){
      var search_item_by_catagory = array_from_storage_parse.filter(
        (data, index)=>data.catagory == searching_element_catagory.value);
        console.log(search_item_by_catagory);
      }
  todo_display_list.innerHTML = "";

   search_item_by_catagory.forEach(function(data,index){

    var dueDate_till_today = calculating_remaing_days_in_due_date(data.due_date)

   var li = `<li class="unchecked_style">
    <span> ${index+1} </span>
    <span> ${data.work} <hr> ${data.id} </span>
    <span> Catagory <hr> ${data.catagory}</span>
    <span> Due date : ${data.due_date} <hr> ${dueDate_till_today}</span>
    </li>`;
    todo_display_list.innerHTML += li;})
} 

if (search_type_dropdown.value == "display_all" ) {
  displaytodolist()
}
  searching_element_catagory.value="";
  search_bar_input_feild.value = "";

    // ____________________________ Return Function calculating remaing days in due date__________________________
    function   calculating_remaing_days_in_due_date(dateee)
    {
      console.log(dateee);
      var new_remainder = new Date(dateee)

      var today_date = new Date();
      
     new_remainder = new_remainder - today_date;
     var new_remainder = Math.floor(new_remainder / 1000 / 60 / 60 / 24); 
     console.log(new_remainder);

     if(new_remainder > 0){
      var remaining_days_till_today = new_remainder +" days left"
      return remaining_days_till_today;
     }
     else if (new_remainder == -1 && today_date.getHours()<24){ 
      var remaining_days_till_today = "Last day"
      return remaining_days_till_today;
     }
     else if (new_remainder < 0){ 
      var remaining_days_till_today = "Due date has passed"
      return remaining_days_till_today;
     }
    }
      // _________________ End of return Function to calculating remaing days in due date_____________________

}
