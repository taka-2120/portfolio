function onMenuClicked(clicked_id) {
    switch (clicked_id) {
        case "home-menu": 
            document.getElementById("home-menu").className = "";
            document.getElementById("proj-menu").className = "activated";
        case "proj-menu": 
            document.getElementById("home-menu").className = "activated";
            document.getElementById("proj-menu").className = "";
    }
}