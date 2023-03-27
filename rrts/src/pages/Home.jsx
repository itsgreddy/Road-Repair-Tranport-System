import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to='/clerk'><button>Clerk</button></Link>
      <Link to='/officer'><button>Community Officer</button></Link>
      <Link to='/supervisor'><button>Supervisor</button></Link>
    </div>
  )
}

export default Home