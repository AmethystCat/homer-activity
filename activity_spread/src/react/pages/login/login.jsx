import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
    }
    render() {
        return (
        	<div className="section-page section-page-1">
        		<img src="/images/logo.png" alt="荷马智能锁，开启硬件免费新时代！" className="logo" />	
		<form className="form" id="form">
			<div className="form-item invite-w">
				<div className="code-tip">
					<span>邀请码：</span>
					<span className="invite-code">123321</span>
				</div>
				<div className="tip">
					132****1332 邀请您加入荷马生活!
				</div>
			</div>
			<div className="form-item input-w mobile-w">
				<input type="tel" id="mobile" placeholder="请输入您的手机号" />
			</div>
			<div className="form-item input-w authCode-w">
				<input type="tel" id="auth-code" placeholder="请输入验证码" />
				<button type="button" className="btn btn-getCode">获取验证码</button>
			</div>
			<div className="form-item input-w pass-w">
				<input type="password" id="password" placeholder="请输入密码" />
				<button type="button" title="eyes" className="btn btn-eye"><i className="sprite sprite-eye_close"></i></button>
			</div>
			<div className="form-item check-w agreement-w">
				<label htmlFor="agree">
					<input type="checkbox" id="isAgree" checked="checked" readOnly />
					同意注册协议
				</label>
			</div>
			<button type="button" className="btn btn-red btn-regist">注 册</button>
			<a className="intro-link" href="https://prod.homer.com.cn/api/banner/lock/introduce/popularize">了解更多智能锁介绍</a>
		</form>		
        	</div>
        );
    }
}

export default Login;
