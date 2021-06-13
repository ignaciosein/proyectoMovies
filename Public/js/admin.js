const editForm= document.getElementById('formEditMovie')
editForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    title = document.getElementById('title').value;
    year = document.getElementById('year').value;
    director = document.getElementById('director').value;
    genre = document.getElementById('genre').value;
    runtime = document.getElementById('duration').value;
    poster = document.getElementById('poster').value;
    IdPelicula = document.getElementById('IdPelicula').value
  
    console.log(title,year,director,genre,runtime,poster,IdPelicula)

    let data = {
        Title: title,
        Year: parseInt(year),
        Director: director,
        Genre: genre,
        Runtime: runtime,
        Poster: poster,
        registerDate: new Date(),
        IdPelicula: parseInt(IdPelicula)
    }

    let putMethod = async(url, data)=>{
        let response = await fetch(url,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.json()
    }

    putMethod('/editMovie/:id', data)
        .then( x => {
            console.log('la x: ',x)
        })
    
    
})