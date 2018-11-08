import React from 'react';



const TodoForm = ({addTodo}) => {
  // input tracker
  let input;


  return (
    <div className="container">
      
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <div className="input-group">
      <input 
      className="form-control col-sm-12 " 
      ref={node => {
        input = node;
      }} 
      placeholder='Add task here...'
      />
      <button className="input-group-append btn-primary shadow-none" 
      ><i className="fa fa-plus  text-white  "></i></button>
      </div>
      <br />
      </form>
    </div>

  );
};

const Todo = ({todo, remove, toggleClass}) => {
  // each todo
  //
  return (<li className={todo.addClass} id={todo.id} onClick={() => {(toggleClass(todo.id))}}>
      {todo.text} 
      <button className='fa fa-times removeBtn text-danger h-100 p-3 btn close' onClick={() => {(remove(todo.id))}}></button>
    </li>);
    
}

const TodoList = ({todos, remove, toggleClass}) => {
  //map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} toggleClass={toggleClass}/>)
  });
  return (<ul className="list-group">{todoNode}</ul>)
}


const Title = ({todoCount}) => {
  return (
    <div>
      <h1>Todo List</h1>
      <p>number of tasks ({todoCount})</p>
    </div>
  );
}


window.id = 0;

// App
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      txt: '',
      classNames: 'list-group-item',
      data: [],
       
    }
    
  }
  
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }


  // todo handler
  addTodo(val) {
    if(val !== '') {
      // assemble data
      const todo = {text: val, addClass: 'list-group-item', id: window.id = Date.now()}
      // update data
      this.state.data.push(todo);
      // update state
      this.setState({
        data: this.state.data
      });
      
    }
  }
  
  // handle remove 
  handleRemove(id){
    // filter all todos except the one to be removed
    // eslint-disable-next-line
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // update state with filter
    this.setState({
      data: remainder
    });
  }
  
  handleToggleClass(id){
    // get list item by id 
    const addClass = document.getElementById(`${id}`);
    // add class name to list item dynamically adding the check mark and and crossing out the text.   
    if (addClass !== undefined) addClass.classList.contains('checked') ? addClass.classList.remove('checked') : addClass.classList.add('checked');
      
      // filtering through and adding class to filtered items state this saves className for reload. 
      // eslint-disable-next-line
      const check = this.state.data.filter((todo) => {
        if(todo.id === id) return todo.addClass === "list-group-item checked" ? todo.addClass = "list-group-item" : todo.addClass = "list-group-item checked"
      })
    
  }   
  
  render() {
    
    return (
        <div> 
            <Title todoCount={this.state.data.length}/>
            <TodoForm addTodo={this.addTodo.bind(this)}/>
            <TodoList
              todos={this.state.data}
              remove={this.handleRemove.bind(this)}
              toggleClass={this.handleToggleClass.bind(this)}
              />          
        </div>
  )}
}


export default App;
