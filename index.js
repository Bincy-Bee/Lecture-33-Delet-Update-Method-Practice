let id = -1; //tale global variable for id to take value in patch and delet method

let users = []; //take array for filter the data
//Data Maped
const table=(data)=>{

    document.getElementById("tabledb").innerHTML="";
    data.map((item)=>{

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = item.name;

        let td2 = document.createElement("td");
        td2.innerHTML = item.num;

        let td3 = document.createElement("td");
        td3.innerHTML = item.gender;

        let td4 = document.createElement("td");
        let btn1 = document.createElement("button")
        btn1.setAttribute("id","ubtn")
        btn1.innerHTML = "Update"; // Update button, data send back to input and click event
        btn1.addEventListener("click",()=>{

            document.getElementById("name").value = item.name;
            document.getElementById("num").value = item.num;
            document.getElementById("gender").value = item.gender;
            document.getElementById("print").value = "Update";

            id = item.id;
        })
        td4.append(btn1)

        let td5 = document.createElement("td");
        let btn2 = document.createElement("button") //delet button, click event & function call
        btn2.setAttribute("id","dbtn")
        btn2.innerHTML = "Delete";
        btn2.addEventListener("click",()=>{
            datadelet(item.id)
        })
        td5.append(btn2)
        
       tr.append(td1, td2, td3, td4, td5);
       document.getElementById("tabledb").append(tr)

    })
}

//Delet Method Function
const datadelet = async(id)=>{
    fetch(`http://localhost:8080/users/${id}`,{
        method : "DELETE",
    })
}

// main data input to form after hitting to submit button
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();

    let type = document.getElementById("print").value; //for type of button for update and submit data
    console.log(type);

    let user = {  //main object and take data from input
        name : document.getElementById("name").value,
        num : document.getElementById("num").value,
        gender : document.getElementById("gender").value,
    }
    // console.log(user);
    users.push(user);
    // console.log(users);
   

    // Put conditon foe when hit submit run POST methos else run PATCH method thorught TYPE variable
    if( type == "Submit"){
        fetch("http://localhost:8080/users",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
    }
    else{

        fetch(`http://localhost:8080/users/${id}`,{
            method : "PATCH",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })

        document.getElementById("name").value = "";
        document.getElementById("num").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("print").value = "Submit";

        id = item.id;        
    }
})

// get data from surver whatever in database stored for Shown in UI and that data call with table data 

let get = async()=>{
    fetch("http://localhost:8080/users")
.then((xyz)=> xyz.json())
.then( (dada)=> table(dada))
}
get();


// filter for gender

const handlegender=(gen)=>{

    fetch(`http://localhost:8080/users?gender=${gen}`)
    .then((xyz)=> xyz.json())
    .then( (dada)=> table(dada))
}

document.getElementById("all").addEventListener("click", ()=> get());
document.getElementById("men").addEventListener("click", ()=> handlegender("Men"));
document.getElementById("women").addEventListener("click", ()=> handlegender("Women"));
document.getElementById("kids").addEventListener("click", ()=> handlegender("Kids"));