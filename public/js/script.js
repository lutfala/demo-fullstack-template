//Control image carousel
function startCarousel() {
    let activeImage = 0
    const images = document.querySelectorAll("#carousel img")

    function cycleImages(){
        if(!images[activeImage]) {
            clearInterval(intervalId)
            return;
        }
        images[activeImage].classList.remove('active')
        activeImage = (activeImage + 1) % images.length
        images[activeImage].classList.add('active')
    }

    let intervalId = setInterval(cycleImages, 3000)


}

//Handle edit requests
function editItem(id, name, description) {
     document.getElementById('updateId').value = id

     document.getElementById('updateName').value = name
     document.getElementById('updateDescription').value = description

     document.getElementById('updateForm').action = `/item/update/${id}`
}


//Handle delete requests
async function deleteItem(id) {
    try{
        const response = await fetch(`http://localhost:2400/item/delete/${id}`, {
            method: 'DELETE',
          })
          if (response.ok){
            location.reload()
          } else {
            console.log('falied to delete item')
          }
    } catch(error){
        console.log('Error occured:',error)
    }
}


//Handle errors from server if unable to write data (optional)
function checkForError() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      alert("Validation failed. Name and description are required.");
    }
  }

  window.onload = function (){
    startCarousel ();
    checkForError ();

  }