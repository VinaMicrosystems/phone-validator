import React from 'react'

import PropTypes from 'prop-types'


const Loader = ({ text, children }) => (
    <div className="loader">
        {text}
        {children}
    </div>
)


Loader.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node,
}
export default Loader