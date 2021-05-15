import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from  '../components/Scroll';
import './App.css';

class App extends Component{
	constructor(){
		super() 
		this.state = {
			Robots: [],
			searchField:' '
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
	  	.then(response => response.json())
		.then(users => {this.setState({Robots : users})});
	}

	// this syntax binds "this" in callback
	onSearchChange = (event) => {
		this.setState({searchField : event.target.value})
	}

	render(){
		const { Robots, searchField } = this.state;
		const filteredRobots = Robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})			
		return !Robots.length ? 
			<h1>Loading...</h1> :
			(
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange = {this.onSearchChange}/>
					<Scroll>
						<CardList Robots = { filteredRobots } />
					</Scroll>
				</div>
			);
	}


};

export default App;