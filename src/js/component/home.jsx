import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);  
	return (
		<div className="">
			<ul className="container-fluid list-group list-group-flush">
				<h1>todos</h1>
					<li className="list-group-item p-0"><input
						type="text" 
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e)=> {
							if(e.key === "Enter"){
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}

						}}
						placeholder="What you need to do"></input>
					</li>
					{todos.map((item,index) => (
					<li className="list-group-item d-inline-flex justify-content-between">
						{item} <span><i className="fas fa-trash-alt"
							onClick={() => 
							setTodos(todos.filter((item,curentIndex) =>
							index != curentIndex
							))}></i></span>
					</li>
					))}
				<div id="footer">{todos.length} left to do</div>
			</ul>
		</div>
	);
};

export default Home;
