/*
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import is              from "is";
import PropTypes       from "prop-types";
import React           from "react";
import {Forms, fields} from "App/ui";

import {reScope, Store, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}               from "rescope-spells";

import stores from 'App/stores/(*).js';


import entities      from 'App/db/entities';
import {ContextMenu} from 'react-inheritable-contextmenu';
import Button        from '@material-ui/core/Button';

@reScope(
	{
		@withStateMap(
			{
				record: undefined
			}
		)
		data: stores.MongoRecords,
	}
)
@propsToScope("record:data.record")
@scopeToProps("data.record")
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
		let { record, id, DataProvider }
			    = this.props,
		    etty      = record._cls,
		    recordDef = entities[etty],
		    errors    = this.state.errors,
		    form      = [],
		    values    = {},
		    key       = 0;
		
		if ( !recordDef )
			return <div>Entity not found '{etty}'</div>
		Object.keys(recordDef.fields).map(
			( name ) => {
				if ( !recordDef.fields[name].renderer || recordDef.fields[name].hidden )
					return <div/>;
				let key      = etty + "_" + name,
				    renderer = recordDef.fields[name].renderer,
				    Tag      = is.string(renderer) ? fields[renderer] : renderer,
				    def      = record && record[name] || recordDef.fields[name].defaultProps.defaultValue
					    || '';
				if ( !Tag ) throw "This fields doesn't exist : " + recordDef.fields[name].renderer;
				form.push([<Tag {
					                ...{
						                ...recordDef.fields[name].defaultProps,
						                autoFocus   : (key === this._cfocus ? true : false),
						                key,
						                name,
						                record      : record,
						                label       : recordDef.fields[name].label,
						                defaultValue: def,
						                onChange    : this.bindChange.bind(this),
						                bsStyle     : errors[key] && errors[name].length && "error"
					                }} />,
					          errors[key] && errors[key].map(( e ) => <div className="formError">
						          <strong>Erreur:</strong> {e}</div>) ||
					          '']);
			});
		return form;
	}
	
	render() {
		let { $actions, id, DataProvider, record }
			    = this.props,
		    {}  = this.state
		;
		if ( !record || !record._cls ) {
			return <div></div>;
		}
		
		return (
			<div className={"form_Default form_" + record._cls}
			>
				<div className="title">
					Edition : {entities[record._cls] && entities[record._cls].label}
					{
						id &&
						(
							<a //href={ this.getUrlTo() }
								target="_blank">{record._alias || id}</a>
						) || ''
					}
				</div>
				
				<div className="form">
					{record && record._cls && this.buildForm()}
				</div>
				<div className={"editor_btn"}>
					<Button onClick={$actions.widgetClose}>Cancel</Button>
					<Button onClick={this.validate.bind(this)}>Save</Button>
				</div>
				<ContextMenu native/>
			</div>
		);
	}
	
};

