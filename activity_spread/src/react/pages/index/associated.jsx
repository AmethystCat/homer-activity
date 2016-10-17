import React from 'react';
import {Link} from 'react-router';

class Associated extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Associated';
    }

    logout = () => {
        $.ajax({
            url: '/api/seller/logout',
            type: 'post',
            dataType: 'json'
        })
        .done(function(res) {
            if (res.code === 0) {
                window.location.href = '/login';
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
        let {isManager, isZB, promotion_code} = {...this.props.User};
        let dom_isManager_isZB = (
            <ul>
                <li><Link to="/list?search=list"><span className="item-name">人员</span><span className="quantity-people">{this.props.User.seller_count}<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="/add-saler"><span className="item-name">添加业务员</span><span className="quantity-lock"><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="" onClick={this.logout}><span className="item-name">退出</span><span><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
            </ul>
        );
        let dom_isManager_notZB = (
            <ul>
                <li><Link to="/list?search=list"><span className="item-name">人员</span><span className="quantity-people">{this.props.User.seller_count}<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="" onClick={this.logout}><span className="item-name">退出</span><span><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
            </ul>
        );
        let dom_notManager_notZB = (
            <ul>
                <li><Link to="/list?search=invitee"><span className="item-name">已邀请</span><span className="quantity-peopl">{this.props.User.invite_count}<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="/list?search=orders"><span className="item-name">已卖出锁</span><span className="quantity-lock">{this.props.User.order_count}<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="/add-order"><span className="item-name">添加订单</span><span className="quantity-lock"><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="" onClick={this.logout}><span className="item-name">退出</span><span><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
            </ul>
          );
        return (
            <div className="as-w">
                <div className="invite-w">
                    <h3>发送您的邀请码</h3>
                    <p className="invite-code">{promotion_code}</p>
                </div>
                <div className="share-w">
                    <i id="wx_friends" className="sprite icon-share sprite-icon_friends"></i>
                    <i id="wx_wx" className="sprite icon-share sprite-icon_wx"></i>
                    <i id="wx_qq" className="sprite icon-share sprite-icon_qq"></i>
                    <i id="wx_qzone" className="sprite icon-share sprite-icon_qzone"></i>
                </div>
                <div className="menu-items">
                    {(isManager && isZB) ? dom_isManager_isZB : (isManager && !isZB) ? dom_isManager_notZB : dom_notManager_notZB}
                </div>
            </div>
        );
    }
}

export default Associated;
