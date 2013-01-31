// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
        }
        else {
            var install = document.querySelector("#install"),
                manifestURL = "http://brumouta.github.com/MAOE/manifest.webapp";
            /*
                To install a package instead, exchange the above line to this:
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/package.manifest";
            */
            install.parentNode.className = "show-install";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                /*
                    To install a package instead, exchange the above line to this:
                    var installApp = navigator.mozApps.installPackage(manifestURL);
                */
                installApp.onsuccess = function(data) {
                    install.style.display = "none";
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log("Open Web Apps not supported");
}

document.querySelector("#gps").onclick = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
    alert(position.coords.latitude.toString() + position.coords.longitude.toString());
});
}

var pickImage = document.querySelector("#pick-image");
if (pickImage) { 
    pickImage.onclick = function () {
     var pick = new MozActivity({
         name: "pick",
         data: {
             type: ["image/png", "image/jpg", "image/jpeg"]
         
            }
    });

        pick.onsuccess = function () {

            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(this.result.blob);
            var imagePresenter = document.querySelector("#image-presenter");
            imagePresenter.appendChild(img);
            imagePresenter.style.display = "block";
        };

        pick.onerror = function () {

            alert("Can't view the image!");
        };
    }
}
