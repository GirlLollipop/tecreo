const smallTxt = document.getElementById('smallTxt');
let shortText;

db.collection('posted').onSnapshot((querySnapshot) => {
    smallTxt.innerHTML = '';
  
    querySnapshot.forEach((doc) => {
      let postID = doc.id; // ID del post
      let userName = doc.data().name; // Nombre del usuario
      let text = doc.data().post; // Texto del post
      let bringComments = doc.data().comments;
      let theme = doc.data().theme;
      let title = doc.data().title
      printPost(postID, userName, text, bringComments, theme, title);
      console.log(bringComments)
    });
  
  });

  const printPost = (postID, userName, text, bringComments, theme, title) => {
      
    if(text.length > 40){
        shortText = text.substring(0,40);
    } else {
        shortText = text;
    }
    console.log()
    
    smallTxt.innerHTML += `
      <a href="message.html" class="collection-item" onclick="saveId('${postID}')">
      <span>${userName}</span>
      <li class="collection-item avatar">
      <i class="material-icons circle">account_circle</i>
      
      <p class="title">${title}</p>
      <p>${shortText}
      </p>
      <p>${theme}</p>
      <p>${bringComments.length} Respuestas</p>
      
    </li>
      </a>`
  }

  const saveId = (postID) => {
    localStorage.setItem('selectedID', postID);
  }

