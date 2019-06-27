// calls function to get the instanceID that will be used in all the inserts
document.addEventListener('DOMContentLoaded', getInstanceId);

var reactionInstanceID;

// function to get instanceID that will be used in the inserts
function getInstanceId(){

  let req = new XMLHttpRequest();

  //open the request to /addSpecimen
  req.open('GET','/getReactionInstanceID', true);
  //req.setRequestHeader('Content-Type', 'application/json');
  req.onload = function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      reactionInstanceID = response[0].instanceID;
      //storeReactionID(reactionInstanceID);
    } 
    else {
      console.log("Error in network request: " + req.statusText);
    }

  }
  req.send();

}

// this function will take in the date, location description, reaction description
document.getElementById('mainDescriptSubmit').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // use the reactionInstanceID
  let id = reactionInstanceID;

  // assign the values in the input boxes to variables for building the url string
  let dateReaction1 = document.getElementById('reactionDate').value;
  let locationDescription = document.getElementById('locDescript').value;
  let reactionDescription = document.getElementById('reactDescript').value;
  let dateReaction2 = dateReaction1;

  
  // this is the whole query string starting with ? to be inserted in front of path
   let payload = '?id='+id+'&dateReaction1='+dateReaction1+'&dateReaction2='+dateReaction2+'&locationDescription='+locationDescription+'&reactionDescription='+reactionDescription;
  
  //open the request to /headReaction route in server code
  req.open('GET','/reactionDescription'+payload, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){

    } else {
      console.log("Error in network request: " + req.statusText);
      alert("Sorry an error occurred: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  
  // call function again to update dropdowns
  event.preventDefault();
});


// function is called at the end of dynamic creation of "head" form
function makeHeadEventListener(){

// adds event listener to submit button for head form
document.getElementById('headSubmit').addEventListener('click', function(event){
    
    let req = new XMLHttpRequest(); 


    // assign the values in the input boxes to variables for building the url string
    let eyes = document.getElementById('eyes').checked;
    let nose = document.getElementById('nose').checked;
    let cheeks = document.getElementById('cheeks').checked;

    if (eyes == true){
      eyes = 1;
    }
    else {
      eyes = 0;
    }

    if (nose == true){
      nose = 1;
    }
    else {
      nose = 0;
    }

    if (cheeks == true){
      cheeks = 1;
    }
    else {
      cheeks = 0;
    }


    console.log(eyes);
    console.log(nose);
    console.log(cheeks);


 
    let id = reactionInstanceID;
 
    // this is the whole query string starting with ? to be inserted in front of path
     let payload = '?eyes='+eyes+'&nose='+nose+'&cheeks='+cheeks+'&instanceID='+id;
    
    //open the request to /headReaction route in server code
    req.open('GET','/headReaction'+payload, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        //var response = JSON.parse(req.responseText);
        //alert(response);
      } else {
        console.log("Error in network request: " + req.statusText);
        alert("Sorry an error occurred: " + req.statusText);

      }});
    req.send(JSON.stringify(payload));
    
    // call function again to update dropdowns
    event.preventDefault();
  });

}




