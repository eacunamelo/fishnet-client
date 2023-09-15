export default class LocalStorageService {
	static setApiProfile = (obj) => {
		localStorage.setItem('api_profile', JSON.stringify(obj))
	}

	static getApiProfile = () => {
		return JSON.parse(localStorage.getItem('api_profile'))
	}

	static setUserProfile = (obj) => {
		localStorage.setItem('user_profile', JSON.stringify(obj))
	}

	static getUserProfile = () => {
		return JSON.parse(localStorage.getItem('user_profile'))
	}

	static clear = () => {
		localStorage.clear()
	}
}