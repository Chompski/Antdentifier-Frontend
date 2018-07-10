import React, { Component } from 'react';
import './Body.css';
import { fetchAnts } from "./API";



class Body extends Component {
    state = {
        colour: "",
        location: "",
        rating: "",
        topAnt: 1,
        middleAnt: 0,
        bottomAnt: 0,
        loading: true,
        ants: [],
        fakeAnt: { species: "", images: ["https://i.vimeocdn.com/portrait/4907835_300x300"] }
    }

    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll, true)
        fetchAnts().then(ants => {
            this.setState({ ants, loading: false })
            this.setState({ bottomAnt: this.state.ants.length - 1 })
        }).catch(() => {
            this.props.history.push('/404')
        })
    }

    onChange = event =>
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        }, () => {
        }
        )

    handleClick = (event) => {
        fetchAnts(this.state.colour, this.state.location, this.state.rating).then(ants => {
            this.setState({ ants })
            if (this.state.ants.length > 1) this.setState({ topAnt: 1, middleAnt: 0, bottomAnt: this.state.ants.length - 1 })
            else { this.setState({ topAnt: 2, middleAnt: 0, bottomAnt: 2 }) }

        })
    }

    handleScroll = (e) => {
        //down
        console.log(this.state.ants.length)
        console.log("bot", this.state.bottomAnt)
        console.log("mid", this.state.middleAnt)
        console.log("top", this.state.topAnt)
        if (e.deltaY === 3 && this.state.ants.length > 1) {

            if (this.state.bottomAnt === this.state.ants.length - 1) this.setState({ bottomAnt: 0 })
            else { this.setState({ bottomAnt: this.state.bottomAnt + 1 }) }
            if (this.state.middleAnt === this.state.ants.length - 1) this.setState({ middleAnt: 0 })
            else { this.setState({ middleAnt: this.state.middleAnt + 1 }) }
            if (this.state.topAnt === this.state.ants.length - 1) this.setState({ topAnt: 0 })
            else { this.setState({ topAnt: this.state.topAnt + 1 }) }
        }
        //up
        if (e.deltaY === -3 && this.state.ants.length > 1) {

            if (this.state.bottomAnt === 0) this.setState({ bottomAnt: this.state.ants.length - 1 })
            else { this.setState({ bottomAnt: this.state.bottomAnt - 1 }) }
            if (this.state.middleAnt === 0) this.setState({ middleAnt: this.state.ants.length - 1 })
            else { this.setState({ middleAnt: this.state.middleAnt - 1 }) }
            if (this.state.topAnt === 0) this.setState({ topAnt: this.state.ants.length - 1 })
            else { this.setState({ topAnt: this.state.topAnt - 1 }) }
        }
    }

    render() {
        const { ants, loading, bottomAnt, middleAnt, topAnt } = this.state

        let bot = ants[bottomAnt]
        if (bot === undefined) bot = this.state.fakeAnt
        let mid = ants[middleAnt]
        if (mid === undefined) mid = this.state.fakeAnt
        let top = ants[topAnt]
        if (top === undefined) top = this.state.fakeAnt

        return (
            !loading ?
                <React.Fragment>
                    <div>
                        <form className="App-Queries" align="center">
                            <div class="form-group">
                                <p> Colour </p>
                                <select name="colour" placeholder='Ant Colour' onChange={this.onChange}>
                                    <option value="">All</option>
                                    <option value="black">Black</option>
                                    <option value="red">Red</option>
                                    <option value="yellow">Yellow</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <p> Location </p>
                                <select name="location" placeholder='Ant Location' onChange={this.onChange}>
                                    <option value="">All</option>
                                    <option value="united kingdom">UK</option>
                                    <option value="europe">Europe</option>
                                    <option value="asian">Asia</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <p> Rating </p>
                                <select name="rating" onChange={this.onChange}>
                                    <option value="">All</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <input className='button' type="button" value="Search" onClick={this.handleClick} />

                        </form>
                    </div>
                    <div className="Body-Antboxes" align="center">

                        <div className="Body-Antbox">
                            <img src={bot.images[0]} alt="logo" width="100px" height="100px" className="Antbox-Image" />
                        </div>

                        <div>
                            <div align="center" className="Body-Description">
                            <h2> {mid.species} </h2>
                                <p> {mid.description} </p>
                            </div>
                            <div>
                                <img src={mid.images[0]} alt="logo" width="160px" height="160px" className="Antbox-Image" />
                            </div>
                        </div>

                        <div className="Body-Antbox">
                            <img src={top.images[0]} alt="logo" width="100px" height="100px" className="Antbox-Image" />
                        </div>

                    </div>

                </React.Fragment>
                :
                <div>
                    <p> loading.. </p>
                </div>
        );
    }
}

export default Body;