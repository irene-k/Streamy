import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    //this.props.stream contains also id and userId which sould not be changed, we only need title and description 
    //this can be done by puting an object in initialvalues={ { title: this.props.stream.title, description: this.props.stram.description} }
    //or by using _.pick from lodash library

    render() {
        if (!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm initialValues={ _.pick(this.props.stream, 'title','description') } onSubmit={this.onSubmit} />
            </div>
        );
    }
}

// mapStateToProps is always being called with two arguments. 1) state, 2) ownProps = reference to the props object 
// select the apropreate stream from store, asign it to stream property and return it from mapStateToProps
// so props object will now have a stream property that contains the stream that the user is trying to edit 
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);