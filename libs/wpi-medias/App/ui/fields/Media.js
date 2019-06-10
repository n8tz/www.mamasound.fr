/*
 *
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

import React               from "react";
import Image               from "App/ui/components/Image";
import Player              from "App/ui/components/Player";
//import Select              from "App/ui/fields/Select";
import Input               from "App/ui/fields/Text";
//import Paper               from "App/ui/kit/Paper";
//import audioExtensions     from "audio-extensions";
//import videoExtensions     from "video-extensions";
//import imageExtensions     from "image-extensions";
import Button              from '@material-ui/core/Button';
import {DropzoneComponent} from 'react-dropzone-component';


if ( typeof window !== "undefined" )
	require('react-dropzone-component/styles/filepicker.css');
/**
 * File upload field
 *
 * return/value : url of the uploaded file
 */

import {asFieldType} from "App/ui/spells";

@asFieldType
export default class Media extends React.Component {
	
	constructor( props ) {
		super(...arguments);
		
		let { value, defaultValue } = props,
		    fileTypes               = [],
		    dEttyType,
		    vm                      = (defaultValue || value) && "preview" ||
			    props.viewmode || "none";
		//
		var ettys                   = ["Image", "Audio", "Video", "Document"];
		ettys                       = props.allowedTypes == true ?
		                              ettys : props.allowedTypes;
		
		value = defaultValue || value;
		
		ettys = ettys instanceof Array ? ettys : [ettys];
		
		// @todo: update/conf file types
		if ( ettys.indexOf("Audio") != -1 )
			fileTypes.push(".mp3", ".wav", ".aif", ".wma", ".flac");
		if ( ettys.indexOf("Video") != -1 )
			fileTypes.push(".avi", ".mp4", ".mkv", ".webm", ".flv", ".3gp", ".mpeg", ".mpg");
		if ( ettys.indexOf("Image") != -1 )
			fileTypes.push(".jpg", ".jpeg", ".bmp", ".gif", ".png");
		if ( ettys.indexOf("Document") != -1 )
			fileTypes.push(".txt", ".pdf", ".doc", ".docx", ".xls");
		// debugger;
		this.state           = {
			search        : {},
			fileTypes     : fileTypes,
			value         : value,
			availableTypes: ettys,
			cEttyType     : dEttyType || ettys[0],
			viewmode      : vm,
			showUploader  : false
		};
		this.componentConfig = {
			//accept    : fileTypes,
			
			// , // For CORS.
			// forceFallback:true,
			parallelUploads : 1,
			maxFiles        : 1,
			iconFiletypes   : this.state.fileTypes,
			showFiletypeIcon: true,
			postUrl         : "http://" + require('App/config').UPLOAD_URL//+"?map=1"
		};
		this.lists           = {
			addedfile: ( file, result, xhr ) => {
				
				var ext = file.name.match(/(\.[^\.]+)$/i), me = this;
				if ( ext && (me.state.fileTypes.indexOf(ext[1].toLowerCase()) == -1) ) {
					alert('Ce type de fichier n\'est pas valide dans ce champ\nTypes valides :' +
						      me.state.fileTypes.join(', '));
					me.refs.dropzone.dropzone.removeFile(file);
				}
				
				this.setState({ showUploader: false })
			},
			success  : this.uploadSuccess.bind(this),
			//complete: this.uploadSuccess,
			//drop     : ( e ) => {
			//}
		}
	}
	
	/**
	 * get the value of the field
	 * @returns {
	 * {
	 * name: *, // name of the field passed in this.props.name
	 * value: *[] // field value
	 * }
	 * }
	 */
	getValue( s, p ) {
		s = s || this.state;
		p = p || this.props;
		return {
			name : p.name,
			value: s.value
		};
	}
	
