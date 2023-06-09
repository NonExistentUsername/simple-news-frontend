
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

  async getNews(page = 1, created_by = null, is_published = null, user = null, content = null) {
    let url = this.api_url + "news/?page=" + page

    if (created_by != null)
      url += "&created_by=" + created_by

    if (is_published != null)
      url += "&is_published=" + is_published
    else
      url += "&is_published="

    if (content != null)
      url += "&content=" + content

    let headers = {}
    if (user != null)
      headers = user.headers
      console.log(headers)

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    })

    const json = await response.json()

    return json
  }

  async getArticle(id, user = null) {
    const url = this.api_url + "news/" + id + "/"

    let headers = {}
    if (user != null)
      headers = user.headers
    
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    })

    const json = await response.json()

    return json
  }

  async getMe(token) {
    const url = this.api_url + "users/me/"
    
    const response = await fetch(url, 
      {
        method: "GET",
        headers: {
          "Authorization": "Token " + token

        }
      }
    )

    const json = await response.json()

    return json
  }

  async createNews(title, content, is_published, user) {
    const url = this.api_url + "news/"

    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('is_published', is_published);
    formData.append('created_by', user.username);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: user.headers
    })

    const json = await response.json()

    return json
  }

  async updateNews(id, title, content, is_published, is_banned, user) {
    const url = this.api_url + "news/" + id + "/"

    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('is_published', is_published);
    formData.append('created_by', user.username);

    if (is_banned != null)
      formData.append('is_banned', is_banned);

    const response = await fetch(url, {
      method: "PUT",
      body: formData,
      headers: user.headers
    })

    const json = await response.json()

    return json
  }
}

export class User {
  constructor(token = null, is_staff = false, username = null, email = null, id = null) {
    this.token = token
    this.is_staff = is_staff
    this.username = username
    this.email = email
    this.id = id
  }

  get is_authorized() {
    return this.token != null
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
      user = new User(token, data.is_staff, data.username, data.email, data.id)
    })
  }
  return user
}