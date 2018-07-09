import React, { Component } from 'react';
import './App.css';
import { fetchAnts } from "./API"

class SearchBody extends Component {
    state = {
        colour: "",
        location: "",
        rating: "",
        loading:true,
        ants: []
    }

    componentDidMount() {
            fetchAnts().then(ants => {
                this.setState({ ants, loading: false })
            }).catch(() => {
                this.props.history.push('/404')
            })
        }
        

    onChange = event =>
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        }, () => {
            console.log(this.state);
        }
        )

    handleClick = () => {
        fetchAnts(this.state.colour, this.state.location, this.state.rating).then(ants => {
            this.setState({ ants })
            console.log(this.state)
        })
    }

    render() {
        return (
            <div className="App-Body">
                <div className="App-Queries">
                    <form >
                        <div class="form-group">
                            <select name="colour" placeholder='Ant Colour' onChange={this.onChange}>
                                <option value="black">Black</option>
                                <option value="red">Red</option>
                                <option value="yellow">Yellow</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select name="location" placeholder='Ant Location' onChange={this.onChange}>
                                <option value="united kingdom">United kingdom</option>
                                <option value="europe">Europe</option>
                                <option value="asian">Asia</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="Username" >Keeping Difficulty:</label>
                            <input type="radio" name="rating" value="1" checked="checked" onChange={this.onChange} /> 1
                            <input type="radio" name="rating" value="2" onChange={this.onChange} /> 2
                            <input type="radio" name="rating" value="3" onChange={this.onChange} /> 3
                            <input type="radio" name="rating" value="4" onChange={this.onChange} /> 4
                            <input type="radio" name="rating" value="5" onChange={this.onChange} /> 5
                        </div>
                        <input className='button' type="button" value="Search" onClick={this.handleClick} />
                    </form>
                    <p>{this.state.ants.length}</p>
                </div>
            </div>
        );
    }
}

export default SearchBody;