// function is called at the end of dynamic creation of "left leg" form
function makeLeftLegEventListener(){

  // adds event listener to submit button for head form
  document.getElementById('leftLegSubmit').addEventListener('click', function(event){
      
      let req = new XMLHttpRequest(); 
  
  
      // assign the values in the input boxes to variables for building the url string
      let leftLeg = document.getElementById('lLeg').checked;
      let leftThigh = document.getElementById('lThigh').checked;
      let leftFoot = document.getElementById('lFoot').checked;
  
      if (leftLeg == true){
        leftLeg = 1;
      }
      else {
        leftLeg = 0;
      }
  
      if (leftThigh == true){
        leftThigh = 1;
      }
      else {
        leftThigh = 0;
      }
  
      if (leftFoot == true){
        leftFoot = 1;
      }
      else {
        leftFoot = 0;
      }
  
  
      // console.log(eyes);
      // console.log(nose);
      // console.log(cheeks);
  
  
   
      let id = reactionInstanceID;
   
      // this is the whole query string starting with ? to be inserted in front of path
       let payload = '?lLeg='+leftLeg+'&lThigh='+leftThigh+'&lFoot='+leftFoot+'&instanceID='+id;
      
      //open the request to /headReaction route in server code
      req.open('GET','/lLegReaction'+payload, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response = JSON.parse(req.responseText);
          //alert(response);
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(JSON.stringify(payload));
      
      // call function again to update dropdowns
      event.preventDefault();
  });
  
}




// function is called at the end of dynamic creation of "left leg" form
function makeRightLegEventListener(){

  // adds event listener to submit button for head form
  document.getElementById('rightLegSubmit').addEventListener('click', function(event){
      
      let req = new XMLHttpRequest(); 
  
  
      // assign the values in the input boxes to variables for building the url string
      rightLeg = document.getElementById('rLeg').checked;
      rightThigh = document.getElementById('rThigh').checked;
      rightFoot = document.getElementById('rFoot').checked;
  
      if (rightLeg == true){
        rightLeg = 1;
      }
      else {
        rightLeg = 0;
      }
  
      if (rightThigh == true){
        rightThigh = 1;
      }
      else {
        rightThigh = 0;
      }
  
      if (rightFoot == true){
        rightFoot = 1;
      }
      else {
        rightFoot = 0;
      }
  
  
      // console.log(eyes);
      // console.log(nose);
      // console.log(cheeks);
  
  
   
      let id = reactionInstanceID;
   
      // this is the whole query string starting with ? to be inserted in front of path
       let payload = '?rLeg='+rightLeg+'&rThigh='+rightThigh+'&rFoot='+rightFoot+'&instanceID='+id;
      
      //open the request to /headReaction route in server code
      req.open('GET','/rLegReaction'+payload, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response = JSON.parse(req.responseText);
          //alert(response);
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(JSON.stringify(payload));
      
      // call function again to update dropdowns
      event.preventDefault();
  });
  
}


// function is called at the end of dynamic creation of "left leg" form
function makeLeftArmEventListener(){
  // adds event listener to submit button for head form
  document.getElementById('leftArmSubmit').addEventListener('click', function(event){
      
      let req = new XMLHttpRequest(); 
  
  
      // assign the values in the input boxes to variables for building the url string
      leftHand = document.getElementById('lHand').checked;
      leftForearm = document.getElementById('lForearm').checked;
      leftUpperArm = document.getElementById('lUpperArm').checked;
  
      if (leftHand == true){
        leftHand = 1;
      }
      else {
        leftHand = 0;
      }
  
      if (leftForearm == true){
        leftForearm = 1;
      }
      else {
        leftForearm = 0;
      }
  
      if (leftUpperArm == true){
        leftUpperArm = 1;
      }
      else {
        leftUpperArm = 0;
      }
  
  
      // console.log(eyes);
      // console.log(nose);
      // console.log(cheeks);
  
  
   
      let id = reactionInstanceID;
   
      // this is the whole query string starting with ? to be inserted in front of path
       let payload = '?lHand='+leftHand+'&lForearm='+leftForearm+'&lUpperArm='+leftUpperArm+'&instanceID='+id;
      
      //open the request to /headReaction route in server code
      req.open('GET','/lArmReaction'+payload, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response = JSON.parse(req.responseText);
          //alert(response);
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(JSON.stringify(payload));
      
      // call function again to update dropdowns
      event.preventDefault();
  });
  
}


// function is called at the end of dynamic creation of "left leg" form
function makeRightArmEventListener(){

  // adds event listener to submit button for head form
  document.getElementById('rightArmSubmit').addEventListener('click', function(event){
      
      let req = new XMLHttpRequest(); 
  
  
      // assign the values in the input boxes to variables for building the url string
      rightHand = document.getElementById('rHand').checked;
      rightForearm = document.getElementById('rForearm').checked;
      rightUpperArm = document.getElementById('rUpperArm').checked;
  
      if (rightHand == true){
        rightHand = 1;
      }
      else {
        rightHand = 0;
      }
  
      if (rightForearm == true){
        rightForearm = 1;
      }
      else {
        rightForearm = 0;
      }
  
      if (rightUpperArm == true){
        rightUpperArm = 1;
      }
      else {
        rightUpperArm = 0;
      }
  
  
      // console.log(eyes);
      // console.log(nose);
      // console.log(cheeks);

      let id = reactionInstanceID;
   
      // this is the whole query string starting with ? to be inserted in front of path
       let payload = '?rHand='+rightHand+'&rForearm='+rightForearm+'&rUpperArm='+rightUpperArm+'&instanceID='+id;
      
      //open the request to /headReaction route in server code
      req.open('GET','/rArmReaction'+payload, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response = JSON.parse(req.responseText);
          //alert(response);
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(JSON.stringify(payload));
      
      // call function again to update dropdowns
      event.preventDefault();
  });
  
}



// function is called at the end of dynamic creation of "left leg" form
function makeTorsoEventListener(){

  // adds event listener to submit button for head form
  document.getElementById('torsoSubmit').addEventListener('click', function(event){
      
      let req = new XMLHttpRequest(); 
  
  
      // assign the values in the input boxes to variables for building the url string
      chest = document.getElementById('chest').checked;
      abdomen = document.getElementById('abdomen').checked;
  
      if (chest == true){
        chest = 1;
      }
      else {
        chest = 0;
      }
  
      if (abdomen == true){
        abdomen = 1;
      }
      else {
        abdomen = 0;
      }

      // console.log(eyes);
      // console.log(nose);
      // console.log(cheeks);

      let id = reactionInstanceID;
   
      // this is the whole query string starting with ? to be inserted in front of path
       let payload = '?chest='+chest+'&abdomen='+abdomen+'&instanceID='+id;
      
      //open the request to /headReaction route in server code
      req.open('GET','/torsoReaction'+payload, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response = JSON.parse(req.responseText);
          //alert(response);
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(JSON.stringify(payload));
      
      // call function again to update dropdowns
      event.preventDefault();
  });
  
}

/**********************************************************************
 * 
 * This section is all the functions for dynamically creating body part forms
 * 
 **********************************************************************/



document.getElementById("head").addEventListener("click", function(event){
    //alert("that's my head!")
    destroyForm();
    var specificPart = document.getElementById("specificPart");
    var bodyInfo = document.createElement("form");
    bodyInfo.setAttribute("method", "get");
    bodyInfo.setAttribute("action", "/headReaction");

    var eyes = document.createElement("input");
    eyes.type = "checkbox";
    //eyes.value = 1;
    eyes.name = "eyes";
    eyes.id = "eyes";

    var eyesLabel = document.createElement("label");
    eyesLabel.textContent = "Eyes";
    eyesLabel.setAttribute("htmlFor", eyes);
    eyesLabel.appendChild(eyes);


    var nose = document.createElement("input");
    nose.type = "checkbox";
    //nose.value = 1;
    nose.name = "nose";
    nose.id = "nose";

    var noseLabel = document.createElement("label");
    noseLabel.textContent = "Nose";
    noseLabel.setAttribute("htmlFor", nose);
    noseLabel.appendChild(nose);

    var cheeks = document.createElement("input");
    cheeks.type = "checkbox";
    //cheeks.value = 1;
    cheeks.name = "cheeks";
    cheeks.id = "cheeks";

    var cheeksLabel = document.createElement("label");
    cheeksLabel.textContent = "Cheeks";
    cheeksLabel.setAttribute("htmlFor", cheeks);
    cheeksLabel.appendChild(cheeks);

    var submit = document.createElement("input");
    submit.type = "Submit";
    submit.value = "Head Submit";
    submit.id = "headSubmit";

    bodyInfo.appendChild(eyesLabel);
    bodyInfo.appendChild(noseLabel);
    bodyInfo.appendChild(cheeksLabel);
    bodyInfo.appendChild(submit);

    

    specificPart.appendChild(bodyInfo);

    makeHeadEventListener();
});

document.getElementById("leftLeg").addEventListener("click", function(event){
    //alert("that's my left leg!")
    destroyForm();
    var specificPart = document.getElementById("specificPart");
    var bodyInfo = document.createElement("form");
    bodyInfo.setAttribute("method", "get");
    bodyInfo.setAttribute("action", "/lLegReaction");

    var thigh = document.createElement("input");
    thigh.type = "checkbox";
    thigh.name = "lThigh";
    thigh.id = "lThigh";

    var thighLabel = document.createElement("label");
    thighLabel.textContent = "Left Thigh";
    thighLabel.setAttribute("htmlFor", thigh);
    thighLabel.appendChild(thigh);


    var leg = document.createElement("input");
    leg.type = "checkbox";
    leg.name = "lLeg";
    leg.id = "lLeg";

    var legLabel = document.createElement("label");
    legLabel.textContent = "Left Leg";
    legLabel.setAttribute("htmlFor", leg);
    legLabel.appendChild(leg);

    var foot = document.createElement("input");
    foot.type = "checkbox";
    foot.name = "lFoot";
    foot.id = "lFoot";

    var footLabel = document.createElement("label");
    footLabel.textContent = "Left Foot";
    footLabel.setAttribute("htmlFor", foot);
    footLabel.appendChild(foot);

    var submit = document.createElement("input");
    submit.type = "Submit";
    submit.value = "Left Leg Submit";
    submit.id = "leftLegSubmit";

    bodyInfo.appendChild(thighLabel);
    bodyInfo.appendChild(legLabel);
    bodyInfo.appendChild(footLabel);
    bodyInfo.appendChild(submit);

    specificPart.appendChild(bodyInfo);

    makeLeftLegEventListener();
});

document.getElementById("rightLeg").addEventListener("click", function(event){
    //alert("that's my right leg!")
    destroyForm();
    var specificPart = document.getElementById("specificPart");
    var bodyInfo = document.createElement("form");
    bodyInfo.setAttribute("method", "get");
    bodyInfo.setAttribute("action", "/rLegReaction");

    var thigh = document.createElement("input");
    thigh.type = "checkbox";
    thigh.name = "rThigh";
    thigh.id = "rThigh";

    var thighLabel = document.createElement("label");
    thighLabel.textContent = "Right Thigh";
    thighLabel.setAttribute("htmlFor", thigh);
    thighLabel.appendChild(thigh);


    var leg = document.createElement("input");
    leg.type = "checkbox";
    leg.name = "rLeg";
    leg.id = "rLeg";

    var legLabel = document.createElement("label");
    legLabel.textContent = "Right Leg";
    legLabel.setAttribute("htmlFor", leg);
    legLabel.appendChild(leg);

    var foot = document.createElement("input");
    foot.type = "checkbox";
    foot.name = "rFoot";
    foot.id = "rFoot";

    var footLabel = document.createElement("label");
    footLabel.textContent = "Right Foot";
    footLabel.setAttribute("htmlFor", foot);
    footLabel.appendChild(foot);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Right Leg Submit";
    submit.id = "rightLegSubmit";


    bodyInfo.appendChild(thighLabel);
    bodyInfo.appendChild(legLabel);
    bodyInfo.appendChild(footLabel);
    bodyInfo.appendChild(submit);

    specificPart.appendChild(bodyInfo);

    makeRightLegEventListener();
});

document.getElementById("leftArm").addEventListener("click", function(event){
    //alert("that's my left arm!")
    destroyForm();
    var specificPart = document.getElementById("specificPart");
    var bodyInfo = document.createElement("form");
    bodyInfo.setAttribute("method", "get");
    bodyInfo.setAttribute("action", "/lArmReaction");

    var hand = document.createElement("input");
    hand.type = "checkbox";
    hand.name = "lHand";
    hand.id = "lHand";

    var handLabel = document.createElement("label");
    handLabel.textContent = "Left Hand";
    handLabel.setAttribute("htmlFor", hand);
    handLabel.appendChild(hand);

    var forearm = document.createElement("input");
    forearm.type = "checkbox";
    forearm.name = "lForearm";
    forearm.id = "lForearm";

    var forearmLabel = document.createElement("label");
    forearmLabel.textContent = "Left Forearm";
    forearmLabel.setAttribute("htmlFor", forearm);
    forearmLabel.appendChild(forearm);

    var upperArm = document.createElement("input");
    upperArm.type = "checkbox";
    upperArm.name = "lUpperArm";
    upperArm.id = "lUpperArm";

    var upperArmLabel = document.createElement("label");
    upperArmLabel.textContent = "Left Upper Arm";
    upperArmLabel.setAttribute("htmlFor", upperArm);
    upperArmLabel.appendChild(upperArm);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Left Arm Submit";
    submit.id = "leftArmSubmit";


    bodyInfo.appendChild(handLabel);
    bodyInfo.appendChild(forearmLabel);
    bodyInfo.appendChild(upperArmLabel);
    bodyInfo.appendChild(submit);

    specificPart.appendChild(bodyInfo);

    makeLeftArmEventListener();
});

document.getElementById("rightArm").addEventListener("click", function(event){
    //alert("that's my right arm!")
    destroyForm();
    var specificPart = document.getElementById("specificPart");
    var bodyInfo = document.createElement("form");
    bodyInfo.setAttribute("method", "get");
    bodyInfo.setAttribute("action", "/rArmReaction");

    var hand = document.createElement("input");
    hand.type = "checkbox";
    hand.name = "rHand";
    hand.id = "rHand";

    var handLabel = document.createElement("label");
    handLabel.textContent = "Right Hand";
    handLabel.setAttribute("htmlFor", hand);
    handLabel.appendChild(hand);

    var forearm = document.createElement("input");
    forearm.type = "checkbox";
    forearm.name = "rForearm";
    forearm.id = "rForearm";

    var forearmLabel = document.createElement("label");
    forearmLabel.textContent = "Right Forearm";
    forearmLabel.setAttribute("htmlFor", forearm);
    forearmLabel.appendChild(forearm);

    var upperArm = document.createElement("input");
    upperArm.type = "checkbox";
    upperArm.name = "rUpperArm";
    upperArm.id = "rUpperArm";

    var upperArmLabel = document.createElement("label");
    upperArmLabel.textContent = "Right Upper Arm";
    upperArmLabel.setAttribute("htmlFor", upperArm);
    upperArmLabel.appendChild(upperArm);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Right Arm Submit";
    submit.id = "rightArmSubmit";

    bodyInfo.appendChild(handLabel);
    bodyInfo.appendChild(forearmLabel);
    bodyInfo.appendChild(upperArmLabel);
    bodyInfo.appendChild(submit);

    specificPart.appendChild(bodyInfo);

    makeRightArmEventListener();
});

document.getElementById("torso").addEventListener("click", function(event){
    //alert("that's my torso!")
    destroyForm();
    //form element information
    var specificPart = document.getElementById("specificPart");
    var bodyInfo = document.createElement("form");
    bodyInfo.setAttribute("method", "get");
    bodyInfo.setAttribute("action", "/torsoReaction");
    
    //create chest checkbox and label for first input
    var chest = document.createElement("input");
    chest.type = "checkbox";
    chest.name = "chest";
    chest.id = "chest";

    var chestLabel = document.createElement("label");
    chestLabel.textContent = "Chest";
    chestLabel.setAttribute("htmlFor", chest);
    
    //append checkbox to label, then label to fieldset
    chestLabel.appendChild(chest);
    //fieldset.appendChild(chestLabel);
    
    //create abdomen checkbox and label for second input
    var abdomen = document.createElement("input");
    abdomen.type = "checkbox";
    abdomen.name = "abdomen";
    abdomen.id = "abdomen";

    var abdomenLabel = document.createElement("label");
    abdomenLabel.textContent = "Abdomen";
    abdomenLabel.setAttribute("htmlFor", abdomen);

    //append checkbox to label, then label to fieldset
    abdomenLabel.appendChild(abdomen);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Torso Submit";
    submit.id = "torsoSubmit";

    bodyInfo.appendChild(chestLabel);
    bodyInfo.appendChild(abdomenLabel);
    bodyInfo.appendChild(submit);
    specificPart.appendChild(bodyInfo);

    makeTorsoEventListener();
});

function destroyForm() {
    var specificPart = document.getElementById("specificPart");
    while(specificPart.firstChild) {
        specificPart.removeChild(specificPart.firstChild);
    }
}