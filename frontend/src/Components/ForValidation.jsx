const ForValidation = (data) => {
    let error={}
  if (!data.name) {
    error.name='Name is required'
  } else if(data.name.length<5){
    error.name='Name must be greater than 5'
  }

  if (!data.password) {
    error.password='Password is required'
  } else if(data.password.length<5){
    error.password='Password must be greater than 5'
  }
  return error
}

export default ForValidation
