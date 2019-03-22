import { Component, Fragment } from 'react';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
        };

        this.changeSearchValue = this.changeSearchValue.bind(this);
    }

    changeSearchValue(e) {
        this.setState({ searchValue: e.target.value });
    }

    render() {
        // const { todos = [] } = this.props;

        const todos = [
            {
                id: 1,
                name: 'pierwszy',
                isCompleted: true
            }, {
                id: 2,
                name: 'drugi',
                isCompleted: false
            }, {
                id: 3,
                name: 'pierwszy',
                isCompleted: true
            }, {
                id: 4,
                name: 'drugi',
                isCompleted: false
            }
        ];

        return (
            <div className="App">
                <label htmlFor="search" className='App_searchInputLabel'>Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={this.state.searchValue}
                    onChange={this.changeSearchValue}
                    className='App__searchInput'
                    placeholder='Find your product'
                />
                <table className='App__table'>
                    <caption className='App__tableCaption'>Todos</caption>
                    <tbody>
                        {
                            todos.length
                                ? todos.map(todo => {
                                    return (
                                        <tr key={todo.id}>
                                            <td key={`todoname-${todo.id}`}>{todo.name}</td>
                                            <td key={`todostatus-${todo.id}`}>{todo.isCompleted ? 'Done' : 'InProgress'}</td>
                                        </tr>
                                    );
                                })
                                : <tr className="empty"><td colSpan={todos.length}>No data to show</td></tr>
                        }
                    </tbody>
                </table>
            </div>
       )
    }
};