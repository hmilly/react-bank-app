import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "./pages/styles/App.css";
import "./pages/styles/headers.css";
import "./pages/styles/login.css";
import "./pages/styles/transactions.css";
import "./pages/styles/wallet.css";

import Mainheader from "./pages/components/Mainheader"
import Loginheader from "./pages/components/Loginheader"

import LoginPage from "./pages/components/Loginpage"
import Signup from "./pages/components/Signup";

import Wallet from "./pages/components/Wallet";
import WalletType from "./pages/components/WalletType";

import Transactions from "./pages/components/Transactions"
import ToggleDisplay from './pages/components/ToggleDisplay'
import Settings from "./pages/components/Settings"


function App() {

	const todayObj = new Date();
	let day = todayObj.getDate();
	let month = todayObj.getMonth() + 1;
	const year = todayObj.getFullYear();
	if (day < 10) { day = `0${day}` }
	if (month < 10) { month = `0${month}` }
	const today = `${day}/${month}/${year}`;

	const [user, setUser] = useState({})

	const updateUser = (user) => {
		setUser(user)
		console.log(user)
	}

	const newUser = async (userDetails) => {
		const u = {
			...userDetails,
			"balance": 10,
			"savingsBal": 0,
			"loansBal": -0,
			"transactions": [],
			"savingTran": [],
			"loansTran": []
		}
		const configObject = await {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(u),
		};
		await fetch(`http://localhost:8080/users`, configObject)
			.then((res) => (res.ok ? res.json() : "Oops we couldn't update that!"))
			.then(res => setAllUsers([...allUsers, u]))
			.catch((error) => console.log(error));
	};

	const [allUsers, setAllUsers] = useState([])
	useEffect(() => {
		const getUsers = () => {
			fetch('http://localhost:8080/users')
				.then(res => res.json())
				.then(res => setAllUsers(res))
				.catch((error) => console.log(error));
		}
		getUsers()
	}, [])

	return (
		<>
			<div className="App">
				<Switch>
					<Route exact path="/" >
						<Loginheader />
						<LoginPage updateUser={updateUser} user={user} allUsers={allUsers} />
					</Route>
					<Route path="/signup">
						<Loginheader />
						<Signup updateUser={updateUser} user={user} newUser={newUser} allUsers={allUsers} />
					</Route>
					<Route path="/wallet">
						<Mainheader Settings={Settings} />
						<Wallet
							updateUser={updateUser}
							user={user}
							today={today}
							ToggleDisplay={ToggleDisplay}
							Transactions={Transactions} />
					</Route>
					<Route path="/savings">
						<Mainheader Settings={Settings} />
						<WalletType
							name={"savings"}
							updateUser={updateUser}
							user={user}
							today={today}
							ToggleDisplay={ToggleDisplay}
							Transactions={Transactions} />
					</Route>
					<Route path="/loans">
						<Mainheader Settings={Settings} />
						<WalletType
							name={"loans"}
							updateUser={updateUser}
							user={user}
							today={today}
							ToggleDisplay={ToggleDisplay}
							Transactions={Transactions} />
					</Route>
				</Switch>
			</div>
		</>
	)
}

export default App;