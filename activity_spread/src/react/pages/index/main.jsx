import React from 'react';
import Associated from './associated';
import bg from '../../../images/bg_index_c.png';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Index';
    }

    state = {
        isManager: true,
        isZB: true,
        inviteCode: ''
    }
    
    componentDidMount() {
        this.setState({
            isManager: true,
            isZB: true,
            inviteCode: '00010001'
        });     
    }

    render() {
        return (
            <div className="section-page section-page-3">
                <img className="bg-index" src={bg} />
                    <Associated User={this.state}/>
            </div>
        );
    }
}

export default Index;
