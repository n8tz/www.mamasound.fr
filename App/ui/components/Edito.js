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
import stores             from 'App/stores/(*).js';
import React              from "react";
import RS, {withStateMap} from "react-scopes";

@RS(
	{
		@withStateMap(
			{
				data: {
					id       : "Edito",
					etty     : "Article",
					"default": {
						title : "test",
						resume: "test gfhf"
					}
				}
			}
		)
		Edito: stores.MongoRecords,
	}
)
@RS.connect("Edito")
export default class Edito extends React.Component {
	static propTypes = {};
	state            = {
		single: null,
		multi : null,
	};
	
	render() {
		const {
			      Edito, style
		      } = this.props;
		return (
			<div className={"Edito"} style={style}>
				<div className={"title"}>
					{Edito.data.title}
				</div>
				<div className={"resume"}>
					{Edito.data.resume}
				</div>
			</div>
		);
	}
};