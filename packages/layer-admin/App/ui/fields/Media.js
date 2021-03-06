/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

//import Paper               from "App/ui/kit/Paper";
//import audioExtensions     from "audio-extensions";
//import videoExtensions     from "video-extensions";
//import imageExtensions     from "image-extensions";
import Button              from '@material-ui/core/Button';
import cfg                 from "App/config";
import Image               from "App/ui/components/Image";
import Player              from "App/ui/components/Player";
import Input               from "App/ui/fields/Text";
import {asFieldType}       from "App/ui/spells";
import React               from "react";
import {DropzoneComponent} from 'react-dropzone-component';
import getMediaSrc         from "App/utils/getMediaSrc";


if ( typeof window !== "undefined" )
	require('react-dropzone-component/styles/filepicker.css');
/**
 * File upload field
 *
 * return/value : url of the uploaded file
 */

@asFieldType
export default class Media extends React.Component {
	static displayName = "Media";
	
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
			fileTypes.push(".jpg", ".jpeg", ".bmp", ".gif", ".png", ".jfif");
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
			postUrl         : "http://" + cfg.UPLOAD_URL//+"?map=1"
		};
		this.lists           = {
			addedfile: ( file, result, xhr ) => {
				var ext = file.name.match(/(\.[^\.]+)$/i), me = this;
				if ( ext && (me.state.fileTypes.indexOf(ext[1].toLowerCase()) == -1) ) {
					alert('Ce type de fichier n\'est pas valide dans ce champ\nTypes valides :' +
						      me.state.fileTypes.join(', '));
					me.dropZone.current.dropzone.removeFile(file);
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
			if ( this.preview.current )
				this.preview.current.src = this.props.value;
			
			this.props.onChange &&
			this.props.onChange({ target: this.getValue({ value: e.target.value }) });
			this.setState({ value: e.target.value });
			
		}
		else this.setState({ viewmode: e.target.value });
	}
	
	
	uploadSuccess( file, result, xhr ) {
		this.dropZone.current.dropzone.removeAllFiles();
		if ( result.result && result.result[0] ) {
			this.setState({ value: result.result[0].url, viewmode: "preview" });
			this.props.onChange &&
			this.props.onChange({ target: this.getValue() });
		}
		else {
			alert("Fail uploading, please log in")
		}
	}
	
	setMode( viewmode ) {
		this.setState(
			{
				viewmode
			})
	}
	
	clearValue   = () => {
		if ( this.preview.current )
			this.preview.current.src = "about:blank";
		this.props.onChange &&
		this.props.onChange({ target: this.getValue({ value: undefined }) });
		this.setState({ value: undefined });
	}
	onEditorSave = ( value ) => {
		
		this.props.onChange &&
		this.props.onChange({ target: this.getValue({ value }) });
		this.setState({ value });
	}
	
	
	showUploader = ( e ) => {
		this.setState({ showUploader: true })
	};
	hideUploader = ( e ) => {
		if ( e.target.classList.contains("dropzone") ) {
			this.setState({ showUploader: false })
		}
	};
	preview      = React.createRef();
	dropZone     = React.createRef();
	
	render() {
		let { value, defaultValue, disallowSelect, disallowNone } = this.props,
		    { viewmode, showUploader }                            = this.state,
		    fileTypes                                             = [],
		    _value                                                = this.state.value || value || defaultValue;
		return (
			<div className={"content"}
			     onDragEnter={this.showUploader}>
				<div className="controls">
					
					<Button onClick={e => this.setMode("preview")}
						//color={viewmode == "preview" && "primary"}
						    title="Aperçu">Aperçu</Button>
					
					<Button
						title="Upload"
						//color={viewmode == "upload" && "primary"}
						onClick={e => this.setMode("upload")}>
						Uploader
					</Button>
					
					<Button
						title="Modifier l'url"
						//color={viewmode == "input" && "primary"}
						onClick={e => this.setMode("input")}>
						Modifier l'url
					</Button>
					
					{/*<Button*/}
					{/*	title="Editer"*/}
					{/*	//color={viewmode == "input" && "primary"}*/}
					{/*	onClick={e => $actions.newWidget("ImageEditor", { src: _value, onSave: this.onEditorSave })}>*/}
					{/*	Editer*/}
					{/*</Button>*/}
					
					{
						!disallowNone &&
						<Button
							title="none"
							onClick={e => (this.setMode("none"), this.clearValue())}>
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
							       onChange={this.onChange.bind(this)}
							       defaultValue={_value}/>
						
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
						&& <Player item={{ mediaUrl: getMediaSrc(_value), visible: true }}/>
						||
						(viewmode === "preview") &&
						// /^[^\s]+\.i?(jpeg|jpg|png|gif|bmp)(\?.*)?$/.test(_value.toLowerCase())
						// &&
						<Image ref={this.preview} src={_value}
						       style={{ maxHeight: "300px" }}
						       w={250} h={250}/>
						//||
						///soundcloud/.test(_value)
						//&& <PlayerSC item={{mediaUrl: _value, visible:true}}/>
						||
						<div className=" none"
						     onClick={e => this.setMode("select")}>
							"Aucun media selectionné"
						</div>
						
					}
					<div className={"dropContainer" + (!showUploader && (viewmode !== "upload") ? " hidden" : "")}
					     onDragLeave={this.hideUploader}>
						<DropzoneComponent
							ref={this.dropZone}
							style={{
								//display   :"none" || "block",
							}}
							config={this.componentConfig}
							djsConfig={{ withCredentials: true }}
							eventHandlers={this.lists}/>
					</div>
				</div>
			</div>
		);
	}
};
