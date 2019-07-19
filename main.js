'use strict';
/* global $ */

const apiKey = 'oVT5VFKe6mMGdcanleNpicgZcMl1QpKGSedNTHN1';

const baseUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=';

// get request
function getParks(states, maxResults = 10) {
  const url = baseUrl + formatStateInput(states) + '&fields=addresses' + '&api_key=' + apiKey + '&limit=' + maxResults;
  //console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => renderParks(responseJson))
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

// render some parks
function renderParks(jsonData) {
  console.log(jsonData);
  const parkData = jsonData.data;
  $('.js-parks-list').empty();
  parkData.forEach(park => {
    $('.js-parks-list').append(`<li>
      <h3>${park.name}</h3>
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

// gets rid of white space
function formatStateInput(states) {
  states = states.split(' ').join('');
  return states;
}

//park.addresses[0].line1, park.addresses[0].city, park.addresses[0].stateCode, park.addresses[0].stateCode, 
function renderAddress(addresses){
  return `${addresses[0].line1}, ${addresses[0].city}, ${addresses[0].stateCode} ${addresses[0].postalCode}`;
}

function main(){
  handleSubmit();
}

$(main());