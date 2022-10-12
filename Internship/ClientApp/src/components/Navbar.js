import React, { Component, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

    const [state, setState] = useState({ activeItem: 'customer' })
    const navigate = useNavigate()

   


    const { activeItem } = state


    return (
        <Menu inverted>

            <Menu.Item
                name='react'
                active={activeItem === 'react'}
                onClick={(e, { name }) => {
                    navigate('/')
                    setState({
                        activeItem: name
                    })
                }}
            />
            <Menu.Item
                name='customer'
                active={activeItem === 'customer'}
                onClick={(e, { name }) => {
                    navigate('/')
                    setState({
                        activeItem: name
                    })
                }}
            />
            <Menu.Item
                name='product'
                active={activeItem === 'product'}
                onClick={(e, { name }) => {
                    navigate('/product')
                    setState({
                        activeItem: name
                    })
                }}
            />
            <Menu.Item
                name='store'
                active={activeItem === 'store'}
                onClick={(e, { name }) => {
                    navigate('/store')
                    setState({
                        activeItem: name
                    })
                }}
            />

            <Menu.Item
                name='sales'
                active={activeItem === 'sales'}
                onClick={(e, { name }) => {
                    navigate('/sales')
                    setState({
                        activeItem: name
                    })
                }}
            />
        </Menu>
    )
}
export default Navbar