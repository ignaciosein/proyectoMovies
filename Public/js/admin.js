 
 
 function remove(title){
    let deleteMethod = async(title)=>{
        let response = await fetch(`http://localhost:3000/deleteFilm/${title}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response
    }
    
    deleteMethod(title)
    .then( resp => {
        window.location = resp.url
    })
     .catch((error) => console.log(error))
 }
 
 