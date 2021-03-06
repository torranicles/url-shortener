var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.changeHandler = function (e) {
            _this.setState({
                url: e.target.value
            });
        };

        _this.submitHandler = function (e) {
            e.preventDefault();
            fetch('/api/shorturl/new', {
                method: 'POST',
                body: new URLSearchParams(_this.state),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                return _this.setState({
                    short_url: 'https://weefyurl.herokuapp.com/' + data.short_url,
                    error: data.error
                });
            }).catch(function (err) {
                return console.log(err);
            });
        };

        _this.state = {
            url: '', //property name to coincide with input name
            short_url: '',
            error: null,
            copy: 'Copy URL'
        };
        _this.submitHandler = _this.submitHandler.bind(_this);
        _this.changeHandler = _this.changeHandler.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleCopy = _this.handleCopy.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'handleClick',
        value: function handleClick() {
            var input = document.getElementById('res');
            var inputVal = input.value;
            if (this.state.error == null && inputVal.length != 0) {
                input.focus();
                input.select();
                document.execCommand('copy');
                this.setState({
                    copy: 'Copied!'
                });
            }
        }
    }, {
        key: 'handleCopy',
        value: function handleCopy() {
            this.setState({
                copy: 'Copy URL'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Shorten your URL!'
                ),
                React.createElement(
                    'div',
                    { className: 'container-md' },
                    React.createElement(
                        'div',
                        { className: 'inner-container' },
                        React.createElement(
                            'form',
                            { onSubmit: this.submitHandler },
                            React.createElement(
                                'div',
                                { className: 'input' },
                                React.createElement(
                                    'label',
                                    { 'for': 'url-input' },
                                    'URL:'
                                ),
                                React.createElement('input', {
                                    className: 'form-control',
                                    type: 'text',
                                    name: 'url',
                                    value: this.state.url,
                                    placeholder: 'Enter a valid URL...',
                                    onChange: this.changeHandler })
                            ),
                            React.createElement(
                                'button',
                                {
                                    onClick: this.handleCopy,
                                    className: 'btn btn-outline-light submit',
                                    type: 'submit'
                                },
                                'Submit'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'result-container' },
                            React.createElement(
                                'button',
                                {
                                    className: 'btn btn-outline-light copy',
                                    onClick: this.handleClick,
                                    type: 'submit' },
                                this.state.copy
                            ),
                            React.createElement('input', {
                                id: 'res',
                                type: 'text',
                                className: 'form-control',
                                value: this.state.error != null ? this.state.error : this.state.short_url })
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('react-dom'));