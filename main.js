'use strict';

const apiKey = 'oVT5VFKe6mMGdcanleNpicgZcMl1QpKGSedNTHN1';

const baseUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=';

// get request
function getParks(states, maxResults=10){
  const url = baseUrl + states + '&fields=addresses' + '&api_key=' + apiKey + '&limit=' + maxResults;
  console.log(url);
  fetch(url)
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    //.then(responseJson => console.log(responseJson))
    .then(responseJson => renderParks(responseJson, states))
    .catch(err => console.log(err));
}

// listener
function handleSubmit() {
  $('form').submit(e => {
    e.preventDefault();
    const state = $('#states').val();
    const maxResults = $('#max-results').val();
    getParks(state, maxResults);
  });
}

// render states
// function renderStates() {
//   const stateList = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
//   stateList.forEach(state => {
//     $('#states').append(`<option value="${state}">${state}</option>`);
//   });
// }

// render some parks
function renderParks(jsonData, states){
  console.log(jsonData);
  const parkData = jsonData.data;
  $('.js-parks-list').empty();
  parkData.forEach(park => {
    $('.js-parks-list').append(`<l1>
      <h3>${park.name}<h3>
      <p>${park.description}</p>
      <p>Address:
        
        ${park.addresses[0].line1},
        ${park.addresses[0].city},
        ${park.addresses[0].stateCode}
        ${park.addresses[0].postalCode}
      </p>
      <p>Website: <a href="${park.url}">${park.name}</a></p>
    </li>`);
  });
}
// ran out of time
// function formatAddress(addArr, states){

//   states.split(',');

//   addArr.forEach(add => {
//     if(add.stateCode === state)
//   });
// }

function main(){
  //renderStates();
  handleSubmit();
}

$(main());