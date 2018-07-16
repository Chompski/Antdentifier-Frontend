import React, { Component } from 'react';
import './Body.css';
import { fetchAnts } from "./API";
import { random } from "lodash"
import Ant from './ant head.gif'
import Loading from './loading.png'
import up from './arrowUp.png'
import down from './arrowDown.png'


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
        fakeAnt: { species: "No ants found meeting your criteria..", images: [Ant, Ant, Ant], location: "N/A", hibernation: "N/A", nestTemperature: "N/A", diet: "N/A", life: "N/A" }
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
        }, () => {}
        )

    handleClick = () => {
        fetchAnts(this.state.colour, this.state.location, this.state.rating).then(ants => {
            this.setState({ ants })
            if (this.state.ants.length > 1) this.setState({ topAnt: 1, middleAnt: 0, bottomAnt: this.state.ants.length - 1 })
            else { this.setState({ topAnt: 2, middleAnt: 0, bottomAnt: 2 }) }
        })
    }

    handleClickRandom = () => {
        
        let randomAnt = random(this.state.ants.length-1)
        while (randomAnt === this.state.middleAnt) { randomAnt = random(this.state.ants.length-1) }

        this.setState({ middleAnt: randomAnt })

        if (this.state.ants[randomAnt - 1] === undefined) {
            this.setState({ bottomAnt: this.state.ants.length - 1 })
        }
        else { this.setState({ bottomAnt: randomAnt - 1 }) }

        if (this.state.ants[randomAnt + 1] === undefined) {
            this.setState({ topAnt: 0 })
        }
        else { this.setState({ topAnt: randomAnt + 1 }) }
    }

    handleScroll = (e) => {
        //down
        if ((e.deltaY === 3 && this.state.ants.length > 1) || (e.target.alt === "down" && this.state.ants.length > 1)) {

            if (this.state.bottomAnt === this.state.ants.length - 1) this.setState({ bottomAnt: 0 })
            else { this.setState({ bottomAnt: this.state.bottomAnt + 1 }) }
            if (this.state.middleAnt === this.state.ants.length - 1) this.setState({ middleAnt: 0 })
            else { this.setState({ middleAnt: this.state.middleAnt + 1 }) }
            if (this.state.topAnt === this.state.ants.length - 1) this.setState({ topAnt: 0 })
            else { this.setState({ topAnt: this.state.topAnt + 1 }) }
        }
        //up
        if ((e.deltaY === -3 && this.state.ants.length > 1) || (e.target.alt === "up" && this.state.ants.length > 1)) {

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
                        <form className="App-Queries">
                            <div class="form-group">
                                <div align="center">
                                    <p><b>Colour</b></p>
                                </div>
                                <select name="colour" onChange={this.onChange} className="form-dropdown">
                                    <option value="">All</option>
                                    <option value="black">Black</option>
                                    <option value="red">Red</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="brown">Brown</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div align="center">
                                    <p><b>Location</b></p>
                                </div>
                                <select name="location" onChange={this.onChange} className="form-dropdown">
                                    <option value="">All</option>
                                    <option value="United Kingdom">UK</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Asia">Asia</option>
                                    <option value="America">America</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <div align="center">
                                    <p><b>Rating</b></p>
                                </div>
                                <select name="rating" onChange={this.onChange} className="form-dropdown">
                                    <option value="">All</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input className='button' type="button" value="Search" onClick={this.handleClick} />
                            </div>
                        </form>
                    </div>

                    <div className="Body-Antboxes" align="center">
                        <div className="Body-Antbox">
                            <img src={bot.images[0]} alt="logo" width="100px" height="100px" className="Antbox-Image" />
                        </div>
                        <div>
                            <div align="center" className="Body-List">
                                <p>Results</p>
                                <h2> <b>{this.state.ants.length}</b> </h2>
                            </div>
                            <div align="center" className="Body-Description" >
                                <h2> {mid.species} </h2>
                                <p className="Body-Description-Text"> {mid.description} </p>
                            </div>
                            <div align="center" className="Body-Info">
                                <h3> Location:</h3>
                                <p> {mid.location} </p>
                                <h3> Hibernation:</h3>
                                <p> {mid.hibernation} </p>
                                <h3> Nest Temperature:</h3>
                                <p> {mid.nestTemperature} </p>
                                <h3> Diet:</h3>
                                <p> {mid.diet} </p>
                                <h3> Life span of queen:</h3>
                                <p> {mid.life} </p>
                                <h3> Keeping difficulty rating:</h3>
                                <p><b>{mid.rating}</b></p>
                            </div>
                            <div align="center" className="Body-Images">
                                <a href={mid.images[1]} target="_blank"> <img src={mid.images[1]} alt="ant one" width="180px" height="180px" className="Body-Image" /></a>
                                <a href={mid.images[2]} target="_blank"> <img src={mid.images[2]} alt="ant one" width="180px" height="180px" className="Body-Image" /></a>
                            </div>

                            <div align="center" className="Body-Arrows">
                                <img src={up} alt="up" width="80px" height="80px" className="Body-Arrow" onClick={this.handleScroll} />
                                <img src={down} alt="down" width="80px" height="80px" className="Body-Arrow" onClick={this.handleScroll} />
                            </div>

                            <div>
                                <img src={mid.images[0]} alt="logo" width="180px" height="180px" className="Antbox-ImageMid" />
                            </div>
                        </div>

                        <div className="Body-Antbox">
                            <img src={top.images[0]} alt="logo" width="100px" height="100px" className="Antbox-Image" />
                        </div>

                        <div>
                            {ants.length > 3 && <input className="Body-Random" type="button" value="Random Ant" onClick={this.handleClickRandom} />}
                        </div>

                    </div>

                </React.Fragment>
                :
                <div className="App-Loading">
                    <img src={Loading} alt="Loading..." />
                </div>
        );
    }
}

export default Body;