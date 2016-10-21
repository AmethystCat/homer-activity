import React from 'react';

class VerifyCodeInput extends React.Component {
    constructor(props) {
        super(props);
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
            url: (window.contextPath || '') + this.props.url,
            type: 'post',
            dataType: 'json',
            data: {mobile: $mobile.val().trim()}
        })
        .done(function(res) {
            if (res.code === 0) {
                alert('验证码已发送，请注意查收');
            } else if(res.code === 10101) {
                window.location.href = '/login';
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

    change = (e) => {
        this.props.setState && this.props.setState({
            verify_code: e.target.value
        });
    }

    render() {
        return (
            <div className="form-item verify-code-w">
                <input type="text" id="verify_code" value={this.props.verifyCode} placeholder="请输入验证码" onChange={this.change}/>
                <button className="btn btn-getCode" onClick={this.getCode}>获取验证码</button>
            </div>
        );
    }
}
export default VerifyCodeInput;