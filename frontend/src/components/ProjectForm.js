import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {project_name: '', repository_link: '', project_users: props.project_users[0].uid}
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
        this.props.createProject(this.state.project_name, this.state.repository_link, this.state.project_users)
        event.preventDefault()
        // console.log(this.state.project_name)
        // console.log(this.state.repository_link)
        // console.log(this.state.project_users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">project_name</label>
                    <input type="text" className="form-control" name="project_name"
                    value={this.state.project_name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="repository_link">repository_link</label>
                    <input type="text" className="form-control" name="repository_link"
                    value={this.state.repository_link} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="project_users">project_users</label>
                    <select name="project_users" className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                        {this.props.project_users.map((item)=><option value={item.uid}>{item.username}</option>)}
                    </select>
                    {/*<input type="text" className="form-control" name="project_users"*/}
                    {/*value={this.state.project_users} onChange={(event) => this.handleChange(event)}/>*/}
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
            );
        }
    }


export default ProjectForm
