import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTools } from '../../utils/actions';
import SearchForm from './SearchForm';



const ToolList = props => {
    useEffect(() => {
        props.fetchTools();
    }, [])

    if (props.isFetching) {
        return (
            <p>Loading Tool List...</p>
        )
    } else {
        return (
                <div>
                    <SearchForm />
                </div>
        );             
    }
}        
    
const mapStateToProps = state => {
    return {
        tools: state.tools,
        isFetching: state.isFetching
    }
}

export default connect(mapStateToProps, { fetchTools })(ToolList);
