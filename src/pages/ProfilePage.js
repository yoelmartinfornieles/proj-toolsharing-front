
import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";
//import { Link } from "react-router-dom";
import  UserInfo  from "../components/profileComponents/UserInfo"
import axios from "axios"
import UserProducts from "../components/profileComponents/UserProducts"
import AdressConverter from "../components/AdressConverter";
import {MYNETWORK} from "../utils/paths";





function ProfilePage(){
	const { user } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState ("")
	const [showLocationForm, setShowLocationForm] = useState(false)
	let API_URL = process.env.REACT_APP_API_URL
	console.log ("USER._ID: ", user)
	let userId = user._id



	useEffect(() => {
		console.log("useEffect")
		axios
		 .get (API_URL+"/user/"+userId)
		 .then ((response)=> {
			console.log ("response: ", response)
			setUserInfo(response)
		 }
		)
	}, 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[])

	const handleShow = (e) => {
		e.preventDefault()
		setShowLocationForm(!showLocationForm)
	}
	
	const handleUnshow = (e) => {
		e.preventDefault()
		
		setShowLocationForm(!showLocationForm)
	}
	
	console.log(userInfo)
	
	if (userInfo) {

	return (
		<nav>
			<UserInfo  userInfo={userInfo}/>
			<UserProducts userInfo={userInfo}/>
			{!showLocationForm && <button onClick={handleShow}>Choose Location</button>}
			{showLocationForm && <AdressConverter id={userId} close={handleUnshow}/> }
			
		</nav>
		<>
			<nav>
				<UserInfo  userInfo={userInfo}/>
				<a className="" href={MYNETWORK}>GO TO MY NETWORK<img alt=""/></a>
				<UserProducts userInfo={userInfo}/>
			</nav>
		</>
	  );
	}
	else {
		return (
			<>
			No user information
			</>
		)
	}
}


export default ProfilePage