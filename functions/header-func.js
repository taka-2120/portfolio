function onMenuClicked(clicked_id) {
    var domain = window.location.origin;
    switch (clicked_id) {
        case "home-menu": 
            window.location.href = domain;
            return;
        case "proj-menu": 
            window.location.href = domain + "/projects/";
            return;
    }
}