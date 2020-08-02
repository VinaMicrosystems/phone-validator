import React from 'react'
import PropTypes from 'prop-types'

const SuccesResponse = (props) => (
    <>
        <div id="code">
            <code className="symbol">{"{"}</code><br />
            <code >"national_number": <code className="number">{props.national_number}</code>,</code><br />
            <code> "country_code": <code className="number">{props.country_code}</code>,</code><br />
            <code>"is_possible": <code className="number">{props.is_possible.toString()}</code>, </code><br />
            <code>"is_valid": <code className="number">{props.is_valid.toString()}</code>,</code><br />
            <code>  "international_formatted": <code className="string">{`"${props.international_formatted}"`},</code></code><br />
            <code>"national_formatted": <code className="string">{`"${props.national_formatted}"`}</code>,</code><br />
            <code>"version": <code className="string">{`"${props.version}"`}</code></code><br />
            <code className="symbol">{"}"}</code><br />
        </div><br />
    </>
)
const ErrResponse = (props) => (
    <div id="err">
        <code className="symbol">{"{"}</code><br />
        <code>  "message": <code className="string">{`"${props.message}"`},</code></code><br />
        <code>"Error": <code className="string">{`"${props.error}"`}</code>,</code><br />
        <code className="symbol">{"}"}</code><br />
        <br />
    </div>
)

const Preview = (props) => (
    <div className="preview">
        {
            props.national_number ?
                (<SuccesResponse {...props} />) : (<ErrResponse {...props} />)
        }
    </div>
)

const Aside = ({ responses, id }) => (
    <aside id="container">
        {responses ? (
            <div className="previews" id={id}>
                {
                    responses.map((response, key) => (
                        <Preview {...response} key={key} />)
                    )
                }
            </div>
        ) : ""
        }
    </aside>
)


Aside.propTypes = {
    responses: PropTypes.array,
    id: PropTypes.string.isRequired
}

export default Aside
