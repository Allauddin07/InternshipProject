import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header className='menu'>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">React</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">

              <NavItem className='item'>
                <NavLink tag={Link} className="text-dark" to="/">Customer</NavLink>
              </NavItem>
              <NavItem className='item'>
                <NavLink tag={Link} className="text-dark" to="/product">Product</NavLink>
              </NavItem>
              <NavItem className='item'>
                <NavLink tag={Link} className="text-dark" to="/store">Store</NavLink>
              </NavItem>
              <NavItem className='item'>
                <NavLink tag={Link} className="text-dark" to="/sales">Sales</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
