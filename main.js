const { default: axios } = require("axios");

// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
function getTodos() {
  console.log('GET Request');
  axios.get("https://jsonplaceholder.typicode.com/todos", { params: { _limit: 5 } }).then((response) => {
    showOutput(response)
  })
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios.post("https://jsonplaceholder.typicode.com/todos", data = {
    title: "New todo",
    completed: false
  })
    .then((response) => {
      showOutput(response)
    })
    .catch(err => console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios.put("https://jsonplaceholder.typicode.com/todos/1", data = {
    title: "Updated todo",
    completed: false
  })
    .then((response) => {
      showOutput(response)
    })
    .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios.delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      showOutput(response)
    })
    .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([
    axios.get("https://jsonplaceholder.typicode.com/todos"),
    axios.post("https://jsonplaceholder.typicode.com/todos", data = {
      title: "New todo",
      completed: false
    })
  ]).then(res => {
    axios.spread((rodos, posts) => {
      showOutput(posts)
    })
  })
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
  const config = {
    headers : {
      'Content-Type' : 'application/json',
      Authorization : "sometoken"
    }

  }
  axios.post("https://jsonplaceholder.typicode.com/todos", data = {
    title: "New todo",
    completed: false
  },config)
    .then((response) => {
      showOutput(response)
    })
    .catch(err => console.log(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  const options = {
    method : "post",
    url : "https://jsonplaceholder.typicode.com/todos",
    data :{
      title : "Hello World"
    },
    transformResponse : axios.defaults.transformResponse.concat(data =>{
      data.title = data.title.toUpperCase()
      return data
    })
  }
  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios.get("https://jsonplaceholder.typicode.com/todos", { params: { _limit: 5 } }).then((response) => {
    showOutput(response)
  }).catch(err => {
    if(error.response){
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    }
    if(err.response.status == 404){
      alert("Error")
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
  const source = axios.CancelToken.source();
  axios.get("https://jsonplaceholder.typicode.com/todos", { params: { _limit: 5 } }).then((response) => {
    showOutput(response)
  }).catch(Thrown =>{
    if(axios.isCancel(Thrown)){
      console.log("REquest Cancled",Thrown.message)
    }
  })
  if (true){
    source.cancel("REquest Cancled")
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(config =>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
  return config
},
error =>{
  return Promise.reject(error)
}
)


// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL : "https://jsonplaceholder.typicode.com/todos"

})
axiosInstance.get("/comments").then((res)=>{
  console.log(res)
})

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
