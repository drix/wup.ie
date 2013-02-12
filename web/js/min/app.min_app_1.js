
window.fbAsyncInit = function() {
    FB.init({
      appId      : '104243426426744', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : false // parse XFBML
    });
	// Auto open login popup
	FB.login(function(response) {
		if (response.authResponse) {
			FB.getLoginStatus(function(response){ 
				/*
				RESPONSE OBJECT
				
				success:
					authResponse:
						accessToken: "AAAFEQ3eo4D4BANBDL4j1ETQoG9Bd7CBzt2ZA9SVtgqTzTwJuxq5epUIPG3bKWpUf3lSG7nb9TQXHZAMuDqhh1qRaT0eZBzkzNx0heKukwZDZD"
						expiresIn: 5670
						signedRequest: "vDBHA6p3qnj6rQKvqUxJqshOxtbdrVt8RMwhWm_c7X8.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiIyLkFRQ1VHam9HU0U4WFRtTXouMzYwMC4xMzUwMDM5NjAwLjEtNjc1OTk4NzM5fDEzNTAwMzQyMzB8aTl2UWxZdjRpY3RoSWlrNE1lQ3pZMGozWnlRIiwiaXNzdWVkX2F0IjoxMzUwMDMzOTMwLCJ1c2VyX2lkIjoiNjc1OTk4NzM5In0"
						userID: "675998739"
					status: "connected"
					
				error: 
					authResponse: undefined
					status: "unknown"
				*/
				if (response.status == 'connected') {
										
					//setup form
					App.views.formSearch = new App.views.FormSearch(response.authResponse.accessToken);

					// setup map
					App.views.map = new App.views.Map(App.views.formSearch.collection);
					
				} else {
					alert("Error connection with facebook, please try again.");
					window.location.reload();
				}
			});
		} else {
			alert("You must accept wup connect to facebook, we aren't asking for publish permissions, don't worry =)");
			window.location.reload();
		}
	});
 };

// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));
