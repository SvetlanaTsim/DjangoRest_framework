import React from 'react'
import Link from "react-router-dom/es/Link";


const TodoItem = ({todo}) => {
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
       </tr>
   )
}


const TodoList = ({todos}) => {
   return (
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
           {todos.map((todo) => <TodoItem todo={todo} />)}
       </table>
   )
}


export default TodoList