$('#login  button').click(() => login());
$('#logout button').click(() => solid.auth.logout());

async function login(){
  text = $('#provider').val(); 
  if(text!=""){
    alert(text);
    solid.auth.login(text);
  }
}
/** 
async function getWebId() {
  /* 1. Check if we've already got the user's WebID and access to their Pod: */
  /*
  let session = await auth.currentSession();
  if (session) {
    return session.webId;
  }

  /* 2. User has not logged in; ask for their Identity Provider: */
  // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
  // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
  /*
  const identityProvider = $('#provider').text; 
  alert(identityProvider);
  /* 3. Initiate the login process - this will redirect the user to their Identity Provider: */
  /*
  auth.login(identityProvider);
}



/*const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

// Log the user in and out on click
const popupUri = 'https://solid.github.io/solid-auth-client/dist/popup.html';
$('#login  button').click(() => solid.auth.popupLogin({ popupUri }));
$('#logout button').click(() => solid.auth.logout());

// Update components to match the user's login status

solid.auth.trackSession(session => {
  const loggedIn = !!session;
  $('#login').toggle(!loggedIn);
  $('#logout').toggle(loggedIn);
  if (loggedIn) {
    $('#user').text(session.webId);
    // Use the user's WebID as default profile
    if (!$('#profile').val())
      $('#profile').val(session.webId);
  }
});


/*
solid.auth.trackSession(session => {
  if (!session)
  console.log('The user is not logged in')
  else
  console.log('The user is' + session.webId)
  })
*/
/*
$('#view').click(async function loadProfile() {
  // Set up a local data store and associated data fetcher
  const store = $rdf.graph();
  const fetcher = new $rdf.Fetcher(store);

  // Load the person's data into the store
  const person = $('#profile').val();
  await fetcher.load(person);

  // Display their details
  const fullName = store.any($rdf.sym(person), FOAF('name'));
  $('#fullName').text(fullName && fullName.value);

  // Display their friends
  const friends = store.each($rdf.sym(person), FOAF('knows'));
  $('#friends').empty();
  friends.forEach(async (friend) => {
    await fetcher.load(friend);
    const fullName = store.any(friend, FOAF('name'));
    $('#friends').append(
      $('<li>').append(
        $('<a>').text(fullName && fullName.value || friend.value)
                .click(() => $('#profile').val(friend.value))
                .click(loadProfile)));
  });
});
*/
