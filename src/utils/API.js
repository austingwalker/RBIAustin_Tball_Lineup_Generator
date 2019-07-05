import axios from "axios";

export default {
  // Gets all volunteers
  getVolunteers: function() {
    return axios.get("/api/volunteers");
  },
  //  Gets all coaches
   getCoaches: function() {
     console.log("Get coaches in API hit")
    return axios.get("/api/coaches");
  },

getGameday: function() {
  console.log("Get getGameday in API hit")
 return axios.get("/api/gameday");
},
getFieldm: function() {
  console.log("Get getFieldm in API hit")
 return axios.get("/api/fieldm");
},
getUmpires: function() {
  console.log("Get getUmpires in API hit")
 return axios.get("/api/umpires");
},
getTeamp: function() {
  console.log("Get getTeamp in API hit")
 return axios.get("/api/teamp");
},
getMentors: function() {
  console.log("Get getMentors in API hit")
 return axios.get("/api/mentors");
},
getBenefit: function() {
  console.log("Get getBenefit in API hit")
 return axios.get("/api/benefit");
},
getStaff: function() {
  console.log("Get getStaff in API hit")
 return axios.get("/api/staff");
},
  // Gets the volunteer with the given id
  getVolunteer: function(id) {
    return axios.get("/api/volunteers/" + id);
  },
  // Deletes the volunteer with the given id
  deleteVolunteer: function(id) {
    return axios.delete("/api/volunteers/" + id);
  },
  updateVolunteer: function(volunteerData) {
    console.log("Put updateVol in API hit")
    return axios.put("/api/update", volunteerData);
  },
  // Saves a volunteer to the database
  saveVolunteer: function(volunteerData) {
    return axios.post("/api/volunteers", volunteerData);
  },

  signupVolunteer: function(volunteerData) {
    return axios.post("/api/signup", volunteerData);
  },

  loginVolunteer: function(credentials) {
    return axios.post("/api/login/", credentials);
  }
};
