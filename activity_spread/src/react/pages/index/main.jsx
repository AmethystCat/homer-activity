import React from 'react';
import Associated from './associated';
import bg from 'images/bg_index_c.png';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Index';
    }

    render() {
        return (
            <div className="section-page section-page-3">
                <img className="bg-index" src={bg} />
                    <Associated />
            </div>
        );
    }
}

export default Index;
