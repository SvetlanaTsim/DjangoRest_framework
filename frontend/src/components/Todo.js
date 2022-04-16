import React from 'react'
import Link from "react-router-dom/es/Link";


const TodoItem = ({todo, deleteToDo}) => {
   return (
       <tr>
           <td>
               {todo.uid}
           </td>
           <td>
               {todo.project.project_name}
           </td>
           <td>
               {todo.text}
           </td>
           <td><Link to={`todo/${todo.user.uid}`}>{todo.user.uid}</Link></td>
           <td>
               {todo.created_at}
           </td>
           <td>
               {todo.updated_at}
           </td>
           <td><button onClick={()=>deleteToDo(todo.uid)} type='button'>Delete</button></td>
           {/*onClick={()=>deleteToDo(todo.uid)}*/}
       </tr>
   )
}


const TodoList = ({todos, deleteToDo}) => {
   return (
       <div>
       <table>
           <th>
               Uid
           </th>
           <th>
               Project
           </th>
           <th>
               Text
           </th>
           <th>
               User
           </th>
           <th>
               Created_at
           </th>
           <th>
               Updated_at
           </th>
           {todos.map((todo) => <TodoItem todo={todo} deleteToDo={deleteToDo}/>)}
           <th></th>
       </table>
           <Link to='/todo/create'>Create</Link>
       </div>
   )
}


export default TodoList