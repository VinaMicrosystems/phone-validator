import React from 'react'



export const Header = (props) => (
    <header className="mast-head ">
        <div className="flexbox row">
            {props.children}
        </div>
    </header>

)


export default Header
