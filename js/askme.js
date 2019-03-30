// Elementos de HTML
const dataName = document.getElementById('dataName');
const btnPost = document.getElementById('btnPost');
const postText = document.getElementById('postText');
const comentarios = document.getElementById('comentarios');
const input = document.getElementById('input');
const btnEdit = document.getElementById('btnEdit');
const btnErase = document.getElementById('btnErase');
const btnLike = document.getElementById('btnLike');
const btnSave = document.getElementById('btnSave');
const likes = document.getElementById('likes');
const btnProfile = document.getElementById('btnProfile');
const profile = document.getElementById('profile');
const home = document.getElementById('home');
const postForm = document.getElementById('postForm');
const btnHome = document.getElementById('btnHome');
const btnRanking = document.getElementById('btnRanking');
const bntMessage = document.getElementById('btnMessage');
const userPrintPhoto = document.getElementById('user-photo');
const addingPhoto = document.getElementById('photo');
var db = firebase.firestore(); // Firestore
const inputTitle = document.getElementById('title');

let userUid = 'yepp'
let commented = []
let asignTheme;

const getTheme = (x) => {
  asignTheme = x
}

const dateBuilder = new Date()
  const getDate =  dateBuilder.toLocaleDateString()
// Función para subir mensaje a firestore
btnPost.addEventListener('click', el => {
  // Se obtiene el valor del input
  let posted = postText.value;
  let userNameValue = userName.value;
  let getTitle = inputTitle.value;
  if(Boolean(asignTheme) != true){
    alert('Por favor asigna un tema')
  }else{
    asignTheme = "Consulta"
    console.log(asignTheme)
  }
  if (Boolean(userNameValue) != true){
    userNameValue = "Anónimo"
  }
  // Si el input está vacío se alerta al usuario
  if (posted === '' || posted === ' ') {
    alert('Escribe un mensaje');
  } else {
    db.collection('posted').add({
        user: userUid, // ID del usuario logeado
        name: userNameValue, // Nombre del usuario
        post: posted, // Texto del post
        comments: commented,
        title : getTitle, 
        theme : asignTheme,
        "fecha": getDate
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        postText.value = '';
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
});



// Función para borrar post
// Se selecciona el nombre del objeto y el ID del post
const deletePost = (postID) => {
  db.collection('posted').doc(postID).delete().then(function () {
    console.log('Post borrado');
  }).catch(function (error) {
    console.error('Error: ', error);
  });
};

// Función para editar post
/* Se pasan como parametros el ID del post, el nombre de usuario, 
el texto y el ID del usuario. Al momento de presionar el botón
activa un prompt donde se escriben los cambios, se guardan en la 
variable newPost y se actualiza el objeto*/
const editPost = (postID, postName, text, userId) => {
  let newPost = prompt('Escribe tus cambios');
  let postRef = db.collection('posted').doc(postID);

  return postRef.update({
      user: userUid,
      name: user,
      post: newPost
    })
    .then(function () {
      console.log('Document successfully updated!');
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};




/**
 * 
 * 
 * console.log(postID, bringComments, commentID)
  let newArr = []
  let addingComment = document.getElementById(commentID)
  console.log(addingComment.value)
  newArr.push(addingComment.value);
  bringComments += ',';
  bringComments += addingComment.value
  
  console.log('si? ', bringComments)

  let postRef = db.collection('posted').doc(postID);

  return postRef.update({
      comments: bringComments
  })
    .then(function() {
      console.log('Document successfully updated!');
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
 */

//https://stackoverflow.com/questions/46757614/how-to-update-an-array-of-objects-with-firestore
//https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
