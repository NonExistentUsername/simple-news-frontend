
export class ApiManager {
  constructor() {
    this.api_url = "http://0.0.0.0:8000/api/"
  }
  
  async login(username, password) {
    const url = this.api_url + "auth/login/"

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    const json = await response.json()

    return json
  }

  async register(username, email, password) {
    const url = this.api_url + "auth/register/"

    let formData = new FormData();
    formData.append('username', username);
    if (email)
      formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    const json = await response.json()

    return json
  }
}

export class User {
  constructor(token = null) {
    this.token = token
  }

  get is_authorized() {
    return this.token != null
  }

  get headers() {
    return { 'Authorization': 'Bearer ' + this.token }
  }
}

export function getUser() {
  return new User(localStorage.getItem('Authorization'))
}