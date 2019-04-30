/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */
import is        from "is";
import PropTypes from "prop-types";
import React     from "react";
import Forms     from "App/ui/forms";

import {reScope, Store, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}               from "rescope-spells";

import ImportIcon  from '@material-ui/icons/CloudUploadOutlined';
import ExportIcon  from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton  from '@material-ui/core/IconButton';


import entities      from 'App/db/entities';
import {ContextMenu} from 'react-inheritable-contextmenu';
import Button        from '@material-ui/core/Button';

@scopeToProps("DataProvider")
export default class RecordEditor extends React.Component {
	static defaultProps = {
		whenDone: () => {
		}
	}
	
	constructor( props, ctx ) {
		super(...arguments);
		
		this.state = {
			...(this.state || {}),
			errors: {}
		};
		
		//this.state.record = this.state.record || props.record &&
		//	{ ...props.record };
		
		// this.state.nextPage = Auth.state.AdminNextPage;
	}
	
	shouldComponentUpdate( nextProps, nextState ) {
		if ( (
			nextState.isLoading != this.state.isLoading
			|| nextState.haveErrors != this.state.haveErrors
			|| nextState.hidden != this.state.hidden
		)
		) {
			return true;
		}
		if ( nextState.errors && (nextState.errors != this.state.errors) ) {
			return true;
		}
		if ( nextProps.record && this.props.record && nextProps.record._id == this.props.record._id )
			return false;
		if ( nextProps.record && !this.props.record )
			return true;
		return false;
	}
	
	bindChange( event ) {
		this._cfocus = event.target.name;
		console.log(event.target.name, event.target.value)
		this.setState(
			{
				record: {
					...this.props.record,
					[event.target.name]: event.target.value
				}
			}
		);
		return true;
	}
	
	onSaveComplete( r ) {
		var db = this.props.$stores.db;
		console.log('ok saved', r);
		this.props.whenDone &&
		this.props.whenDone(r);
		db.hotReplaceRecord(r);
		
	}
	
	validate() {
		var db      = this.props.$stores.db,
		    isValid = db.validate(this.props.record, this._etty);
		
		if ( isValid !== true )
			this.setState({ errors: isValid });
		else {
			this.setState({ errors: {} });
			// me.wait();
			if ( this.props.id )
				db.save(this.props.etty, this.props.id, this.state.record,
				        ( e, r ) => {
					        // me.release();
					        if ( e ) {
						        // debugger;
						        alert('Sorry it failed ! :( ( try to relog ? )');
						        // Auth.checkLoginStatus();
						        return;
					        }
					        // debugger;
					        // me.setState({record : null});
					        this.onSaveComplete(r);
				        });
			else
				db.create(this.props.etty, this.state.record,
				          ( e, r ) => {
					          // this.release();
					          if ( e ) {
						          // debugger;
						
						          alert('Sorry it failed ! :( ( try to relog ? )');
						          // Auth.checkLoginStatus();
						          return;
					          }
					          // this.setState({record : null});
					          //this.setState({record : r});
					          this.onSaveComplete(r);
				          });
		}
	}
	
	preview() {
		var me      = this,
		    db      = this.$stores.db,
		    isValid = db.validate(this.props.record, this._etty);
		
	}
	
	onClick() {
	}
	
	restore() {
		//cActions.bindEntity(this, this.props.etty, this.props.id, 'record');
		//quick & dirty restore :D
		//window.location.reload();
	}
	
	buildForm() {
		let { $actions, id, DataProvider }
			    = this.props,
		    record    = DataProvider[id],
		    etty      = record._cls,
		    recordDef = entities[etty],
		    errors    = this.state.errors,
		    form      = [],
		    values    = {},
		    key       = 0;
		
		if ( !recordDef )
			return <div>Entity not found '{ etty }'</div>
		Object.keys(recordDef.fields).map(
			( name ) => {
				if ( !recordDef.fields[name].renderer || recordDef.fields[name].hidden )
					return <div/>;
				var key = etty + "_" + name,
				    Tag = recordDef.fields[name].renderer,
				    def = this.props.record && this.props.record[name] || recordDef.fields[name].defaultProps.defaultValue
					    || '';
				if ( !Tag ) throw "This fields doesn't exist : " + recordDef.fields[name].renderer;
				form.push([<Tag {
					                ...{
						                ...recordDef.fields[name].defaultProps,
						                autoFocus   : (key === this._cfocus ? true : false),
						                key,
						                name,
						                record      : this.state.record,
						                label       : recordDef.fields[name].label,
						                defaultValue: def,
						                onChange    : this.bindChange.bind(this),
						                bsStyle     : errors[key] && errors[name].length && "error"
					                } } />,
					          errors[key] && errors[key].map(( e ) => <div className="formError">
						          <strong>Erreur:</strong> { e }</div>) ||
					          '']);
			});
		return form;
	}
	
	render() {
		let { $actions, id, DataProvider }
			    = this.props,
		    { showUploader } = this.state,
		    record           = DataProvider[id],
		    Form             = Forms[DataProvider[id]._cls]
		;
		
		return (
			<div className={ "RecordEditor" }
			>
				<div className="title">
					Edition : { entities[record._cls] && entities[record._cls].label }
					{
						id &&
						(
							<a //href={ this.getUrlTo() }
								target="_blank">{ record._alias || id }</a>
						) || ''
					}
				</div>
				
				<div className="form">
					{ this.buildForm() }
				</div>
				<div className={ "editor_btn" }>
					{/*<Button onClick={ $widget_close }>Cancel</Button>*/ }
					{/*<Button onClick={ this.validate.bind(this) }>Save</Button>*/ }
				</div>
				<ContextMenu native/>
			</div>
		);
	}
	
};

