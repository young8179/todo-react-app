import React, { Component } from 'react'
import './Todo.css';




export default class Todo extends Component {
    constructor(){
        super()
        this.state={
            todo: "",
            task: [],
            completeTask: []
        }
    }
    //form handling
    handleSubmit =(event)=>{
        event.preventDefault()
        let task = [...this.state.task]
        task.push(this.state.todo)
        this.setState({
            todo: "",
            task: task
        })
    }

    //input todo handling
    handleChange = (event)=>{
        this.setState({todo: event.target.value})
    }

    //remove event 
    remove = (event)=>{ //we already have index from map. so we can use it
        const taskArray = this.state.task
        const todoIndex = taskArray.indexOf(event.target.value)
        taskArray.splice(todoIndex, 1)
        this.setState({
            todo:"",
            task: this.state.task
        })
        
    }

    //task complete event
    done = (event)=>{
        const taskArray = this.state.task
        const todoIndex = taskArray.indexOf(event.target.value)
        const done = taskArray.splice(todoIndex, 1)
        let complete = [...this.state.completeTask]
        complete.push(done)
        this.setState({
            todo: "",
            task: taskArray,
            completeTask: complete
        })
    }

    notDone = (event)=>{
        const completeT = this.state.completeTask
        const todoIndex = completeT.indexOf(event.target.value)
        const done = completeT.splice(todoIndex, 1)
        let task = [...this.state.task]
        task.push(done)
        this.setState({
            todo: "",
            task: task,
            completeTask: completeT
        })
    }

    completeRemove=(event)=>{
        const comTaskArray = this.state.completeTask
        const todoIndex = comTaskArray.indexOf(event.target.value)
        comTaskArray.splice(todoIndex, 1)
        this.setState({
            todo:"",
            task: this.state.task
        })
    }
    render() {
        const todoJSX = this.state.task.map((todo, index)=>{
        return <div className="row" key={index}><p className="col-9 mr-4 text-left">{index+1}: {todo}</p><button className="col-1 remove-btn todo-button" onClick={this.done}>√</button>  <button className="col-1 ml-1 remove-btn todo-button" onClick={this.remove}>x</button></div>
        })
        const completeJSX = this.state.completeTask.map((todo, index)=>{
            return <div className="row" key={index}><p className="col-9 mr-4 text-left done">{index+1}: {todo}</p><button className="col-1 remove-btn todo-button" onClick={this.notDone}>^</button>  <button className="col-1 ml-1 remove-btn todo-button" onClick={this.completeRemove}>x</button></div>
            })
        return (
            <div>
                <div className="container">
                    <div className="card">
                        <h1 className="todo-title" >Todo App</h1>
                        <ul className="todo-list js-todos"></ul>
                        <form className="new-todo-form js-add-form" onSubmit={this.handleSubmit}>
                            <input type="text" name="todo" onChange={this.handleChange} className="new-todo-text js-input" value={this.state.todo}/>
                            <button className="todo-button add" type="submit">Add</button>
                        </form>
                        <h4 className="mt-4">Todo List</h4>
                        <div className="container">
                            {todoJSX}
                        </div>
                        <div className="container">
                            <h4>Completed Task</h4>
                            {completeJSX}
                        </div>
                            
                    </div>
                </div>
            </div>
        )
    }
}
