fetch(FETCHURL, {
  method: 'get',
  headers: new Headers({
    'Authorization': localStorage.getItem("Authorized")
  })
})
  .then(res => res.json())
  .catch(err => console.log(err))