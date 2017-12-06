import React from "react"
import {connect} from "react-redux"

import {push, replace} from "../../main"

class Application extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: "/game/lavar"
        }
    }

    render() {
        return (<div>
            <select value={this.state.selected} onChange={(event) => {
                    this.setState({selected: event.target.value})
                }} style={{
                    margin: "0 10px"
                }}>
                <option>/game</option>
                <option>/game/lavar</option>
            </select>
            <button onClick={() => {
                    this.props.goTo(this.state.selected)
                }}>Go</button>
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
    goTo: (value) => {
        console.log("go to: ", value)
        dispatch(push("#" + value));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)
