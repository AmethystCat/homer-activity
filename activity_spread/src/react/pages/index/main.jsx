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
        promotion_code: '',
        invite_count: 0,
        order_count: 0,
        seller_count: 0
    }

    componentDidMount() {
        let isManager = $('input[name="isManager"').val() === 'true' ? true : false,
            isZB = $('input[name="isZB"]').val() === 'true' ? true : false,
            invite_count = $('input[name="invite_count"]').val(),
            order_count = $('input[name="order_count"]').val(),
            seller_count = $('input[name="seller_count"]').val(),
            promotion_code = $('input[name="promotion_code"]').val();
        this.setState({
            isManager: isManager,
            isZB: isZB,
            promotion_code: promotion_code,
            invite_count: invite_count,
            order_count: order_count,
            seller_count: seller_count
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
