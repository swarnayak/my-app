import React from 'react'
import { Link, NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav>
        <div className='row'>
          <div className='col'>
            <button>
              <NavLink to='/home' className='text-decoration-none text-start'>Patient Info</NavLink>
            </button>
          </div>

          <div className='col'>
            <button>
              <NavLink to='/login' className='text-decoration-none text-end'>Logout</NavLink>
            
            </button>

          </div>
        </div>

        {/* <LogOut user={user} setUser={setUser}/> */}
      </nav>
    </div>
  )
}
