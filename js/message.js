const selectedID = localStorage.getItem('selectedID');
console.log('selectedId', selectedID)


// Se obtienen mensajes de firestore
db.collection('posted').onSnapshot((querySnapshot) => {
    comentarios.innerHTML = '';
  
    querySnapshot.forEach((doc) => {
      let postID = doc.id; // ID del post
      let postName = doc.data().name; // Nombre del usuario
      let text = doc.data().post; // Texto del post
      let userId = doc.data().user; // ID del usuario logeado
      let bringComments = doc.data().comments;
      let title = doc.data().title;
      let theme = doc.data().theme;
      let fecha = doc.data().fecha;
      printPost(postID, postName, text, userId, bringComments, title, theme, fecha);
      console.log(bringComments)
    });
  
  });
  
  db.collection('posted').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let postToPrint = doc.data().comments;
      printComments(postToPrint);
    });
  });
  
  // Función para imprimir
  /* Se pasan como parámetros el ID del post, nombre del usuario, texto
  y ID del usuario. Se declara una condicional que compara si el ID del usuario
  logeado coincide con el ID del usuario del post publicado, si son iguales 
  se imprime una caja con el nombre del usuario, el post, el botón de like, 
  botón para editar y botón para borrar. Si no es el mismo se imprime caja con 
  nombre de usuario, texto y botón de like.
  Se utiliza onclick para accionar los botones, se pasa como parámetro el ID del post   
  */
  const printPost = (postID, postName, text, userId, bringComments, title, theme, fecha) => {
    if (postID == selectedID){ 
    let newID = postID + 1;
    let commentID = postID + 2;
    console.log('inside', bringComments)
    choosingOrg(postID, text)
      comentarios.innerHTML += `
      <h5>${postName}</h5>
      <h5>${title}</h5>

      <p>${text}</p>

      <p>${theme}</p>
      
      <p>Publicado ${fecha}</p>

      <input placeholder="Escribe tu comentario" id="${commentID}">
      <button onclick="addComment('${postID}','${bringComments}','${commentID}','${newID}', '${userId}')">Clik me</button>
      `;} 
  };

  const responses = document.getElementById('responses');  
const printComments = (postToPrint) => {
    console.log('snape', postToPrint)
    
    postToPrint.forEach(el => {
      let commentedName = el.name;
      let commentedID = el.commID;
      let commentedSpaceID = el.commSpaceID;
      let commentedTxt = el.commentTxt
      let commentedFecha = el.fecha;
      let commentedHour = el.hour;
        console.log('cmmtd', commentedSpaceID)

      if (selectedID == commentedID){

        responses.innerHTML += `<div class="">
      
      <p><strong>${commentedName} respondió</strong> ${commentedFecha}</p>
      <p>${commentedTxt}</p>
      
      </div> `
      }  
     
      console.log(commentedID, commentedSpaceID, commentedName, commentedTxt, commentedFecha,  commentedHour)
    });
}
  

  /*
  const printComments = (postToPrint) => {
    //console.log('snape', postToPrint)
    postToPrint.forEach(el => {
      let commentedName = el.name;
      let commentedID = el.commID;
      let commentedSpaceID = el.commSpaceID;
      let commentedTxt = el.commentTxt
      let commentedFecha = el.fecha;
      let commentedHour = el.hour;
        console.log('cmmtd', commentedSpaceID)
      const divComment = document.getElementById(commentedSpaceID);
      divComment.innerHTML += `<div class="row">
      <div class="col-10">
      <div><p>${commentedName}</p><p>${commentedFecha}</p></div>
      
      <p>${commentedTxt}</p>
      </div>  
      </div>`
      console.log(commentedID, commentedSpaceID, commentedName, commentedTxt, commentedFecha,  commentedHour)
      
    });
   
  }*/
  const dateBuilder = new Date()
  const getDate =  dateBuilder.toLocaleDateString()
  const addComment = (postID, bringComments, commentID, newID) => {
    console.log(postID, bringComments, commentID)
  
  
    let addingComment = document.getElementById(commentID)
    let commentSpaceID = document.getElementById(newID)
    console.log(addingComment.value)
    let newComment = addingComment.value
    let commentObj = {
      "name": "Anónimo",
      "hour": "5:50",
      "fecha": getDate,
      "commentTxt": newComment,
      "commID": postID,
      "commSpaceID": newID
    }
  
    let postRef = db.collection('posted').doc(postID);
  
    // Atomically add a new region to the "regions" array field.
    postRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentObj)
      }).then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  
  }

  const deletePost = (postID) => {
    db.collection('posted').doc(postID).delete().then(function () {
      console.log('Post borrado');
    }).catch(function (error) {
      console.error('Error: ', error);
    });
  };

const addOrg = document.getElementById('addOrg');
/*
db.collection('posted').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let thisComment = doc.data().comments;
    let thisPostID = doc.id; // ID del post
    console.log('aqui', thisComment, thisPostID)
    choosingOrg(thisComment, thisPostID);
  });
});*/

const choosingOrg = (postID, text) => {
    var org;
    var description;
    console.log(postID, text)
    if (text.includes('maestro') && text.includes('insistente')){
      console.log('Centro de Apoyo a la Mujer Margarita Magón')
      org = 'Centro de Apoyo a la Mujer Margarita Magón';
      description = 'Ofrecen asesoría legal y de salud o bien al tratar temas como la perspectiva de género.';
    } else if (text.includes('tocó')) {
      console.log('Asociación para el Desarrollo Integral de Mujeres Violadas AC')
      org = 'Asociación para el Desarrollo Integral de Mujeres Violadas AC';
      description= 'Imparten cursos psicológicos y legales, en caso de que hayas sido víctima de un delito sexual o quieras prevenir serlo.';
    } else if (text.includes('miedo')){
      console.log('Casa Gaviota')
      org = 'Casa Gaviota';
      description = "Ayudan a detectar la violencia intrafamiliar y hacia la mujer.";
    } else if(text.includes('insinuaron')){
      console.log('Casa Semillas')
      org = 'Casa Semillas'
      description = "Luchan por la igualdad de género y dan asesoría a mujeres que han sufrido de violencia.";
    } else {
      console.log('Coordinadora Nacional de Ayuda a Mujeres')
      org = 'Coordinadora Nacional de Ayuda a Mujeres';
      description = "Especializadas en la ayuda para mujeres. Ayudan en el desarrollo de la mujer."
    }

    addOrg.innerHTML = `
    <div class="row">
    <div class="col s12 m12">
      <div class="card orange darken-3 ">
        <div class="card-content white-text">
          <span class="card-title">${org}</span><br>
          <p>${description}</p>
        </div>
        <div class="card-action">
          <a href="#">Sitio Web</a>
          <a href="#">WhatssApp</a>
          <a href="#">Telèfono</a>
        </div>
      </div>
    </div>
  </div>
      <h5></h5>
      <p></p>
    `

}