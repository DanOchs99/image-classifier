const myImage = document.getElementById("myImage")
const imgDisplay = document.getElementById('imgDisplay')
const uploadButton = document.getElementById('uploadButton')
const classifyButton = document.getElementById('classifyButton')
const predictionsDiv = document.getElementById('predictionsDiv')

let classifier = null

function encodeImageFileAsURL() {
    let filesSelected = myImage.files;
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0]
        let fileReader = new FileReader()

        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result
            let newImage = document.createElement('img')
            newImage.src = srcData
            newImage.width = 350
            newImage.id = 'image'

            imgDisplay.innerHTML = newImage.outerHTML
            const upload = {image: imgDisplay.innerHTML}
            //console.log("Converted Base64 version is " + document.getElementById('imgDisplay').innerHTML);
            fetch('http://localhost:3000/photo',{
                method: 'POST',
                body: JSON.stringify(upload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => { response.json()
                                .then(json => {
                                    //console.log(json)
                                    classifier = ml5.imageClassifier('MobileNet', () => {
                                        classifyButton.disabled = false
                                    })
                                })
                                .catch(error => {
                                    console.log(error)  
                                });
            })
            .catch(error => {
                  console.log(error)  
            });
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

uploadButton.addEventListener('click', () => {
    // user clicked the upload button
    encodeImageFileAsURL()
})

classifyButton.addEventListener('click', () => {
    // user clicked the classify button
    classifier.classify(document.getElementById('image'), (err, results) => {
        if (err) {
            console.log(err)
        }
        else if (results) {
            for (let i=0; i<results.length; i++) {
                let newDiv = document.createElement('div')
                newDiv.innerHTML = `${results[i].label} &nbsp; &nbsp; ${(results[i].confidence * 100).toFixed(2)}%`
                predictionsDiv.appendChild(newDiv)
            }
        }
    })
})
