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
import Button             from '@material-ui/core/Button';
import entities           from 'App/db/entities';
import validate           from 'App/db/validate';
import stores             from 'App/stores/(*).js';
import {fields}           from "App/ui";
import is                 from "is";
import React              from "react";
import {ContextMenu}      from 'react-inheritable-contextmenu';
import RS, {withStateMap} from "react-scopes";
import {toast}            from 'react-toastify';

@RS(
	{
		@withStateMap(
			{
				record          : undefined,
				setCurrentRecord: ( etty, id ) => ({ record: { id, etty } })
			}
		)
		data: stores.MongoRecords,
	}
)
@RS.fromProps("record:data.record")
@RS.connect("data.record")
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
			nextState.isLoading !== this.state.isLoading
			|| nextState.haveErrors !== this.state.haveErrors
			|| nextState.hidden !== this.state.hidden
		)
		) {
			return true;
		}
		if ( nextState.errors && (nextState.errors !== this.state.errors) ) {
			return true;
		}
		if ( nextProps.record && this.props.record && nextProps.record._id === this.props.record._id )
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
					...this.state.record,
					[event.target.name]: event.target.value
				}
			}
		);
		return true;
	}
	
	onSaveComplete( r ) {
		console.log('ok saved', r);
		this.props.whenDone &&
		this.props.whenDone(r);
		//db.hotReplaceRecord(r);
		
	}
	
	preview      = () => {
		let isValid,
		    record = this.state.record || this.props.record;
		
		//debugger
		isValid = validate(record, record._cls)
		
		if ( isValid !== true )
			this.setState({ errors: isValid });
		else {
			this.setState({ errors: {}, previewActive: true });
			this.props.$actions.db_preview(record)
		}
	}
	clearPreview = () => {
		let isValid,
		    record = this.state.record || this.props.record;
		this.setState({ previewActive: false });
		this.props.$actions.db_clearPreview(record._id)
	}
	save         = () => {
		let isValid,
		    { $actions } = this.props,
		    record       = this.state.record || this.props.record,
		    etty         = record && record._cls || this.props.etty;
		
		//debugger
		isValid = validate(record, etty)
		
		if ( isValid !== true )
			this.setState({ errors: isValid });
		else {
			this.setState({ errors: {} });
			//console.log(record)
			this.state.previewActive && $actions.db_clearPreview(record._id, true);
			if ( record._id ) {
				if ( confirm("Voulez vous vraiment enregistrer?") )
					$actions.db_save(record, res => {
						//$actions.setCurrentRecord(etty, res.id);
						toast("Saved !")
						//this.setState({ record: { ...record, _id: res._id } });
					})
			}
			else {
				if ( confirm("Voulez vous vraiment créer cet item?") )
					$actions.db_create(record, res => {
						$actions.setCurrentRecord(etty, res.id);
						toast("Saved !")
						this.setState({ record: undefined });
					})
			}
		}
	}
	
	close = () => {
		let { $actions } = this.props,
		    record       = this.state.record || this.props.record;
		
		//this.state.previewActive && $actions.db_clearPreview(record._id)
		$actions.widgetClose()
	}
	
	componentWillUnmount() {
		let { $actions } = this.props,
		    record       = this.state.record || this.props.record;
		
		this.state.previewActive && $actions.db_clearPreview(record._id)
	}
	
	onClick() {
	}
	
	restore() {
	}
	
	buildForm() {
		let { record = {}, id, DataProvider }
			    = this.props,
		    etty      = record && record._cls || this.props.etty,
		    recordDef = entities[etty],
		    errors    = this.state.errors,
		    form      = [],
		    values    = {},
		    key       = 0;
		if ( !recordDef )
			return <div>Entity not found '{etty}'</div>
		Object.keys(recordDef.fields).map(
			( name ) => {
				if ( !recordDef.fields[name].formRenderer || recordDef.fields[name].hidden )
					return <div/>;
				let key      = etty + "_" + name,
				    renderer = recordDef.fields[name].formRenderer,
				    Tag      = is.string(renderer) ? fields[renderer] : renderer,
				    def      = record && record[name] || recordDef.fields[name].defaultProps.defaultValue
					    || '';
				if ( !Tag ) throw "This fields doesn't exist : " + recordDef.fields[name].formRenderer;
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
					          errors[name] && errors[name].map(( e ) => <div className="formError">
						          <strong>Erreur:</strong> {e}</div>) ||
					          '']);
			});
		return form;
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		if ( prevProps.record !== this.props.record && !this.state.record._id )
			this.setState({ record: { ...this.props.record } })
	}
	
	static getDerivedStateFromProps( { record, etty }, state ) {
		if ( state.record )
			return state;
		record = record || {};
		etty   = record._cls = record._cls || etty;
		return { record, etty }
	}
	
	
	render() {
		let { $actions, id, DataProvider, }
			    = this.props,
		    { record = {}, etty, previewActive } = this.state;
		
		return (
			<div className={"form_Default form_" + etty}
			>
				<div className="title">
					Edition : {entities[etty] && entities[etty].label}
					{
						(
							<a //href={ this.getUrlTo() }
								target="_blank">{record._alias || record._id}</a>
						) || ''
					}
				</div>
				
				<div className="form">
					{this.buildForm()}
				</div>
				<div className={"editor_btn"}>
					<Button onClick={this.close}>Cancel</Button>
					{record._id && previewActive && <Button onClick={this.clearPreview}>Clear preview</Button>}
					{record._id && <Button onClick={this.preview}>Preview</Button>}
					<Button onClick={this.save}>Save</Button>
				</div>
				<ContextMenu native/>
			</div>
		);
	}
	
};

