/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import {asFieldType}      from "App/ui/spells";
import getMediaSrc        from "App/utils/getMediaSrc";
import React, {Component} from "react";
import ReactDOM           from "react-dom";
import Modal              from 'react-responsive-modal';
import MediaField         from "./Media";

if ( !__IS_SERVER__ && typeof CKEDITOR !== "undefined" ) {
	CKEDITOR.editorConfig = function ( config ) {
		debugger
		config.toolbar = [
			{ name: 'document', items: ['Source', '-', 'Print', '-', 'Templates'] },
			{ name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
			{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
			{ name   : 'forms',
				items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
			},
			'/',
			{ name   : 'basicstyles',
				items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
			},
			{ name   : 'paragraph',
				items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
			},
			{ name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
			{ name   : 'insert',
				items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
			},
			'/',
			{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
			{ name: 'colors', items: ['TextColor', 'BGColor'] },
			{ name: 'tools', items: ['Maximize', 'ShowBlocks'] },
		];
		
		config.removeButtons = 'Save,NewPage';
	};
	CKEDITOR.on('dialogDefinition', function ( ev ) {
		// Take the dialog name and its definition from the event data.
		var dialogName       = ev.data.name;
		var dialogDefinition = ev.data.definition;
		
		// Check if the definition is from the dialog we're
		// interested on (the "Image" dialog).
		if ( dialogName == 'image' ) {
			// Get a reference to the "Image Properties" tab.
			var infoTab = dialogDefinition.getContents('info');
			
			// Get a reference to the "Browse Server" button.
			var browse            = infoTab.get('browse');
			// Instruct filebrowser plugin to skip hooking into this button.
			browse['filebrowser'] = false;
			// The "Browse Server" button is hidden by default.
			browse['hidden']      = false;
			// Add our own callback.
			browse['onClick']     = function () {
				//debugger;
				// ;
				//var url = prompt( 'Type some URL' );
				this.getDialog().getParentEditor().fire('openFileBrowser',
				                                        this.getDialog().getContentElement('info', 'txtUrl'));
				//this.getDialog().getContentElement( 'info', 'txtUrl' ).setValue( url );
			};
		}
	});
	CKEDITOR.on('instanceReady', function ( ev ) {
		var editor        = ev.editor,
		    dataProcessor = editor.dataProcessor,
		    htmlFilter    = dataProcessor && dataProcessor.htmlFilter;
		//
		// htmlFilter.addRules({
		//                         elements : {
		//                             $ : function ( element ) {
		//                                 // Output dimensions of images as width and height attributes on src
		//                                 if ( element.name == 'img' ) {
		//                                     var style = element.attributes.style;
		//                                     if ( style ) {
		//                                         // Get the width from the style.
		//                                         var match = /(?:^|\s)width\s*:\s*(\d+)px/i.exec(style),
		//                                             width = match && match[1];
		//
		//                                         // Get the height from the style.
		//                                         match      = /(?:^|\s)height\s*:\s*(\d+)px/i.exec(style);
		//                                         var height = match && match[1];
		//                                         //debugger;
		//                                         var imgsrc = element.attributes["data-cke-saved-src"] ||
		//                                             element.attributes["src"];
		//                                         imgsrc += "?w=" + width + "&h=" + height;
		//
		//                                         element.attributes.src                   = imgsrc;
		//                                         element.attributes['data-cke-saved-src'] = imgsrc;
		//                                     }
		//                                 }
		//                             }
		//                         }
		//                     });
	});
}

@asFieldType
export default class Html extends Component {
	static displayName = "Html";
	
	constructor( ...argz ) {
		super(...argz);
		this.state = {
			showEditorModal: false,
			value          : this.props.defaultValue || this.props.value
		};
	}
	
	componentWillUnmount() {
		
		if ( this._willMountCk ) {
			clearTimeout(this._willMountCk);
		}
		if ( this._CKEditor ) {
			// debugger;
			if ( this._ckComplete ) {
				this._CKEditor.removeAllListeners();
				
				this._CKEditor.destroy(false);
			}
			this._CKEditor = null;
		}
	}
	
	
	componentWillReceiveProps( props ) {
		if ( this.props.defaultValue != props.defaultValue ) {
		
		}
	}
	
	shouldComponentUpdate( nextProps, nextState ) {
		return nextState.showEditorModal !== this.state.showEditorModal || false;
	}
	
	componentDidMount() {
		if ( this._willMountCk ) {
			clearTimeout(this._willMountCk);
		}
		this._willMountCk = setTimeout(this.initCK.bind(this), 200);
		
	}
	
	initCK() {
		// debugger;
		// console.warn('ck edit', this.props.name)
		var me            = this,
		    ck;
		this._willMountCk = null;
		ck                = this._CKEditor = CKEDITOR.replace(
			ReactDOM.findDOMNode(this.textarea.current),
			{}
		);
		this._CKEditor.on('change', this.onChange.bind(this));
		
		this._CKEditor.on('instanceReady', function ( ev ) {
			me._ckComplete = true;
			if ( !me._CKEditor || me._CKEditor !== ck ) {
				ck.removeAllListeners();
				ck.destroy(false);
			}
			
		});
		this._CKEditor.on('openFileBrowser', ( target ) => {
			//debugger;
			me._filebrowserTarget = target;
			me.setState({ showEditorModal: true });
			
		});
		
		if ( this.state.value ) {
			this._CKEditor.setData(this.state.value);
		}
	}
	
	onChange( v ) {//todo: skip some..
		//debugger;
		//this.props.value = v;
		this.props.onChange
		&& this.props.onChange({
			                       target: {
				                       name : this.props.name,
				                       value: v.editor.getData()
			                       }
		                       });
	}
	
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
		//width : "100%",
		//height: "100%",
		toolbar: ["undo", "redo", "alignment", "bold", "italic", "blockQuote", "imageTextAlternative", "imageUpload", "heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells"]
	};
	textarea = React.createRef();
	
	render() {
		let { defaultValue, value = defaultValue } = this.props;
		let { showEditorModal }                    = this.state;
		if ( __IS_SERVER__ )
			return <React.Fragment></React.Fragment>;
		//debugger
		return (
			<React.Fragment>
				
				<textarea ref={this.textarea}/>
				
				<Modal
					open={showEditorModal}
					center
					styles={{ overlay: { zIndex: 200000000 } }}
					onClose={() => this.setState({ showEditorModal: false })}
				>
					<div className="ckUploadModal">
						<MediaField
							storeTypedItem
							disallowId
							disallowNone
							allowedTypes={"Image"}
							viewmode="select"
							onChange={( v ) => {
								//debugger;
								this._currentSelectedMedia = getMediaSrc(
									v.target.value);
								
							}}
							ref="recordPicker"/>
						
						<button onClick={() => {
							this._filebrowserTarget.data.setValue(
								this._currentSelectedMedia);
							this._filebrowserTarget = this._currentSelectedMedia = null;
							this.setState({ showEditorModal: false });
						}}>Choisir
						</button>
					</div>
				</Modal>
				{/*<Modal open={ me.state.showEditorModal }*/}
				{/*onHide={ () => me.setState({ showEditorModal: false }) }*/}
				{/*dialogClassName="_modal_w90">*/}
				{/*<React.Fragment>*/}
				{/*<div> Selectionez / uploadez une*/}
				{/*image*/}
				{/*</div>*/}
				{/**/}
				{/*</React.Fragment>*/}
				{/*</Modal>*/}
			</React.Fragment>
		);
	}
	
};