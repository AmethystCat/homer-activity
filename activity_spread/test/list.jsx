import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'List';
    }

    static propTypes = {
        getData: React.PropTypes.func
    };

    state = {
        Scroll: null,
        page: 1, // 当前页
        unit: 1,
        size: 100, // 每页条数
        listData: [],
        loadingTipShow: false,
        loadingTip: '加载中...'
    }

    showLoading = (el) => {
        el.show();
        $('#mask').show();
    }

    hideLoading = (el) => {
        el.hide();
        $('#mask').hide();
    }

    scrollInit = () => {
        let _this = this;
        // 初始化scroll实例
        let myScroll = new IScroll('#wrapper', {
            scrollbars: true,
            probeType: 1,
            fadeScrollbars: true
        });
        // 监听滚动事件
        myScroll.on('scroll', function(){
            if (this.y > 50) {
                _this.showLoading($('#pullDown'));
                setTimeout(() => {
                    _this.props.getData({
                        page: 1,
                        size: _this.state.size * 1
                    }, (res) => {
                        _this.setState({
                            listData: res['list'],
                            page: 1,
                            unit: 1,
                            size: _this.state.size,
                            loadingTipShow: !!res['list'].length,
                            loadingTip: !!res['list'].length ? '' : '暂无数据'
                        });
                        _this.state.Scroll.refresh();
                        _this.hideLoading($('#pullDown'));
                    });
                }, 500);
            } else {
                _this.hideLoading($('#pullDown'));
            }
        });
        // 监听滚动停止事件
        myScroll.on('scrollEnd', function(){
            if (this.scrollerHeight === this.wrapperHeight) return;
            if (this.y - this.maxScrollY < 50) {
                // hide lodingtip
                _this.setState({
                    loadingTipShow: true,
                    loadingTip: ''
                });

                _this.showLoading($('#pullUp'));
                myScroll.refresh();
                myScroll.scrollTo(0, myScroll.maxScrollY, 0);

                setTimeout(() => {
                    _this.props.getData({
                        page: 1,
                        size: _this.state.size * (++ _this.state.unit)
                    }, (res) => {
                        _this.hideLoading($('#pullUp'));
                        let list = res['list'];
                        if (_this.state.listData.length === list.length) {
                            _this.setState({
                                loadingTipShow: !(!!res['list'].length),
                                loadingTip: !!res['list'].length ? '已加载全部数据' : ''
                            });
                            return;
                        }
                        _this.setState({
                            listData: list,
                            unit: ++ _this.state.unit,
                            loadingTipShow: !!res['list'].length,
                            loadingTip: !!res['list'].length ? '' : '暂无数据'
                        });
                    });
                }, 500);
            } else {
                _this.hideLoading($('#pullUp'));
            }
        });

        return myScroll;
    }

    componentDidMount() {
        let scroller = this.scrollInit(),
            params = {
                page: this.state.page,
                size: this.state.size * this.state.unit
            };
        this.props.getData(params, (res) => {
            this.setState({
                Scroll: scroller,
                listData: res['list'],
                loadingTipShow: !!res['list'].length,
                loadingTip: !!res['list'].length ? '' : '暂无数据'
            });
            this.state.Scroll.refresh();
        });
    }

    componentWillUnmount() {
        this.state.Scroll.destroy();
    }

    render() {
        const listData = this.state.listData;
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
                                {listData.map((el, index) => {
                                    return (
                                        <li key={'u_' + index}><span className="mobile">{el.key1}</span><span className="time">{el.key2}</span></li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="scroller-op scroller-pullUp" id="pullUp">
                            <div className="loader">
                                <div className="arc"></div>
                            </div>
                            <span className="loading-tip">数据加载中</span>
                        </div>
                        {!this.state.loadingTipShow ? (
                            <div className="scroller-op" style={{'display': 'block'}} id="pullTip">
                                <span className="loading-tip">{this.state.loadingTip}</span>
                            </div>
                        ): ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
