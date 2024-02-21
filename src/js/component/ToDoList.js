 function getallTodos(setTodos){
     fetch('https://playground.4geeks.com/apis/fake/todos/user/N1ckSwayAPI')
     .then(resp => resp.json())
     .then(data => setTodos(data))
     .catch(error => console.log(error))
}

// async function updateTodos(newTodos){
//   let options = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(newTodos)
//   }
//   let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/N1ckSwayAPI', options)
//   if(!response.ok){ 
//     return false
//   }else{
//     let data = await response.json()
//     console.log(data)
//     return true;
//   }
// }

async function updateTodos(newTodos) {
  let url = 'https://playground.4geeks.com/apis/fake/todos/user/N1ckSwayAPI';

  // Check if newTodos is empty
  if (newTodos.length === 0) {
    // Create a placeholder task to ensure the user exists with an empty task list
    newTodos = [{ label: "example!", done: false }];
  }

  // Send a PUT request
  let putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodos)
  };

  try {
    let putResponse = await fetch(url, putOptions);

    if (!putResponse.ok) {
      console.error(`Update failed with status ${putResponse.status}:`, await putResponse.json());
      return false;
    }

    let data = await putResponse.json();
    console.log(data);
    return true;
  } catch (error) {
    console.error('Error during update:', error);
    return false;
  }
}



export {updateTodos,getallTodos};