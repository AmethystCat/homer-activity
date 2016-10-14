import React from 'react';
import {Link} from 'react-router';

class Associated extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Associated';
    }

    render() {
        let {isManager, isZB, inviteCode} = {...this.props.User};
        let dom_isManager_isZB = (
            <ul>
                <li><Link to="/list"><span className="item-name">人员</span><span className="quantity-people">20人<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="/add-saler"><span className="item-name">添加业务员</span><span className="quantity-lock"><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
            </ul>
        );
        let dom_isManager_notZB = (
            <ul>
                <li><Link to="/list"><span className="item-name">人员</span><span className="quantity-people">20人<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
            </ul>
        );
        let dom_notManager_notZB = (
            <ul>
                <li><Link to="/list?search=invited"><span className="item-name">已邀请</span><span className="quantity-people">20人<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="/list?search=selled"><span className="item-name">已卖出锁</span><span className="quantity-lock">10把<i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to="/add-order"><span className="item-name">添加订单</span><span className="quantity-lock"><i className="sprite sprite-icon_arrow_right"></i></span></Link></li>
                <li><Link to=""><span className="item-name">关联渠道</span><span className="channel">红旗连锁</span></Link></li>
            </ul>
          );
        return (
            <div className="as-w">
                <div className="invite-w">
                    <h3>发送您的邀请码</h3>
                    <p className="invite-code">{inviteCode}</p>
                </div>
                <div className="share-w">
                    <i className="sprite icon-share sprite-icon_friends"></i>
                    <i className="sprite icon-share sprite-icon_wx"></i>
                    <i className="sprite icon-share sprite-icon_qq"></i>
                    <i className="sprite icon-share sprite-icon_qzone"></i>
                </div>
                <div className="menu-items">
                    {(isManager && isZB) ? dom_isManager_isZB : (isManager && !isZB) ? dom_isManager_notZB : dom_notManager_notZB}
                </div>
            </div>
        );
    }
}

export default Associated;
