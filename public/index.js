function deleteHedgehog(url, hedgehog) {
  return fetch(url + '/' + hedgehog, {
    method: 'delete'
  })
  .then(response => response.json());
}

function postHedgehog(url = ``, data = {}) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
}

const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  // fetches the json response from the api url and returns a promise
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
    // if the promise we get back is successful, create a function called response and make it contain the json format of the api response.
    // .then(param => param.json)
    .then(response => response.json())
    // if the promise is successful, also create a function called hedgehogs and assign it to another function's return value
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    // if the promise fails print the error to the console
    .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = () => {
  console.log("we are in the addNewHedgehog function");
};

const unInviteHedgehog = () => {
  console.log("we are in the unInviteHedgehog function");
};

getHedgehogs();
postHedgehog(`https://hedgehog-party.herokuapp.com/api/v1/invites`, {
  "name": "Aioli",
  "hoglets": 100,
  "allergies": "pickles"
});

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
