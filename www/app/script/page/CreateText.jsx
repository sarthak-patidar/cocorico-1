var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactRouter = require('react-router');
var ReactIntl = require('react-intl');
var Reflux = require('reflux');

var TextStore = require("../store/TextStore");

var TextAction = require("../action/TextAction");

var TextEditor = require("../component/TextEditor");

var Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var Link = ReactRouter.Link;

var CreateText = React.createClass({

    mixins: [
        ReactIntl.IntlMixin
    ],

    render: function()
    {
		return (
            <div className="page page-create-text">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <h1>Créer un texte</h1>
                        </Col>
                    </Row>
                </Grid>

                <TextEditor />
            </div>
		);
	}
});

module.exports = CreateText;
