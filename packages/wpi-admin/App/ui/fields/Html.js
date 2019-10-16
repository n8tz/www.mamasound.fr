/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import {asFieldType}      from "App/ui/spells";
import React, {Component} from "react";

let CKEditor, ClassicEditor, isBrowser;
if ( typeof window !== "undefined" ) {
	isBrowser     = true;
	CKEditor      = require('@ckeditor/ckeditor5-react');
	ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
}

@asFieldType
export default class Html extends Component {
	static displayName = "Html";
	
	onCkChange = ( event, editor ) => {//todo: skip some..
		//this.props.value = v;
		this.props.onChange
		&& this.props.onChange({
			                       target: {
				                       name : this.props.name,
				                       value: editor.getData()
			                       }
		                       });
	}
	
	ckConfig = {
		width : "100%",
		height: "100%"
	};
	
	render() {
		let { defaultValue, value = defaultValue } = this.props;
		if ( !isBrowser )
			return <React.Fragment></React.Fragment>;
		//debugger
		return (
			<React.Fragment>
				<CKEditor
					editor={ClassicEditor}
					data={value}
					config={this.ckConfig}
					height={"100%"}
					onInit={editor => {
						// You can store the "editor" and use when it is needed.
						//console.log('Editor is ready to use!', editor);
					}}
					onChange={this.onCkChange}
					onBlur={editor => {
						console.log('Blur.', editor);
					}}
					onFocus={editor => {
						console.log('Focus.', editor);
					}}
				/>
				
				{/*<Modal open={ me.state.showEditorModal }*/}
				{/*onHide={ () => me.setState({ showEditorModal: false }) }*/}
				{/*dialogClassName="_modal_w90">*/}
				{/*<React.Fragment>*/}
				{/*<div> Selectionez / uploadez une*/}
				{/*image*/}
				{/*</div>*/}
				{/**/}
				{/*<MediaField*/}
				{/*storeTypedItem*/}
				{/*disallowId*/}
				{/*disallowNone*/}
				{/*allowedTypes={ "Image" }*/}
				{/*viewmode="select"*/}
				{/*onChange={ ( v ) => {*/}
				{/*//debugger;*/}
				{/*me._currentSelectedMedia = Image.getSrc(*/}
				{/*v.target.value);*/}
				{/**/}
				{/*} }*/}
				{/*ref="recordPicker"/>*/}
				{/**/}
				{/*<Button onClick={ () => {*/}
				{/*me._filebrowserTarget.data.setValue(*/}
				{/*me._currentSelectedMedia);*/}
				{/*me._filebrowserTarget = me._currentSelectedMedia = null;*/}
				{/*me.setState({ showEditorModal: false });*/}
				{/*} }>Choisir</Button>*/}
				{/*</React.Fragment>*/}
				{/*</Modal>*/}
			</React.Fragment>
		);
	}
	
};