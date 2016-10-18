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
        let isManager = $('input[name="isManager"').val() == '1' ? true : false,
            isZB = $('input[name="isZB"]').val() == '1' ? true : false,
            promotion_code = $('input[name="promotion_code"]').val();
        $.ajax({
            url: '/api/seller/profile',
            type: 'GET',
            dataType: 'json'
        })
        .done((res) => {
            if (res.code === 0) {
                this.setState({
                    isManager: isManager,
                    isZB: isZB,
                    promotion_code: promotion_code || 0,
                    invite_count: res.invite_count || 0,
                    order_count: res.order_count || 0,
                    seller_count: res.seller_count || 0
                });
            } else {
                alert(res.message);
            }
         })
        .fail((error) => {
            console.log(error);
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
