import logoOne from "../assets/logo-one.png";
import logoTwo from "../assets/logo-two.png";
import logoThree from "../assets/logo-three.png";
import logoFour from "../assets/logo-four.png";
import logoFive from "../assets/logo-five.png";

export const users = [
  {
    email: "a@gmail.com",
    password: "123",
    name: "Aman Verma",
    institutes: [],
    roles: []
  },

  {
    email: "ayushl@gmail.com",
    password: "123",
    name: "Ayush Lolusare",
    institutes: [
      {
        name: "Delhi Public School",
        city: "Nagpur",
        state: "Maharashtra",
        type: "School",
        logo: logoOne
      }
    ],
    roles: ["Student"]
  },

  {
    email: "divyanshu@gmail.com",
    password: "123",
    name: "Divyanshu Thakrey",
    institutes: [
      {
        name: "MIT World Peace University",
        city: "Pune",
        state: "Maharashtra",
        type: "University",
        logo: logoTwo
      }
    ],
    roles: ["Admin", "Faculty"]
  },

  {
    email: "ayush@gmail.com",
    password: "123",
    name: "Ayush Nakade",
    institutes: [
      {
        name: "St. Xavier's College",
        city: "Mumbai",
        state: "Maharashtra",
        type: "College",
        logo: logoOne
      },
      {
        name: "Christ University",
        city: "Bangalore",
        state: "Karnataka",
        type: "University",
        logo: logoTwo
      },
      {
        name: "Delhi Public School",
        city: "Delhi",
        state: "Delhi",
        type: "School",
        logo: logoThree
      },
      {
        name: "NIIT Training Center",
        city: "Hyderabad",
        state: "Telangana",
        type: "Training",
        logo: logoFour
      },
      {
        name: "Amity University",
        city: "Noida",
        state: "Uttar Pradesh",
        type: "University",
        logo: logoFive
      }
    ],
    roles: ["Admin", "Faculty", "Staff"]
  },

  {
    email: "pratik@gmail.com",
    password: "123",
    name: "Pratik Patil",
    institutes: [
      {
        name: "Kendriya Vidyalaya",
        city: "Nagpur",
        state: "Maharashtra",
        type: "School",
        logo: logoOne
      },
      {
        name: "Ramdeobaba College of Engineering",
        city: "Nagpur",
        state: "Maharashtra",
        type: "College",
        logo: logoThree
      },
      {
        name: "Aptech Learning Center",
        city: "Nagpur",
        state: "Maharashtra",
        type: "Training",
        logo: logoFour
      }
    ],
    roles: ["Student"]
  }
];