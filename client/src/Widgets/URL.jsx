import React from 'react'
import PropTypes from 'prop-types'

const URLPrev = ({ phone, country, copiedUrl }) => (
    <div className="preview-url col content-header">
        <span id="url">
            {`https://www.phone-validator.herokuapp.com/api?phone=${phone}&country=${country}`}
        </span>
        <button className="clip" data-clipboard-target="#url">{copiedUrl ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-clipboard" aria-hidden="true"></i>}</button>
    </div>
)

URLPrev.propTypes = {
    phone: PropTypes.string,
    country: PropTypes.string,
    copiedUrl: PropTypes.bool.isRequired
}

export default URLPrev
