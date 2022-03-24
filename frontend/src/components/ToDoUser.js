import React from 'react'
import { useParams } from 'react-router-dom'
import Link from "react-router-dom/es/Link";


const UserItem = ({user}) => {
   return (
       <tr>
           <td><Link to={`user/${user.uid}`}>{user.uid}</Link></td>
           <td>
               {user.username}
           </td>
           <td>
               {user.first_name}
           </td>
           <td>
               {user.last_name}
           </td>
           <td>
               {user.email}
           </td>
       </tr>
   )
}


const TodoUserList = ({users}) => {
    let {uid} = useParams();
    let filtered_items = users.filter((user) => user.uid == uid)
    return (
        <table>
           <th>
               Uid
           </th>
           <th>
               Username
           </th>
           <th>
               First Name
           </th>
           <th>
               Last Name
           </th>
           <th>
               Email
           </th>
            {filtered_items.map((user) => <UserItem user={user} />)}
       </table>
    )
    }

export default TodoUserList