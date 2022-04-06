import React from 'react'
import { useParams } from 'react-router-dom'


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
           <td>
               {todo.user.username}
           </td>
           <td>
               {todo.created_at}
           </td>
           <td>
               {todo.updated_at}
           </td>
       </tr>
        )
    }


const ProjectTodoList = ({todos}) => {
    let {uid} = useParams();
    let filtered_items = todos.filter((todo) => todo.project.uid == uid)
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
           {filtered_items.map((todo) => <TodoItem todo={todo} />)}
       </table>
    )
    }

export default ProjectTodoList