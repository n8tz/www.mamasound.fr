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
import utils     from "App/utils/(*).js";
import path      from "path";
import PropTypes from "prop-types";
import React     from "react";
import {withScope, asStore, scopeToProps, asRef} from "react-scopes";

let TuiImageEditor, blackTheme, imageCompression;
if ( typeof window !== "undefined" ) {
	require('react-dropzone-component/styles/filepicker.css');
	require('tui-image-editor/dist/tui-image-editor.css');
	TuiImageEditor   = require('tui-image-editor');
	imageCompression = require('browser-image-compression').default;
	
	blackTheme = {
		'common.bi.image'       : 'about:blank',
		'common.bisize.width'   : '0px',
		'common.bisize.height'  : '0px',
		'common.backgroundImage': 'none',
		'common.backgroundColor': '#1e1e1e',
		'common.border'         : '0px',
		
		// header
		'header.backgroundImage': 'none',
		'header.backgroundColor': 'transparent',
		'header.border'         : '0px',
		
		// load button
		'loadButton.backgroundColor': '#fff',
		'loadButton.border'         : '1px solid #ddd',
		'loadButton.color'          : '#222',
		'loadButton.fontFamily'     : '\'Noto Sans\', sans-serif',
		'loadButton.fontSize'       : '12px',
		
		// download button
		'downloadButton.backgroundColor': '#fdba3b',
		'downloadButton.border'         : '1px solid #fdba3b',
		'downloadButton.color'          : '#fff',
		'downloadButton.fontFamily'     : '\'Noto Sans\', sans-serif',
		'downloadButton.fontSize'       : '12px',
		
		// main icons
		'menu.normalIcon.path'  : require('tui-image-editor/dist/svg/icon-d.svg'),
		'menu.normalIcon.name'  : 'icon-d',
		'menu.activeIcon.path'  : require('tui-image-editor/dist/svg/icon-b.svg'),
		'menu.activeIcon.name'  : 'icon-b',
		'menu.disabledIcon.path': require('tui-image-editor/dist/svg/icon-a.svg'),
		'menu.disabledIcon.name': 'icon-a',
		'menu.hoverIcon.path'   : require('tui-image-editor/dist/svg/icon-c.svg'),
		'menu.hoverIcon.name'   : 'icon-c',
		'menu.iconSize.width'   : '24px',
		'menu.iconSize.height'  : '24px',
		
		// submenu primary color
		'submenu.backgroundColor': '#1e1e1e',
		'submenu.partition.color': '#3c3c3c',
		
		// submenu icons
		'submenu.normalIcon.path': require('tui-image-editor/dist/svg/icon-d.svg'),
		'submenu.normalIcon.name': 'icon-d',
		'submenu.activeIcon.path': require('tui-image-editor/dist/svg/icon-c.svg'),
		'submenu.activeIcon.name': 'icon-c',
		'submenu.iconSize.width' : '32px',
		'submenu.iconSize.height': '32px',
		
		// submenu labels
		'submenu.normalLabel.color'     : '#8a8a8a',
		'submenu.normalLabel.fontWeight': 'lighter',
		'submenu.activeLabel.color'     : '#fff',
		'submenu.activeLabel.fontWeight': 'lighter',
		
		// checkbox style
		'checkbox.border'         : '0px',
		'checkbox.backgroundColor': '#fff',
		
		// range style
		'range.pointer.color': '#fff',
		'range.bar.color'    : '#666',
		'range.subbar.color' : '#d1d1d1',
		
		'range.disabledPointer.color': '#414141',
		'range.disabledBar.color'    : '#282828',
		'range.disabledSubbar.color' : '#414141',
		
		'range.value.color'          : '#fff',
		'range.value.fontWeight'     : 'lighter',
		'range.value.fontSize'       : '11px',
		'range.value.border'         : '1px solid #353535',
		'range.value.backgroundColor': '#151515',
		'range.title.color'          : '#fff',
		'range.title.fontWeight'     : 'lighter',
		
		// colorpicker style
		'colorpicker.button.border': '1px solid #1e1e1e',
		'colorpicker.title.color'  : '#fff'
	};
}
//@withScope(
//	{
//		@asStore
//		Exportable: {
//			@asRef
//			items: "Importer.imported",
//			$apply( d, { items } ) {
//				return {
//					items: items && items.map(row => ({
//						...row,
//						category: row.category.objId,
//						place   : row.place.objId
//					}))
//				}
//			}
//		},
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
			theme          : blackTheme,
			//menu           : ['shape', 'filter'],
			initMenu       : 'filter',
			//uiSize         : {
			//	width : '100%',
			//	height: '100%'
			//},
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
	
	_resize = () => {
	};
	
	componentDidMount() {
		//window.addEventListener('resize', this._resize);
		imageCompression
			.loadImage(utils.getMediaSrc(this.props.src))
			.then(
				( image ) => {
					let canvas = imageCompression.drawImageInCanvas(image);
					return imageCompression
						.canvasToFile(canvas, ".jpg", "fileName.jpg", Date.now())
				})
			.then(
				( file ) => {
					let options = {
						maxSizeMB       : 1,
						maxWidthOrHeight: 1920,
						useWebWorker    : true
					}
					return imageCompression(file, options)
				})
			.then(
				( file ) => {
					this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
						...this.tuiConfig,
						includeUI: {
							...this.tuiConfig.includeUI,
							theme    : blackTheme,
							loadImage: {
								path: URL.createObjectURL(file),
								name: path.basename(this.props.src)
							}
							
						},
					});
					//this.imageEditorInst.ui.resizeEditor();
				}
			);
		
		
		//this.bindEventHandlers(this.props);
	}
	
	componentWillUnmount() {
		this.imageEditorInst && this.imageEditorInst.destroy();
	}
	
	shouldComponentUpdate( nextProps, nextState, nextContext ) {
		return nextProps.src !== this.props.src;
	}
	
	save = () => {
		debugger
		console.log(this.imageEditorInst.toDataURL("image/png"))
	}
	
	render() {
		let { $actions, src }
			    = this.props,
		    { showUploader } = this.state
		;
		
		return (
			<div className={"ImageEditor"}
			>
				{/*1223*/}
				<button onClick={this.save}>save</button>
				<div ref={this.rootEl}/>
			</div>
		);
	}
}
;