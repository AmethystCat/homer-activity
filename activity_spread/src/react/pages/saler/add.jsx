import React from 'react';

class Add extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        mobile: '',
        name: '',
        verify_code: '',
        identification: ''
    }

    componentDidMount() {
        document.title = '分配邀请码';     
    }

    init = () => {
        this.setState({
            mobile: '',
            name: '',
            verify_code: '',
            identification: ''
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

    getCode = (e) => {
        let $mobile = $('#mobile');
        if (!$mobile.val()) {
            alert('请输入对方的手机号');
            return false;
        }
        let counter = this.counter($(e.target));
        $.ajax({
            url: (window.contextPath || '') + '/api/seller/register-code',
            type: 'post',
            dataType: 'json',
            data: {mobile: $mobile.val().trim()}
        })
        .done(function(res) {
            if (res.code === 0) {
                alert('验证码已发送，请注意查收');
            } else {
                alert(res.message);
                counter.recover();
            }
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {});
    }

    change = (key, e) => {
        this.state[key] = e.target.value;
        this.setState({...this.state});
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
        if (!this.state.verify_code) {
            alert('请输入验证码');
            return false;
        }
        if (!this.state.identification) {
            alert('请输入对方的身份证号码');
            return false;
        }
        this.showSubState($btn, '提交中...', '分 配', true);

        let params = {
            mobile: this.state.mobile.trim(),
            name: this.state.name.trim(),
            verify_code: this.state.verify_code.trim(),
            identification: this.state.identification.trim()
        };

        $.ajax({
            url: (window.contextPath || '') + '/api/seller/register/crowd-sourcing',
            type: 'post',
            dataType: 'json',
            data: params
        })
        .done((res) => {
            if (res.code === 0) {
                alert(res.message || '分配成功');
                this.init();
            } else {
                alert(res.message);
            }
        })
        .fail((error) => {
            console.log(error);
        })
        .always(() => {
            this.showSubState($btn, '提交中...', '分 配', false);
        });
    }

    showSubState = (el, text1, text2, status) => {
        status ? (el.css({backgroundColor: '#ccc'}).text(text1).attr('disabled', true)) : (el.css({backgroundColor: '#ff5a60'}).text(text2).removeAttr('disabled'));
    }

    render() {
        return (
            <div className="section-page section-page-5">
                <form className="form" id="form">
                    <div className="form-item mobile-w">
                        <i className="sprite2 sprite-mobile"></i>
                        <input type="tel" id="mobile" placeholder="请输入对方的手机号" value={this.state.mobile} onChange={this.change.bind(this, 'mobile')}/>
                    </div>
                    <div className="form-item code-w">
                        <i className="sprite2 sprite-code"></i>
                        <input type="tel" id="code" placeholder="请输入对方的验证码" value={this.state.verify_code} onChange={this.change.bind(this, 'verify_code')}/>
                        <button type="button" className="btn btn-getCode" id="btn-getCode" onClick={this.getCode}>获取验证码</button>
                    </div>
                    <div className="form-item name-w">
                        <i className="sprite2 sprite-name"></i>
                        <input type="text" id="name" placeholder="请输入对方的姓名" value={this.state.name} onChange={this.change.bind(this, 'name')}/>
                    </div>
                    <div className="form-item idCode-w">
                        <i className="sprite2 sprite-idcard"></i>
                        <input type="tel" id="idCode" placeholder="请输入对方的身份证号码" value={this.state.identification} onChange={this.change.bind(this, 'identification')} />
                    </div>
                    <button type="button" className="btn btn-sub" onClick={this.fenpei}>分 配</button>
                </form>
            </div>
        );
    }
}

export default Add;
