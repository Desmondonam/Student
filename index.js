const terms = ['Spring ','Fall'];
 var dt = new Date();
const year= dt.getFullYear() ;
const endyear=year+11;
var graded=[];
var tempgraded=[];
var mygrades=[];

// iterate over the user object
var yeardom=document.getElementById("years");
var yearsmod=document.getElementById("yearsmod");

const listofitems=[];
for (var i = year; i <endyear ; i++) {
var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    yeardom.appendChild(opt);
 
}


var courses=document.getElementById("courses");

var listObjects=[];






document.getElementById("myfile").onchange = function(event) {

var files = event.target.files;
var filename = files[0].name;
var extension = files[0].type;
var type=filename.substring((filename.length)-3, filename.length); 

if(type != "dms") {
   //do you code

   document.getElementById("courseform").reset();

      alert("File Format is not supported. supported files example.dms");
} else {
   //display an error
   


const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    // when the reader is done, the content is in reader.result.
    var text=reader.result;

var  linefields = text.split("\n");

for (var i = 0; i <linefields.length; i++) {
    var cour="";
var credithrs=0;
var preq="";
var plannedsem="";
var grade="";
	const myArr = (linefields[i]).split("|");
	var opt = document.createElement('option');
    opt.value = myArr[0];
    opt.innerHTML = myArr[0];
    courses.appendChild(opt);
	console.log(myArr[0]);

if (myArr[0]!='undefined') {
	cour=myArr[0];
}
if (myArr[1]!='undefined') {
	credithrs=myArr[1];
}
if (myArr[2]!='undefined') {
	preq=myArr[2];
}
if (myArr[3]!='undefined') {
	plannedsem=myArr[3];
}
if (myArr[4]!='undefined') {
	grade=myArr[4].replace(/(\r\n|\n|\r)/gm, "");
	if (grade!="") {graded.push(cour); 


		mygrades.push({grade:grade,credits:credithrs});}
}

var obj={course:cour,credits:credithrs,prequisite:preq,plannedsem:plannedsem,grade:grade};

listObjects.push(obj);

}
calculateGpa();






  };
  reader.readAsText(files[0]);




}


};


function oncourseselected(item){
	var pendingpreq="";
	var term1=document.getElementById("terms1");
	 tempgraded=graded;
	term1.innerHTML="";
console.log(listObjects);
	for (var i = 0; i <listObjects.length; i++) {

		if (item.value==listObjects[i].course) {
			//break;
		}
		if (listObjects[i].grade=="") {
			alert("Prequisite "+listObjects[i].course+" is not done. please complete course to proceed");
	break;
		}
	}

	for (var i = 0; i <listObjects.length; i++) {

	var preq=listObjects[i].prequisite;

	var  spaceitems = preq.split(" ");

	for (var j = spaceitems.length - 1; j >= 0; j--) {
			var  commaitems = spaceitems[j].split(",");

// var iscommatrue=false;
// for (var k = commaitems.length - 1; k >= 0; k--) {
// 	commaitems[i]
// }
var checkval=true;


for (var k = commaitems.length - 1; k >= 0; k--) {

if (graded.includes(commaitems[k])) {

}
else{
checkval=false
}
}


if (checkval) {
if (!graded.includes(listObjects[i].course)) {
var opt = document.createElement('option');
    opt.value = listObjects[i].course;
    opt.innerHTML = listObjects[i].course;
    term1.appendChild(opt);
    }
}




	}




	
	}




}

function onyearchanged(items){
yearsmod.innerHTML="";
var endyear=parseInt(items.value) +10;

for (var i = parseInt(items.value); i < endyear ; i++) {

var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
  
    yearsmod.appendChild(opt);
}

}


function onselectterm2(items){

	
	tempgraded.push(items.value);

var term2=document.getElementById("terms2");
term2.innerHTML="";

	for (var i = 0; i <listObjects.length; i++) {

	var preq=listObjects[i].prequisite;

	var  spaceitems = preq.split(" ");

	for (var j = spaceitems.length - 1; j >= 0; j--) {
			var  commaitems = spaceitems[j].split(",");

// var iscommatrue=false;
// for (var k = commaitems.length - 1; k >= 0; k--) {
// 	commaitems[i]
// }
var checkval=true;


for (var k = commaitems.length - 1; k >= 0; k--) {

if (tempgraded.includes(commaitems[k])) {

}
else{
checkval=false
}
}


if (checkval) {
if (!tempgraded.includes(listObjects[i].course)) {
var opt = document.createElement('option');
    opt.value = listObjects[i].course;
    opt.innerHTML = listObjects[i].course;
    term2.appendChild(opt);
    }
}




	}




	
	}
}
function calculateGpa(){
var allgrade=0;
var alcr=0;

for (var i = mygrades.length - 1; i >= 0; i--) {
	switch(mygrades[i].grade) {
  case "A":
    // code block
    allgrade=allgrade+ 4*mygrades[i].credits;
    alcr=alcr+parseInt(mygrades[i].credits);
    break;
  case "B":
    // code block
      allgrade=allgrade+ 3*mygrades[i].credits;
        alcr=alcr+parseInt(mygrades[i].credits);
    break;
    case "C":
    // code block
      allgrade=allgrade+ 2*mygrades[i].credits;
        alcr=alcr+parseInt(mygrades[i].credits)
    break;
  case "D":
    // code block
      allgrade=allgrade+ 1*mygrades[i].credits;
        alcr=alcr+parseInt(mygrades[i].credits);
    break;
  default:
    // code block
}
}
var gpa=allgrade/alcr;

document.getElementById("gpa").innerHTML=gpa;

}
