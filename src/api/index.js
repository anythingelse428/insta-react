import axios from "axios";
const Api = {
  GetUser: async()=>{
    return await axios.get("http://localhost:3000/users")
  },
  GetUserById: async (id) => {
    return await axios.get("http://localhost:3000/users/" + id);
  },
  Login: async(name,pwd,mail) =>{
    return await axios.post(

      
    )
  }
};

export default Api;
