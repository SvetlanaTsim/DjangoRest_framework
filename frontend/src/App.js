import './App.css';
import React from 'react';
import logo from './logo.svg';
import AuthorList from './components/Author.js'
import UserList from './components/User.js'
import MenuContent from './components/Menu.js'
import FooterContent from './components/Footer.js'
import axios from "axios";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'authors': [],
           'users': [],
       }
   }


   componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/authors')
           .then(response => {
               const authors = response.data
                   this.setState(
                   {
                       'authors': authors
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/users')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users
                   }
               )
           }).catch(error => console.log(error))
   }

   render () {
       return (
           <div>
               <MenuContent/>
               Authors List
               <AuthorList authors={this.state.authors} />
               Users List
               <UserList users={this.state.users} />
               <FooterContent/>
           </div>
       )
   }
}

export default App;
