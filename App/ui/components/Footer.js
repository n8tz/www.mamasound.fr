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
import {Comps} from 'App/ui';
import React   from "react";

export default class Footer extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    style
		    }     = this.props,
		    state = this.state;
		return (
			<div className={"Footer"} style={style}>
				<div className={"toolbar"}>
					<Comps.LoginBox/>
				</div>
				{/*{ ActiveTags && ActiveTags.available && ActiveTags.available.map(*/}
				{/*tag =>*/}
				{/*<Chip*/}
				{/*key={ tag.title }*/}
				{/*icon={*/}
				{/*//<Badge badgeContent={ tag.count} color="secondary" >*/}
				{/*<img alt={ tag.title } src={ tag.style.icon } className={ "icon" }/>*/}
				{/*//</Badge>*/}
				{/*}*/}
				{/*label={ tag.title }*/}
				{/*//onClick={handleClick}*/}
				{/*//onDelete={handleDelete}*/}
				{/*//className={classes.chip}*/}
				{/*/>*/}
				{/*) }*/}
			</div>
		);
	}
};