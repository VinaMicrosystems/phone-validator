import React from 'react'
import Proptypes from 'prop-types'

const Nav = ({ children }) => (
    <nav className="nav-preview">
        <div className="row">
            <div className="col col-header">
                <ul>
                    <li>{children}</li>
                </ul>
            </div>
        </div>
    </nav>
)

Nav.propTypes = {
    children: Proptypes.node.isRequired
}
export default Nav
