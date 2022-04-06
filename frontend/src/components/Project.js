import React from 'react'
import Link from "react-router-dom/es/Link";


const ProjectItem = ({project}) => {
   return (
       <tr>
           <td><Link to={`project/${project.uid}`}>{project.uid}</Link></td>
           <td>
               {project.project_name}
           </td>
           <td>
               {project.repository_link}
           </td>
           {/*<td>*/}
           {/*    {project.project_users}*/}
           {/*</td>*/}
       </tr>
   )
}


const ProjectList = ({projects}) => {
   return (
       <table>
           <th>
               Uid
           </th>
           <th>
               Project name
           </th>
           <th>
               Repository link
           </th>
           {/*<th>*/}
           {/*    Project users*/}
           {/*</th>*/}
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectList