import React from 'react'
import Link from "react-router-dom/es/Link";


const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td><Link to={`project/${project.uid}`}>{project.uid}</Link></td>
           <td>
               {project.project_name}
           </td>
           <td>
               {project.repository_link}
           </td>
           <td>
               {project.project_users}
           </td>
           <td><button onClick={()=>deleteProject(project.uid)} type='button'>Delete</button></td>
       </tr>
   )
}


const ProjectList = ({projects, deleteProject}) => {
   return (
       <div>
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
           <th>
               Project users
           </th>
           <th></th>

           {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
       </table>
       <Link to='/projects/create'>Create</Link>
       </div>
   )
}


export default ProjectList