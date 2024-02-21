import React, {useEffect,useState} from "react";
import { updateTodos,getallTodos } from "./ToDoList";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);
	useEffect(() => {
		getallTodos(setTodos)
	},[])
	async function addTodo(e){
		if(e.key === "Enter"){
			let newTodos = todos.concat({label:inputValue,done:false});
			let result = await updateTodos(newTodos);
			if(result){ 
				setInputValue("");
				getallTodos(setTodos);
			}else{ console.log('an error occured')}
		}
	};
	async function removeTodo(index) {
		let newTodos = todos.filter((item, currentIndex) => index !== currentIndex);
	
		// Check if the newTodos array is empty before making the API call
		if (newTodos.length === 0) {
		  // Make API call to updateTodos with an empty array
		  let apiResult = await updateTodos([]);
		  
		  if (apiResult) {
			setTodos([]);
		  } else {
			console.log("API update failed for empty array");
		  }
		} else {
		  // Make API call to updateTodos with the newTodos array
		  let apiResult = await updateTodos(newTodos);
	
		  if (apiResult) {
			getallTodos(setTodos);
		  } else {
			console.log("API update failed for non-empty array");
		  }
		}
	  }
	  async function clearAllTasks() {
		// Clear all tasks by updating with an empty array
		let result = await updateTodos([]);
		
		if (result) {
		  setTodos([]);
		} else {
		  console.log("Failed to clear all tasks");
		}
	  }
	// async function removeTodo(index){
	// 	let newTodos = todos.filter((item, currentIndex) => index !== currentIndex);
	// 	let result = await updateTodos(newTodos);
	// 	if (result) {
	// 	  getallTodos(setTodos);
	// 	} else {
	// 	  console.log("an error occurred");
	// 	} if (newTodos.length === 0) {
	// 		getallTodos(setTodos);
	// 	  }
	//   };
	return (
		<div className="">
			<ul className="container-fluid list-group list-group-flush">
				<h1>todos</h1>
					<li className="list-group-item p-0"><input
						type="text" 
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e)=> addTodo(e)}
						placeholder="What you need to do"></input>
					</li>
					{todos.map((item,index) => (
					<li className="list-group-item d-inline-flex justify-content-between" key={index}>
						{item.label} 
						<span><i className="fas fa-trash-alt"
						onClick={() => removeTodo(index)}
							// onClick={() => 
							// setTodos(todos.filter((item,curentIndex) =>
							// index != curentIndex
							// ))}
							></i></span>
					</li>
					))}
				<div id="footer">{todos.length} left to do 
				<button onClick={clearAllTasks} className="">
					Clear All Tasks
				</button>
				</div>
			</ul>
		</div>
	);
};

export default Home;
