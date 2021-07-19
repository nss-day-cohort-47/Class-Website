
// initialize the tool-tip plugin for Bootstrap4
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//DEFINE SHUFFLE FUNCTION
const shuffle = (arr) => {
  //start at the end of the list...
  let currentIndex = arr.length, holdThisForASec, numberOutOfAHat;
  //as long as there are still more to choose from...
  while (0 !== currentIndex) {
    //get a random index, rounding down
    //bc math.random produces an int between 0 & 1.
    numberOutOfAHat = Math.floor(Math.random() * currentIndex);
    //decrement
    currentIndex -= 1;
    //let's say our current index is 25 right now
    // store the value of the object at index 25 in the var tempvalue
    holdThisForASec = arr[currentIndex];
    //then you can set the val of the object at the current index position
    //equal to the val of the object at the random index position
    arr[currentIndex] = arr[numberOutOfAHat];
    //then we can se the val of the object that used to be at our random index
    //equal to the value of the object at index 25 which we stored in the temp var
    arr[numberOutOfAHat] = holdThisForASec;
    // and we'll keep switchin em around until we get to index 0,
  }
  //then return the array!
  return arr;
}

$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort;
  data = shuffle(data)
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.personalwebsite != null) {

      studentContact += `<a href=${item.personalwebsite} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedin != null) {

      studentContact += `<a href=${item.linkedin} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div class="col-md-3 cohortMems">
          <img class="card-img-top" src="images/classmates/${item.proImg}" alt="${item.name}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <img class="card-img-top-baby" src="images/classmates/${item.funImg}" alt="${item.name}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <div class="card-body">
            <h4 class="card-title title-font">${item.name}</h4>`
    //if student didn't provide a reelthemin quote then nothing is displayed
    // if (item.funfact != null) {
    //   studentInfo += `<p class="card-text">${item.funfact}</p>`
    // }
    studentInfo += studentContact

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if (item.bio != null) {

      studentInfo += `
            <center><button type="button" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortMember${item.id}">
           Learn More
          </button></center>
          </div>
        </div>`
      //modal info
      studentInfo += `
        <div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            
          <div class="modal-body">
          <div class = "modal-bgphoto">
          <center class="modal-photos">
          <img class="profile" src="images/classmates/${item.proImg}" alt="${item.name} fun"/>
          </center><br>
          <h2 class="modal-title " id="cohortMember${item.id}Label">${item.first}</h2>
          </div>
          <h2 class="modal-lasttitle " id="cohortMember${item.id}Label">${item.last}</h2>
          <h5>A bit about ${item.first}...</h5>

            `

      studentInfo


      studentInfo += `
      ${item.bio}
      <br />
      <h5>Fun Fact</h5>
    ${item.funfact}
    </div>
    ${studentContact}
    <center>
    <a href="${item.resume}" download="resume" target="_blank" type="application/octet-stream"><button type="button" data-dismiss="modal" class="backButton btn btn-outline-primary title-font bottom" >View Resume</button></a>
    <a href=${item.capstone}><button type="button" class="backButton btn btn-outline-primary title-font bottom" >View Capstone</button></a>

              </center>
            
          </div >
        </div >
      </div > `;
    } else {
      studentInfo += `
      </div>
        </div>
        `
    }
    document.getElementById("cohort").innerHTML += studentInfo;

  });
};


$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-sm-2 technologies">
         <center><a href="${item.link}" target="_blank"><img class="techs" src="images/techs/${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
};


const getJoke = () => {
  return fetch("https://icanhazdadjoke.com/", {
    method: "Get",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json())
    //*  BELOW NOT NEEDED if not using parsed data
    .then(parsedResponse => {
      console.log(parsedResponse);
      return parsedResponse;
    })
};

const Joke = (jokeObject) => {
  return `
      <section class="joke">
       
            <p>${jokeObject.joke}</p>
        
      </section>
    `;
};
const dadJoke = () => {
  const postElement = document.querySelector(".joke");
  getJoke().then(joke => {

    postElement.innerHTML = Joke(joke);
  });
}
document.querySelector(".joke-button")
  .addEventListener("click", dadJoke);


//Animation for the header
document.addEventListener('DOMContentLoaded', function (event) {
  // array with texts to type in typewriter
  var dataText = ["COHORT 47.", "INNOVATORS.", "PIONEERS.", "COLLABORATORS.", "DEVELOPERS."];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
      document.querySelector(".animation").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (typeof dataText[i] == 'undefined') {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 20000);
    }
    // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function () {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  }
  // start the text animation
  StartTextAnimation(0);



});
