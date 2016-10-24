import React from 'react';
import VerifyCodeInput from '../../component/verifyCodeInput';

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        lock: [],
        goods_id: '',
        name: '',
        mobile: '',
        install_address: '',
        pay_type: 'pos',
        verify_code: '',
        exception: '',
        hasRegisted: true,
        mobileOk: ''
    }

    componentDidMount() {
        document.title = '添加安装订单';
        this.getGoods();
    }

    init = () => {
        this.setState({
            name: '',
            mobile: '',
            install_address: '',
            verify_code: '',
            exception: '',
            mobileOk: ''
        });
    }

    counter = (el, s) => {
        let count = s || 60;
        let timer = setInterval(function() {
            count > 0 ? (el.text((count--)+'秒后重发'), el.attr('disabled', true)) : (clearInterval(timer), el.text('获取验证码'), el.removeAttr('disabled'));
        }, 1000);
        return {
            recover: function() {
                clearInterval(timer);
            }
        };
    }

    getGoods = () => {
        $.ajax({
            url: (window.contextPath || '') + '/api/seller/goods',
            type: 'get',
            dataType: 'json'
        }).done((res) => {
            if (res.code === 0) {
              this.setState({
                lock: res.locker,
                goods_id: res.locker[0].id
              });
            } else if(res.code === 10101) {
                window.location.href = '/login';
            } else {
                alert(res.message);
                counter.recover();
            }
        }).fail(function(error) {
            console.log(error);
        }).always(function() {});
    }

    fenpei = (e) => {
        let $btn = $(e.target);
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
        this.showSubState($btn, '提交中...', '添 加', true);

        let params = {
                mobile: this.state.mobile,
                name: this.state.name,
                goods_id: this.state.goods_id,
                install_address: this.state.install_address,
                pay_type: this.state.pay_type
            };

        $.ajax({
            url: (window.contextPath || '') + '/api/seller/order/add',
            type: 'post',
            dataType: 'json',
            data: params
        }).done((res) => {
            if (res.code === 0) {
                alert(res.message || '添加成功');
                this.init();
            } else if(res.code === 10101) {
                window.location.href = '/login';
            } else {
                alert(res.message);
            }
        }).fail(function(error) {
            console.log(error);
        }).always(() => {
            this.showSubState($btn, '提交中...', '添 加', false);
        });
    }

    userRegist = (e) => {
        let $btn = $(e.target);
        this.showSubState($btn, '提交中...', '注 册', true);
        $.ajax({
            url: (window.contextPath || '') + '/api/seller/register-homer-user',
            type: 'post',
            dataType: 'json',
            data: {
                mobile: this.state.mobile,
                verify_code: this.state.verify_code
            }
        })
        .done((res) => {
            if (res.code === 0) {
                alert(res.message || '注册成功');
                this.setState({
                    verify_code: '',
                    exception: '',
                    hasRegisted: true
                });
            } else if(res.code === 10101) {
                window.location.href = '/login';
            } else {
                alert(res.message);
            }
        })
        .fail((error) => {
            console.log(error);
        })
        .always(() => {
            this.showSubState($btn, '提交中...', '注 册', false);
        });
        
    }

    change = (type, e) => {
        this.state[type] = e.target.value;
        this.state.exception = '';
        this.state.mobileOk = '';
        this.setState({...this.state});
    }

    inviteCheck = () => {
        $.ajax({
            url: (window.contextPath || '') + '/api/seller/homer-invite-check',
            type: 'post',
            dataType: 'json',
            data: {
                mobile: this.state.mobile
            }
        })
        .done((res) => {
            if (res.code === 0) {
                this.setState({
                    hasRegisted: true,
                    mobileOk: true,
                    exception: ''
                });
            } else if(res.code === 10107) {
                this.setState({
                    hasRegisted: false,
                    mobileOk: true,
                    exception: res.message
                });
            } else {
                this.setState({
                    mobileOk: false,
                    exception: '.（⊙o⊙）.' + res.message
                });
                $('#mobile').focus();
            }
        })
        .fail((error) => {
            console.log(error);
        });
    }

    showSubState = (el, text1, text2, status) => {
        status
            ? (el.css({backgroundColor: '#ccc'}).text(text1).attr('disabled', true))
            : (el.css({backgroundColor: '#ff5a60'}).text(text2).removeAttr('disabled'));
    }

    updateStateForChild = (obj = {}) => {
        this.setState({...this.state, ...obj});
    }

    render() {
        return (
            <div className="section-page section-page-6">
                <form className="form" id="form">
                    <div className="form-item mobile-w">
                        <i className="sprite2 sprite-mobile"></i>
                        <input 
                            type="tel" 
                            id="mobile" 
                            value={this.state.mobile} 
                            placeholder="请输入用户手机号" 
                            onBlur={this.inviteCheck} 
                            onChange={this.change.bind(this, 'mobile')}
                            style={{color: this.state.mobileOk ? 'green' : (this.state.mobileOk === false) ? 'red' : ''}}
                        />
                    </div>
                    <div className="exception form-item" style={{color: this.state.mobileOk ? 'green' : (this.state.mobileOk === false) ? 'red' : ''}}>{this.state.exception}</div>
                    {
                        !this.state.hasRegisted ? 
                        (
                             <div>
                                <VerifyCodeInput 
                                    verifyCode={this.state.verify_code} 
                                    setState={this.updateStateForChild}
                                    url={'/api/seller/register-homer-user-code'}/>
                                <button type="button" className="btn btn-sub" onClick={this.userRegist}>注 册</button>
                            </div>
                        ) : (
                            <div>
                                <div className="form-item name-w">
                                    <i className="sprite2 sprite-name"></i>
                                    <input type="text" id="name" value={this.state.name} placeholder="请输入用户姓名" onChange={this.change.bind(this, 'name')}/>
                                </div>
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
                            </div>
                        )
                    }       
                </form>
            </div>
        );
    }
}

export default Order;
