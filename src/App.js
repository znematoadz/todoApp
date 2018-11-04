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

const Todo = ({todo, remove}) => {
  // each todo
  
  return (<li id={todo.id} className="list-group-item" >
      {todo.text} 
      <span className='fa fa-times removeBtn text-info' onClick={() => {(remove(todo.id))}}></span>
    </li>);
    
}

const TodoList = ({todos, remove}) => {
  //map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
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
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      txt: 0,
      data: []
    }
    
  }
  
  // todo handler
  addTodo(val) {
    if(val !== '') {
      // assemble data
      const todo = {text: val, id: window.id++}
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
  
  render() {
    
    return (
        <div> 
            <Title todoCount={this.state.data.length}/>
            <TodoForm addTodo={this.addTodo.bind(this)}/>
            <TodoList
              todos={this.state.data}
              remove={this.handleRemove.bind(this)}
              />
              
        </div>
  )}
}


export default App;
