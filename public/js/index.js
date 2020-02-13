function loadArtists(){
	fetch('/artists')
		.then((res) => res.json())
		.then((artists) => {
			var container = document.getElementById("mainContainer");
			while (container.firstChild) {
				container.firstChild.remove();
			}
			for (var key in artists) {
				createArtist(key, artists[key].heading, artists[key].body, artists[key].img);
			}
		})
		.catch((err) => console.log(err));
}

loadArtists();

function newArtist(){
	fetch('/add', {
		method: 'post',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(
			{
				"heading":  document.getElementById("heading").value, 
				"body":  document.getElementById("body").value, 
				"img": document.getElementById("img").value
			})
	})
	.then((res) => res.json())
	.then((artist) => {
		createArtist(artist.id, artist.heading, artist.body, artist.img)
		document.getElementById("img").value = null;
		document.getElementById("heading").value = null;
		document.getElementById("body").value = null;	
	})
	.catch((err) => console.log(err));
}

function addArtist(event) {
		var inputs = document.getElementById("inputs");	
		if(inputs.style.display == "block"){
			inputs.style.display = "none";
		} else {
			document.getElementById("img").value = "";
			document.getElementById("heading").value = "";
			document.getElementById("body").value = "";
			inputs.style.display = "block"
		}
}

function searchArtist(event) {
	var container = document.getElementById("mainContainer");
	while (container.firstChild) {
		container.firstChild.remove();
	}
	var query = document.getElementById("searchBox").value.toUpperCase().trim();
	fetch('/artists')
		.then((res) => res.json())
		.then((artists) => {
			for (var key in artists) {
				if(artists[key].heading.toUpperCase().includes(query)){
					createArtist(key, artists[key].heading, artists[key].body, artists[key].img);
				}
			}
		})
		.catch((err) => console.log(err));
	
}

function createArtist(id, heading, body, img){
	var container = document.getElementById("mainContainer");
	let artistContainer = document.createElement("div");
	artistContainer.classList.add("artistContainer");
	artistContainer.id = id;

	let newImg = document.createElement("img");
	newImg.src = img;

	let newHeading = document.createElement("h4");
	newHeading.textContent = heading;

	let newBody = document.createElement("p");
	newBody.textContent = body;

	let newBtn = document.createElement("button");
	newBtn.textContent = "Delete";
	newBtn.setAttribute("onclick", "deleteArtist(this)")

	artistContainer.append(newImg);
	artistContainer.append(newHeading);
	artistContainer.append(newBody);
	artistContainer.append(newBtn);
	container.append(artistContainer);

}

function deleteArtist(element){
	fetch('/delete', {
		method: 'post',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify({"id": element.parentNode.id})
	})
	.then(() => loadArtists())
	.catch((err) => console.log(err));
	element.parentNode.parentNode.removeChild(element.parentNode);
}