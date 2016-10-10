import React from 'react';
import Associated from './associated';
import Associating from './associating';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Index';
    }
    state = {
        isAssociated: true
    }

    componentDidMount() {}

    render() {
        return (
            <div className="section-page section-page-3">
                <img src="/images/logo.png" />
                {this.state.isAssociated
                    ? <Associated/>
                    : <Associating/>}
            </div>
        );
    }
}

export default Index;
