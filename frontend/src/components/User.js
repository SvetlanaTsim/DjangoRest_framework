import React from 'react'
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


const UserList = ({users}) => {
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
           {users.map((user) => <UserItem user={user} />)}
       </table>
   )
}


export default UserList
