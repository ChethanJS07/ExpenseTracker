const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique: true
  },
  email:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required:true
  }
})

// Static sign up method
userSchema.statics.signup = async function(username, email, password)
{
  //validation
  if(!username || !email || !password)
  {
    throw Error("All fields must be required");
  }
  if(!validator.isEmail(email))
  {
    throw Error("Enter a valid Email");
  }
  if(!validator.isStrongPassword(password))
  {
    throw Error("Enter a Strong Password");
  }
  const emailExists = await this.findOne({email});
  const userExists = await this.findOne({username});
  if(userExists || emailExists)
  {
    throw Error('Email or Username already in Use');
  }

  //password hashing using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({username, email, password:hash});
  return user;
}


//static login method
userSchema.statics.login = async function(username, password)
{
  if(!username || !password)
  {
    throw Error("All fields are required");
  }
  const user = await this.findOne({username});
  if(!user)
  {
    throw Error('Incorrect Username or Password');
  }
  const match = await bcrypt.compare(password,user.password);
  if(!match)
  {
    throw Error('Incorrect Username or Password');
  }
  return user
}


module.exports = mongoose.model('User',userSchema);