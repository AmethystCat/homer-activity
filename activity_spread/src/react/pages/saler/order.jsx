import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        contextPath: '',
        lock: [],
        goods_id: '',
        name: '',
        mobile: '',
        install_address: '',
        pay_type: 'pos'
    }

    componentDidMount() {
        document.title = '添加安装订单';
        this.getGoods();
    }

    getGoods = () => {
        $.ajax({
            url: this.state.contextPath + '/api/seller/goods',
            type: 'get',
            dataType: 'json'
        }).done((res) => {
            if (res.code === 0) {
              this.setState({
                lock: res.locker,
                goods_id: res.locker[0].id
              });
            } else {
                alert(res.message);
                counter.recover();
            }
        }).fail(function(error) {
            console.log(error);
        }).always(function() {});
    }

    fenpei = (e) => {
        let _this = this,
            $btn = $(e.target);
        if (!this.state.mobile) {
            alert('请输入对方的手机号');
            return false;
        }
        if (!this.state.name) {
            alert('请输入对方的姓名');
            return false;
        }
        if (!this.state.install_address) {
            alert('请输入安装地址');
            return false;
        }
        this.showSubState($btn, '提交中...', '分 配', true);

        let params = {
                mobile: this.state.mobile,
                name: this.state.name,
                goods_id: this.state.goods_id,
                install_address: this.state.install_address,
                pay_type: this.state.pay_type
            };

        $.ajax({
            url: this.state.contextPath + '/api/seller/order/add',
            type: 'post',
            dataType: 'json',
            data: params
        }).done(function(res) {
            if (res.code === 0) {
                alert(res.message || '分配成功');
            } else {
                alert(res.message);
            }
        }).fail(function(error) {
            console.log(error);
        }).always(function() {
            _this.showSubState($btn, '提交中...', '分 配', false);
        });
    }

    change = (type, e) => {
        this.state[type] = e.target.value;
        this.setState({...this.state});
    }

    showSubState = (el, text1, text2, status) => {
        status
            ? (el.css({backgroundColor: '#ccc'}).text(text1))
            : (el.css({backgroundColor: '#ff5a60'}).text(text2));
    }

    render() {
        return (
            <div className="section-page section-page-6">
                <form className="form" id="form">
                    <div className="form-item mobile-w">
                        <i className="sprite2 sprite-mobile"></i>
                        <input type="tel" id="mobile" value={this.state.mobile} placeholder="请输入对方的手机号" onChange={this.change.bind(this, 'mobile')}/>
                    </div>
                    <div className="form-item name-w">
                        <i className="sprite2 sprite-name"></i>
                        <input type="text" id="name" value={this.state.name} placeholder="请输入对方的姓名" onChange={this.change.bind(this, 'name')}/>
                    </div>
                    {/*<div className="form-item inviteCode-w">
                        <i className="sprite2 sprite-invite"></i>
                        <input type="tel" id="inviteCode" placeholder="请输入邀请码"/>
                    </div>*/}
                    {/*}<div className="form-item idCode-w">
                        <i className="sprite2 sprite-idcard"></i>
                        <input type="tel" id="idCode" placeholder="请输入对方的身份证号码"/>
                    </div>*/}
                    <div className="form-item color-w">
                        <select id="lockColor" value={this.state.goods_id} onChange={this.change.bind(this, 'goods_id')}>
                            {
                                this.state.lock.map((el, index) => {
                                    return (
                                        <option key={index} value={el.id}>{el.color_title}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form-item color-w">
                        <select id="payType" value={this.state.pay_type} onChange={this.change.bind(this, 'pay_type')}>
                            <option value="cash">现金</option>
                            <option value="pos">pos机</option>
                        </select>
                    </div>
                    <div className="form-item address-w">
                        <textarea id="address" placeholder="请输入安装地址" value={this.state.install_address} onChange={this.change.bind(this, 'install_address')}/>
                    </div>
                    <button type="button" className="btn btn-sub" onClick={this.fenpei}>添 加</button>
                </form>
            </div>
        );
    }
}

export default Order;
