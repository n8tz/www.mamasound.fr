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


@reScope(
	{
		//@withStateMap(
		//	{
		//		@asRef
		//		items  : "Exportable.items",
		//		docName: "NewEvents",
		//	}
		//)
		//Exporter: XlsExporter,
		
	}
)
//@scopeToProps("MamaXls", "appState", "Importer", "Exporter")
export default class RecordEditor extends React.Component {
	static propTypes = {
		type  : PropTypes.string,
		record: PropTypes.object,
	};
	state            = {};
	
	render() {
		let { $actions, }
			    = this.props,
		    { showUploader } = this.state
		;
		
		return (
			<div className={ "RecordEditor" }
			     onDragEnter={ this.showUploader }
			>
				<div className={ "controls" }>
					<IconButton onClick={ e => $actions.updateQueries() } title={ "Update styles & places" }>
						<RefreshIcon/>
					</IconButton>
				</div>
				<Forms.Address/>
			</div>
		);
	}
};