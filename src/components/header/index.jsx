import React from 'react';
import {ReactComponent as Logo} from '../../images/logo.svg';
import { NavItem } from '../nav-item';
import { NavMenu } from '../nav-menu';
import { FEATURES } from './constatns';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';




export const Header = () => {
	const navigate = useNavigate();

  return (
	<header className="flex items-center justify-between px-6 py-4">
	  <div className="flex items-center space-x-8">
	    <Logo
	        className="w-24 h-auto"
	        onClick={() => navigate('/')}
	        />
	    <nav className="flex items-center space-x-6">
	      <NavItem text="Features">
	        <NavMenu items={FEATURES} />
	      </NavItem>
	      <NavItem text="Profile" />
	      <NavItem text="About" />
	    </nav>
	  </div>
	
	  <div className="flex space-x-5">
	    <Button>Login</Button>
	    <Button hasBorder={true}>Register</Button>
	  </div>
</header>


  )
}
