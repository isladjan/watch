let infoDiv = document.querySelector(".info");

let text = "Total width/height: " + screen.width + "*" + screen.height + "<br>" +
"Available width/height: " + screen.availWidth + "*" + screen.availHeight + "<br>" +
"Color depth: " + screen.colorDepth + "<br>" +
"Color resolution: " + screen.pixelDepth;

infoDiv.innerHTML = text;