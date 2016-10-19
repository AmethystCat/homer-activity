import React from 'react';
import List from './list';

class ListController extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ListController';
    }

    componentWillMount() {
        console.log(`/api/seller/${this.props.location.query.search}`);
    }

    resMatch = (res) => {
        let o = {
            list: 'users',
            orders: 'orders',
            invitee: 'invitee'
        };
        let search = this.props.location.query.search;
        let newres = [];
        switch (o[search]) {
          case 'users':
            newres = res['users'].map((el) => {
              return {key1: el.name, key2: el.mobile};
            });
            break;
          case 'orders':
            newres = res['orders'].map((el) => {
              return {key1: el.mobile, key2: el.bought_at};
            });
            break;
          case 'invitee':
            newres = res['invitee'].map((el) => {
              return {key1: el.invitee_mobile, key2: el.invited_at};
            });
            break;
          default:
            return res;
        }
        return {...res, list: newres};
    }

    getData = (params = {}, cb = () => {}) => {
        let _this = this;
        $.ajax({
            url: (window.contextPath || '') + `/api/seller/${this.props.location.query.search}`,
            type: 'get',
            dataType: 'json',
            data: params
        })
        .done(function(res) {
            if (res.code === 0) {
                console.log(_this.resMatch(res));
                cb(_this.resMatch(res));
            } else {
                alert(res.message);
            }
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            console.log('complete');
        });
    }

    render() {
        return (
            <div className="section-page section-page-4">
                <List getData={this.getData}/>
            </div>
        );
    }
}

export default ListController;