	onChange( e ) {
		if ( e.target.name == "url" ) {
			//this.props.value = e.target.value;
			if ( this.refs.preview )
				this.refs.preview.getDOMNode().src = this.props.value;
			
			this.props.onChange &&
			this.props.onChange({ target: this.getValue({ value: e.target.value }) });
			this.setState({ value: e.target.value });
			
		}
		else this.setState({ viewmode: e.target.value });
	}
	
	
	uploadSuccess( file, result, xhr ) {
		this.refs.dropzone.dropzone.removeAllFiles();
		this.setState({ value: result.result.url, viewmode: "preview" });
		this.props.onChange &&
		this.props.onChange({ target: this.getValue() });
		//me.setState({});
	}
	
	setMode( viewmode ) {
		this.setState(
			{
				viewmode
			})
	}
	
	
	showUploader = ( e ) => {
		this.setState({ showUploader: true })
	};
	hideUploader = ( e ) => {
		if ( e.target.classList.contains("dropzone") ) {
			console.log('Media::hideUploader:161: ');
			this.setState({ showUploader: false })
		}
	};
	
	render() {
		let { value, defaultValue, disallowSelect, disallowNone } = this.props,
		    { viewmode, showUploader }                            = this.state,
		    fileTypes                                             = [],
		    _value                                                = this.state.value || value || defaultValue;
		return (
			<div className={ "content" }
			     onDragEnter={ this.showUploader }>
				<div className="controls">
					{
						!disallowSelect &&
						_value &&
						<Button title="Selectionner"
						        color={ viewmode == "select" && "primary" }
						        onClick={ e => this.setMode("select") }>Selectionner</Button>
					}
					
					<Button onClick={ e => this.setMode("preview") }
					        color={ viewmode == "preview" && "primary" }
					        title="Aperçu">Aperçu</Button>
					
					<Button
						title="Upload"
						color={ viewmode == "upload" && "primary" }
						onClick={ e => this.setMode("upload") }>
						Uploader un fichier
					</Button>
					
					<Button
						title="Modifier l'url"
						color={ viewmode == "input" && "primary" }
						onClick={ e => this.setMode("input") }>
						Modifier l'url
					</Button>
					
					{
						!disallowNone &&
						<Button
							title="none"
							color={ viewmode == "none" && "primary" }
							onClick={ e => this.setMode("none") }>
							Aucun(e)
						</Button>
					}
				
				</div>
				<div className="mediaPreview">
					{
						(viewmode === "input") &&
						(
							<Input label="Url du media:" type="text" placeholder="Url du media"
							       name="url"
							       onChange={ this.onChange.bind(this) }
							       defaultValue={ _value }/>
						
						)
						||
						(viewmode === "upload") &&
						(
							<span/>
						)
						|| (viewmode === "preview") &&
						(
							/^[^\s]+\.i?(avi|mp4|mkv|webm|flv|3gp|mpeg|mpg)(\?.*)?$/.test(_value)
							|| /youtube/.test(_value)
						)
						&& <div className=" use_mBox">
							<Player item={ { mediaUrl: _value, visible: true } }/>
						</div>
						||
						(viewmode === "preview") &&
						// /^[^\s]+\.i?(jpeg|jpg|png|gif|bmp)(\?.*)?$/.test(_value.toLowerCase())
						// &&
						<div className=" use_mBox">
							<Image ref="preview" src={ _value } responsive thumbnail
							       style={ { maxHeight: "300px" } }
							       w={ 250 } h={ 250 }/>
						</div>
						//||
						///soundcloud/.test(_value)
						//&& <PlayerSC item={{mediaUrl: _value, visible:true}}/>
						||
						<div
							onClick={ e => this.setMode("select") }>
							"Aucun media selectionné"
						</div>
						
					}
					<div className={ "dropContainer" + (!showUploader && (viewmode !== "upload") ? " hidden" : "") }
					     onDragLeave={ this.hideUploader }>
						<DropzoneComponent
							ref="dropzone"
							style={ {
								//display   :"none" || "block",
							} }
							config={ this.componentConfig }
							djsConfig={ { withCredentials: true } }
							eventHandlers={ this.lists }/>
					</div>
				</div>
			</div>
		);
	}
};
