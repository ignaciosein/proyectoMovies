<<<<<<< HEAD
const editForm= document.getElementById('formEditMovie')
editForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    title = document.getElementById('title').value;
    year = document.getElementById('year').value;
    director = document.getElementById('director').value;
    genre = document.getElementById('genre').value;
    runtime = document.getElementById('duration').value;
    poster = document.getElementById('poster').value;
    IdMovie = document.getElementById('IdMovie').value

    let data = {
        Title: title,
        Year: parseInt(year),
        Director: director,
        Genre: genre,
        Runtime: runtime,
        Poster: poster,
        registerDate: new Date(),
        IdMovie: parseInt(IdMovie)
    }

    let putMethod = async(url, data)=>{
        console.log("url", url)
        let response = await fetch(url,{
            method: 'PUT',
            body: JSON.stringify(data),
=======
 
 
 function remove(title){
    let deleteMethod = async(title)=>{
        let response = await fetch(`http://localhost:3000/deleteFilm/${title}`,{
            method: 'DELETE',
>>>>>>> 3929ece550455ed1621d5bc94c938592d407f94b
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
<<<<<<< HEAD
        
        return response
    }

    putMethod('/editMovie/:id', data)
        .then( resp => {
            window.location = resp.url
        })
})
=======
        return response
    }
    
    deleteMethod(title)
    .then( resp => {
        window.location = resp.url
    })
     .catch((error) => console.log(error))
 }
 
 
>>>>>>> 3929ece550455ed1621d5bc94c938592d407f94b
