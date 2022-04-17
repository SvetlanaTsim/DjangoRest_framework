import React from 'react'
import {findAllByDisplayValue} from "@testing-library/react";
import ProjectList from "./Project";


class ProjectFilterForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {project_name: '', 'projects': []}
    }

    handleChange(event)
    {
        this.setState(
            {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleSubmit(event) {
        let projects = this.props.filterProjectByName(this.state.project_name)
        console.log(this.state.project_name)
        this.setState({'projects': projects})
        event.preventDefault()

    }

    render() {
        return (
            <div>
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">project_name</label>
                    <input type="text" className="form-control" name="project_name"
                    value={this.state.project_name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Filter" />
            </form>
            <div><ProjectList
                    projects={this.state.projects} deleteProject={(uid)=>this.deleteProject(uid)}/></div>
            </div>
            );
        }
    }

export default ProjectFilterForm

