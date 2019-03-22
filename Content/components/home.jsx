import { Component } from 'react';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            editedItemId: 0,
            currentCellValue: '',
            todos: [
                {
                    id: 1,
                    name: 'pierwszy1',
                    isCompleted: true
                }, {
                    id: 2,
                    name: 'drugi2',
                    isCompleted: false
                }, {
                    id: 3,
                    name: 'pierwszy3',
                    isCompleted: true
                }, {
                    id: 4,
                    name: 'drugi4',
                    isCompleted: false
                }
            ],
            newTodoValue: ''
        };

        this.changeCellValue = this.changeCellValue.bind(this);
        this.editCell = this.editCell.bind(this);
        this.setCurrentCellValue = this.setCurrentCellValue.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        this.setCurrentNewTodoValue = this.setCurrentNewTodoValue.bind(this);
        this.newTodoKeyDown = this.newTodoKeyDown.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    changeCellValue() {
        const { todos, currentCellValue } = this.state;

        const currentTodos = todos.map(todo => {
            if (this.state.editedItemId === todo.id) {
                return {
                    ...todo,
                    name: currentCellValue || todo.name
                }
            }

            return todo;
        });
        this.setState({ editedItemId: 0, todos: [...currentTodos] });
        currentCellValue && console.log('API call PUT with name change');
    }

    editCell(id) {
        this.setState({ editedItemId: id });
    }

    setCurrentCellValue(e) {
        this.setState({ currentCellValue: e.target.value });
    }

    setCurrentNewTodoValue(e) {
        this.setState({ newTodoValue: e.target.value });
    }

    newTodoKeyDown(e) {
        const { newTodoValue } = this.state;
        if (e.keyCode === 13 && newTodoValue) {
            this.addTodo();
        }
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    addTodo() {
        // todo id should come from API, right now it's mocked
        const { todos, newTodoValue } = this.state;
        this.setState({ newTodoValue: '', todos: [...todos, { id: todos[todos.length - 1].id + 1, name: newTodoValue, isCompleted: false }] });
    }

    changeStatus(id) {
        const { todos } = this.state;

        const currentTodos = todos.map(todo => {
            if (id === todo.id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }

            return todo;
        });
        this.setState({ todos: [...currentTodos] });
    }

    render() {
        const { todos, newTodoValue } = this.state;

        const todoDone = todos.filter(item => item.isCompleted);
        const todoInProgress = todos.filter(item => !item.isCompleted);

        return (
            <div className="App">
                <TodoTable
                    todos={todoDone}
                    editCell={this.editCell}
                    editedItemId={this.state.editedItemId}
                    setCurrentCellValue={this.setCurrentCellValue}
                    changeCellValue={this.changeCellValue}
                    caption={'Todos done'}
                    onKeyDown={this.handleKeyDown}
                    changeStatus={this.changeStatus}
                />
                <TodoTable
                    todos={todoInProgress}
                    editCell={this.editCell}
                    editedItemId={this.state.editedItemId}
                    setCurrentCellValue={this.setCurrentCellValue}
                    changeCellValue={this.changeCellValue}
                    caption={'Todos in progress'}
                    onKeyDown={this.handleKeyDown}
                    changeStatus={this.changeStatus}
                />
                <div className="App__newTodoWrapper">
                    <input
                        type="text"
                        name="newTodo"
                        value={newTodoValue}
                        onChange={this.setCurrentNewTodoValue}
                        className='App__input'
                        onKeyDown={this.newTodoKeyDown}
                        placeholder="Add new Todo"
                    />
                    <button className="btn btn-info" onClick={this.addTodo} disabled={!newTodoValue}> Add Todo </button>
                </div>
            </div>
       )
    }
};

const TodoTable = props => {
    const { todos, editedItemId, editCell, setCurrentCellValue, changeCellValue, caption, onKeyDown, changeStatus} = props;
    return (
        <table className='App__table'>
            <caption className='App__tableCaption'>{caption}</caption>
            <tbody>
                {
                    todos.length
                        ? todos.map(todo => {
                            return (
                                <tr key={todo.id}>
                                    <td key={`todoname-${todo.id}`} onClick={() => editCell(todo.id)} width="60%">
                                        {
                                            todo.id === editedItemId
                                                ? <input
                                                    type="text"
                                                    name="editCell"
                                                    defaultValue={todo.name}
                                                    onChange={setCurrentCellValue}
                                                    onBlur={e => changeCellValue(e, todo.id)}
                                                    className='App__input'
                                                    onKeyDown={onKeyDown}
                                                    autoFocus
                                                />
                                                : <span>{todo.name}</span>
                                        }
                                    </td>
                                    <td width="40%">
                                        <button className="btn btn-info" onClick={() => changeStatus(todo.id)}> {todo.isCompleted ? 'Mark as In Progress' : 'Mark as Done'} </button>
                                    </td>
                                </tr>
                            );
                        })
                        : <tr className="empty"><td colSpan={todos.length}>No data to show</td></tr>
                }
            </tbody>
        </table>
    )
}