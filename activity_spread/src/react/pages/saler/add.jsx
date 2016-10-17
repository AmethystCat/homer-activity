import React from 'react';

class Add extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        contextPath: ''
    }

    componentDidMount() {
        document.title = '分配邀请码';     
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
        let $mobile = $('#mobile'),
            _this = this;
        if (!$mobile.val()) {
            alert('请输入对方的手机号');
            return false;
        }
        let counter = this.counter($(e.target));
        $.ajax({
            url: _this.state.contextPath + '/api/seller/register-code',
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

    fenpei = (e) => {
        let _this = this,
            $btn = $(e.target);
        let $mobile = $('#mobile'),
            $name = $('#name'),
            $verify_code = $('#code'),
            $identification = $('#idCode');
        if (!$mobile.val()) {
            alert('请输入对方的手机号');
            return false;
        }
        if (!$name.val()) {
            alert('请输入对方的姓名');
            return false;
        }
        if (!$verify_code.val()) {
            alert('请输入验证码');
            return false;
        }
        if (!$identification.val()) {
            alert('请输入对方的身份证号码');
            return false;
        }
        this.showSubState($btn, '提交中...', '分 配', true);

        let params = {
            mobile: $mobile.val().trim(),
            name: $name.val().trim(),
            verify_code: $verify_code.val().trim(),
            identification: $identification.val().trim()
        };

        $.ajax({
            url: _this.state.contextPath + '/api/seller/register/crowd-sourcing',
            type: 'post',
            dataType: 'json',
            data: params
        })
        .done(function(res) {
            if (res.code === 0) {
                alert(res.message || '分配成功');
            } else {
                alert(res.message);
            }
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            _this.showSubState($btn, '提交中...', '分 配', false);
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
                        <input type="tel" id="mobile" placeholder="请输入对方的手机号"/>
                    </div>
                    <div className="form-item code-w">
                        <i className="sprite2 sprite-code"></i>
                        <input type="tel" id="code" placeholder="请输入对方的验证码"/>
                        <button type="button" className="btn btn-getCode" id="btn-getCode" onClick={this.getCode}>获取验证码</button>
                    </div>
                    <div className="form-item name-w">
                        <i className="sprite2 sprite-name"></i>
                        <input type="text" id="name" placeholder="请输入对方的姓名"/>
                    </div>
                    {/*<div className="form-item inviteCode-w">
                        <i className="sprite2 sprite-invite"></i>
                        <input type="tel" id="inviteCode" placeholder="请输入邀请码"/>
                    </div>*/}
                    <div className="form-item idCode-w">
                        <i className="sprite2 sprite-idcard"></i>
                        <input type="tel" id="idCode" placeholder="请输入对方的身份证号码"/>
                    </div>
                    <button type="button" className="btn btn-sub" onClick={this.fenpei}>分 配</button>
                </form>
            </div>
        );
    }
}

export default Add;
