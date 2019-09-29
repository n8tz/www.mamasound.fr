/*
 * www.mamasound.fr
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
import Fab         from '@material-ui/core/Fab';
import TextField   from '@material-ui/core/TextField';
import React       from "react";
import RS          from "react-scopes";
import TagCloud    from 'react-tag-cloud';
import {Comps}     from "../index";
import randomColor from 'randomcolor';

@RS.toProps("TagManager")
export default class SearchBar extends React.Component {
	static propTypes = {};
	state            = {
		single: null,
		multi : null,
	};
	
	handleSearchChange = e => {
		this.setState({
			              search: e.target.value,
		              });
		this.props.$actions.updateCurrentSearch(e.target.value)
	};
	selectTag = tag => {
		this.setState({
			              search: tag.label,
		              });
		this.props.$actions.updateCurrentSearch(tag.label)
	};
	
	render() {
		const {
			      TagManager,
		      } = this.props;
		//console.log('TagManager::render:43: ', TagManager);
		return (<Comps.StretchBox
				width={"24%"}
				className={"searchStretchBox SearchBar"}
				title={
					<div className={"SearchBarForm"}>
						{/*<Fab className={"searchIcon"}>*/}
						{/*	<div className={"material-icons icon"}>search</div>*/}
						{/*</Fab>*/}
						<TextField
							className={"input"}
							value={this.state.search}
							onChange={this.handleSearchChange}
						/>
						<Fab className={"optIcon"}>
							<div className={"material-icons icon"}>tune</div>
						</Fab>
					</div>
				}>
				{/*<div className={"searchOpts"}>*/}
				<TagCloud
					style={{
						fontFamily: 'sans-serif',
						fontSize  : 10,
						fontWeight: 'bold',
						fontStyle : 'italic',
						//color     : () => randomColor(),
						padding   : 1,
						width     : '100%',
						height    : '100%'
					}}
					rotate={()=>(~~(Math.random()*3-1)*90)}
				>
					{/*<div style={{ fontSize: 20 }}>react</div>*/}
					{/*<div style={{color: 'green'}}>tag</div>*/}
					{/*<div rotate={90}>cloud</div>*/}
					{
						TagManager && TagManager.available.map(
							tag =>
								<div
									key={tag.label}
									onClick={(e)=>this.selectTag(tag)}
									//rotate={tag.count < 8 ? 90 : 0}
									style={{
										width: '2em !important', fontSize: 2 + (tag.count > 10 ? 10 : tag.count)
									}}
								>
									{/*<img alt={tag.title} src={tag.style.icon} className={"tagIcon"}/>*/}
									{tag.label}
								</div>)
					}
				</TagCloud>
				
				{/*</div>*/}
			</Comps.StretchBox>
		
		);
	}
};