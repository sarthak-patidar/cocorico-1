var React = require('react');
var Markdown = require('react-remarkable');
var ReactBootstrap = require('react-bootstrap');
var ReactIntl = require('react-intl');
var ReactDocumentTitle = require('react-document-title');
var Reflux = require('reflux');

var FormattedMessage = ReactIntl.FormattedMessage,
    FormattedTime = ReactIntl.FormattedTime;

var Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col,
    Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;

var TextAction = require('../action/TextAction'),
    UserAction = require('../action/UserAction');

var TextStore = require('../store/TextStore'),
    UserStore = require('../store/UserStore');

var Text = React.createClass({

    mixins: [
        ReactIntl.IntlMixin,
        Reflux.connect(TextStore, 'texts'),
        Reflux.connect(UserStore, 'users')
    ],

    getInitialState: function()
    {
        return {
            id: null,
            title: '',
            content: ''
        };
    },

    componentDidMount: function()
    {
        if (this.props.textId)
        {
            this.listenTo(TextStore, (store) => {
                var text = store.getById(this.props.textId);
                if (text && text.id == this.props.textId)
                {
                    this.setState({
                        id: text.id,
                        title: text.title,
                        content: text.content.md
                    });
                }
            });

            TextAction.show(this.props.textId);
        }

        UserAction.requireLogin();
    },

    componentWillReceiveProps: function(props)
    {
    },

    handleClick: function()
    {
        TextAction.save(this.state.id, this.state.title, this.state.content);
    },

    handleTitleChange: function(event)
    {
        this.setState({ title: event.target.value });
    },

    handleContentChange: function(event)
    {
        this.setState({ content: event.target.value });
    },

    render: function()
    {
        var text = this.state && this.state.texts
            ? this.state.texts.getById(this.props.textId)
            : null;

        return (
            <Grid className="text-editor">
                <Row>
                    <Col md={12}>
                        <h2>{this.getIntlMessage('textEditor.TITLE')}</h2>
                        <Input type="texte" name="title" value={this.state.title}
                               onChange={this.handleTitleChange}
                               enabled={this.props.textId && text}
                               placeholder={this.getIntlMessage('textEditor.TITLE_PLACEHOLDER')}>
                            {!!text ? text.title : ''}
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h2>{this.getIntlMessage('textEditor.CONTENT')}</h2>
                        <Input type="textarea" name="content" className="text-content"
                               value={this.state.content} onChange={this.handleContentChange}
                               enabled={this.props.textId && text}
                               placeholder={this.getIntlMessage('textEditor.CONTENT_PLACEHOLDER')}>
                            {!!text ? text.content.md : ''}
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button bsSize="large" bsStyle="primary" onClick={this.handleClick}>
                            {this.getIntlMessage('textEditor.SAVE')}
                        </Button>
                    </Col>
                </Row>
            </Grid>
        );
	}
});

module.exports = Text;