 if(document.getElementById("deleteMovie")){

    

 

document.getElementById('deleteMovie').addEventListener('click',()=>{

    alert("has pulsado el boton")

    let title = document.getElementById('titleMovie').innerHTML;
    
    alert(title)
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
    /*     .then( resp => resp.json()) */
    .then( resp => {
        window.location = resp.url
    })
     .catch((error) => console.log(error))
    
 
       
 
    
})
}