
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

  async getNews() {
    const url = this.api_url + "news/"

    const response = await fetch(url)

    const json = await response.json()

    return json
  }

  async getArticle(id) {
    const url = this.api_url + "news/" + id + "/"

    const response = await fetch(url)

    const json = await response.json()

    return json
  }

  async getMe(token) {
    const url = this.api_url + "users/me/"
    
    const response = await fetch(url, 
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token

        }
      }
    )

    const json = await response.json()

    return json
  }
}

export class User {
  constructor(token = null, is_stuff = false) {
    this.token = token
    this._is_stuff = is_stuff
  }

  get is_authorized() {
    return this.token != null
  }

  get is_stuff() {
    return this._is_stuff
  }

  get headers() {
    return { 'Authorization': 'Token ' + this.token }
  }
}

export class AnonymousUser extends User {
  constructor() {
    super(null, false)
  }
}

export async function getUser() {
  const token = localStorage.getItem("Authorization")
  console.log(token)
  const apiManager = new ApiManager()
  let user = new AnonymousUser()

  if (token != null) {
    const _ = await apiManager.getMe(token).then((data) => {
      user = new User(token, data.is_staff)
    })
  }
  return user
}