import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		lat: null,
	// 		errorMessage: ''
	// 	};
	// }

	state = {lat:null, errorMessage: ''};

	componentDidMount(){
		console.log('component did mount!')
		window.navigator.geolocation.getCurrentPosition(
			position => this.setState({lat: position.coords.latitude}),
			err => this.setState({errorMessage: err.message})
		);
	}

	componentDidUpdate(){
		console.log('My component was just updated - it rerendered!');
	}

	renderContent(){
		if (this.state.errorMessage && !this.state.lat) {
			return (
				<div>Error: {this.state.errorMessage}</div>
			)
		}

		if (!this.state.errorMessage && this.state.lat) {
			return (
				<SeasonDisplay lat={this.state.lat}/>
			)
		}

		return (
			<Spinner message="Please accept location request"/>
		)
	}

	render(){
		return (
			<div className="border red">
				{this.renderContent()}
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
