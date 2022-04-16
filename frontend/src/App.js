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
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/TodoForm";


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
           'users': [],
           'projects': [],
           'todos': [],
           'token': '',
       }
   }

   set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
        }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {username: username,
            password: password})
            .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


   load_data() {
       const headers = this.get_headers()
       axios.get('http://127.0.0.1:8000/api/users',  {headers})
           .then(response => {
               const users = response.data.results
                   this.setState(
                   {
                       'users': users
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/projects', {headers})
           .then(response => {
               const projects = response.data.results
                   this.setState(
                   {
                       'projects': projects
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/todo', {headers})
           .then(response => {
               const todos = response.data.results.filter((item)=>item.is_active === true)
               //const todos = response.data.results
                   this.setState(
                   {
                       'todos': todos

                   }
               )
           }).catch(error => console.log(error))
       this.setState({todos: []})
}

   componentDidMount() {
       this.get_token_from_storage()
   }

   deleteProject(uid) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${uid}`, {headers})
            .then(response => {
            this.setState({projects: this.state.projects.filter((item)=>item.uid !== uid)})
            }).catch(error => console.log(error))
   }

   deleteToDo(uid) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${uid}`, {headers})
            .then(response => {
            this.setState({todos: this.state.todos.filter((item)=>item.uid !== uid)})
            }).catch(error => console.log(error))
   }

   createProject(project_name, repository_link, project_users) {
        const headers = this.get_headers()
        const data = {project_name: project_name, repository_link: repository_link, project_users: [project_users]}
        // console.log(data)
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
        .then(response => {
            let new_project = response.data
            // console.log(response.data)
            const project_users = this.state.users.filter((item) => item.uid === new_project.project_users)[0]
            new_project.project_users = project_users
            this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createToDo(project, text, user) {
        const headers = this.get_headers()
        const data = {project: project, text: text, user: user}
        // console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
        .then(response => {
            let new_todo= response.data
            // console.log(response.data)
            const user = this.state.users.filter((item) => item.uid === new_todo.user)[0]
            new_todo.user = user
            const project = this.state.projects.filter((item) => item.uid === new_todo.project)[0]
            new_todo.project =  project
            this.setState({todos: [...this.state.todos, new_todo]})
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
                            <Link to='/todo'>To Do</Link>
                        </li>
                        <li>
                            {this.is_authenticated() ? <button
                                onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList
                        users={this.state.users} />} />
                    <Route exact path='/projects/create' component={() =>
                        <ProjectForm project_users={this.state.users} createProject={(project_name, repository_link, project_users) =>
                            this.createProject(project_name, repository_link, project_users)} />} />

                    <Route exact path='/projects' component={() => <ProjectList
                        projects={this.state.projects} deleteProject={(uid)=>this.deleteProject(uid)}/>} />

                    <Route exact path='/todo/create' component={() =>
                        <ToDoForm users={this.state.users} projects={this.state.projects} createToDo={(project, text, user) =>
                            this. createToDo(project, text, user)} />} />
                    <Route exact path='/todo' component={() => <TodoList
                        todos={this.state.todos} deleteToDo={(uid)=>this.deleteToDo(uid)}/>} />
                    <Route exact path='/login' component={() => <LoginForm
                        get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route path="/user/:uid">
                        <UserTodoList todos={this.state.todos} />
                    </Route>
                    <Route path="/project/:uid">
                        <ProjectTodoList todos={this.state.todos} />
                    </Route>
                    <Redirect from='/todo/user/:uid' to='/' />
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
