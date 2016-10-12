import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'List';
    }

    state = {
        Scroll: null
    }

    showLoading = (el) => {
        el.show();
        $('#mask').show();
    }

    hideLoading = (el) => {
        el.hide();
        $('#mask').hide();
    } 

    componentDidMount() {
        let _this = this;
        let myScroll = new IScroll('#wrapper', {
            scrollbars: true,
            probeType: 1,
            fadeScrollbars: true
        });
        myScroll.on('scroll', function(){
            if (this.y > 50) {
                _this.showLoading($('#pullDown'));
            } else {
                _this.hideLoading($('#pullDown'));
            }
            
        });
        myScroll.on('scrollEnd', function(){
            console.log(this.y - this.maxScrollY);
            if (this.y - this.maxScrollY < 50) {
                _this.showLoading($('#pullUp'));
                myScroll.refresh();
                myScroll.scrollTo(0, myScroll.maxScrollY, 0);
            } else {
                _this.hideLoading($('#pullUp'));
            }
        });
        
        this.setState({
            Scroll: myScroll
        });
    }
    
    componentWillUnmount() {
        this.state.Scroll.destroy();
    }

    render() {
        return (
            <div className="section-page section-page-4">
                <div id="wrapper" className="list-w">
                    <div id="scroller">
                        <div className="scroller-op scroller-pullDown" id="pullDown">
                            <div className="loader">
                                <div className="arc"></div>
                            </div>
                            <span className="loading-tip">下拉刷新</span>
                        </div>
                        <div className="scroller-content" id="content">
                            <ul>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                                <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                            </ul>
                        </div>
                        <div className="scroller-op scroller-pullUp" id="pullUp">
                            <div className="loader">
                                <div className="arc"></div>
                            </div>
                            <span className="loading-tip">数据加载中</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
