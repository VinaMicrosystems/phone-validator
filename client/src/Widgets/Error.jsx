import React from 'react'
import Proptypes from 'prop-types'

const Error = ({ errObj }) => (
    <div className="err">
        <code>
            Error {errObj.statusCode}
        </code><br />
        <code>
            {errObj.statusText}
        </code><br />
    </div>
)
Error.propTypes = {
    errObj: Proptypes.object.isRequired
}
export default Error