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
import utils               from "App/utils/(*).js";
import path                from "path";
import PropTypes           from "prop-types";
import React               from "react";
import {DropzoneComponent} from "react-dropzone-component";

let TuiImageEditor;
if ( typeof window !== "undefined" ) {
	require('react-dropzone-component/styles/filepicker.css');
	require('tui-image-editor/dist/tui-image-editor.css');
	TuiImageEditor = require('tui-image-editor');
}
//@reScope(
//	{
//
//	}
//)
//@scopeToProps("MamaXls", "appState", "Importer", "Exporter")
export default class ImageEditor extends React.Component {
	static propTypes = {
		src   : PropTypes.string,
		onSave: PropTypes.func,
	};
	state            = {
		src: undefined
	};
	tuiConfig        = {
		includeUI     : {
			loadImage      : {
				//path: utils.getMediaSrc(_value),
				//name: path.basename(_value)
			},
			//theme          : myTheme,
			menu           : ['shape', 'filter'],
			initMenu       : 'filter',
			uiSize         : {
				width : '800px',
				height: '600px'
			},
			menuBarPosition: 'bottom'
		},
		cssMaxHeight  : 400,
		cssMaxWidth   : 500,
		selectionStyle: {
			cornerSize         : 20,
			rotatingPointOffset: 70
		}
	};
	rootEl           = React.createRef();
	
	componentDidMount() {
		this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
			...this.tuiConfig,
			includeUI: {
				...this.tuiConfig.includeUI,
				loadImage: {
					path: utils.getMediaSrc(this.props.src),
					name: path.basename(this.props.src)
				}
				
			},
		});
		
		//this.bindEventHandlers(this.props);
	}
	
	shouldComponentUpdate( nextProps, nextState, nextContext ) {
		return nextProps.src !== this.props.src;
	}
	
	showUploader = ( e ) => {
		this.setState({ showUploader: true })
	};
	hideUploader = ( e ) => {
		this.setState({ showUploader: false })
	};
	
	render() {
		let { $actions, src }
			    = this.props,
		    { showUploader } = this.state
		;
		
		return (
			<div className={"ImageEditor"}
			     onDragEnter={this.showUploader}
			>
				{/*1223*/}
				<div ref={this.rootEl}/>
				{
					<DropzoneComponent
						onDragLeave={this.hideUploader}
						className={!showUploader && "hidden"}
						ref="dropzone"
						eventHandlers={{
							addedfile: file => {
								$actions.addXLSfile(
									file,
									e => this.refs.dropzone.dropzone.removeFile(file)
								);
							},
							//complete: this.uploadSuccess,
							drop     : this.hideUploader
						}}
						style={{ width: "100%", height: "100%", background: "#ffffff5c" }}
						
						config={{
							parallelUploads : 100,
							maxFiles        : 100,
							iconFiletypes   : [".xls", ".csv", ".xslx"],
							showFiletypeIcon: true,
							autoDiscover    : false,
							postUrl         : "no-url"
						}}
						djsConfig={{
							parallelUploads   : 100,
							maxFiles          : 100,
							autoProcessQueue  : false,
							withCredentials   : true,
							autoDiscover      : false,
							dictDefaultMessage: "Drop here to parse"
						}}/>
				}
			</div>
		);
	}
};