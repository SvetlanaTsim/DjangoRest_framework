import './App.css';
import React from 'react';
import logo from './logo.svg';
import UserList from './components/User.js'
import MenuContent from './components/Menu.js'
import FooterContent from './components/Footer.js'
import axios from "axios";
import ProjectList from "./components/Project"
import TodoList from "./components/Todo"
import {Link, Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import UserTodoList from "./components/UserToDo";
import ProjectTodoList from "./components/ProjectTodo";
import TodoUserList from "./components/ToDoUser";


const NotFound404 = ({ location }) => {
return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
    )
}


class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'authors': [],
           'users': [],
           'projects': [],
           'todos': [],
       }
   }


   componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/authors')
           .then(response => {
               const authors = response.data.results
                   this.setState(
                   {
                       'authors': authors
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/users')
           .then(response => {
               const users = response.data.results
                   this.setState(
                   {
                       'users': users
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/projects')
           .then(response => {
               const projects = response.data.results
                   this.setState(
                   {
                       'projects': projects
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/todo')
           .then(response => {
               const todos = response.data.results
                   this.setState(
                   {
                       'todos': todos
                   }
               )
           }).catch(error => console.log(error))
   }

   render () {
       return (

           <div className="App">
               <MenuContent/>
                <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/todo'>ToDo</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList
                        users={this.state.users} />} />
                    <Route exact path='/projects' component={() => <ProjectList
                        projects={this.state.projects} />} />
                    <Route exact path='/todo' component={() => <TodoList
                        todos={this.state.todos} />} />
                    <Route path="/user/:uid">
                        <UserTodoList todos={this.state.todos} />
                    </Route>
                    <Route path="/project/:uid">
                        <ProjectTodoList todos={this.state.todos} />
                    </Route>
                    <Route path="/todo/:uid">
                        <TodoUserList users={this.state.users} />
                    </Route>
                    <Redirect from='/users' to='/' />
                    <Route component={NotFound404} />
                </Switch>
                </BrowserRouter>
                <FooterContent/>
           </div>
       )
   }
}

export default App;
