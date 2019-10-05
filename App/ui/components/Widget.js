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
import CardHeader                                       from '@material-ui/core/CardHeader';
import IconButton                                       from '@material-ui/core/IconButton';
import CloseIcon                                        from '@material-ui/icons/Close';
import PropTypes                                        from "prop-types";
import React                                            from "react";
import {Rnd}                                            from "react-rnd";
import {asStore, propsToScope, scopeToProps, withScope} from "react-scopes";


@withScope(
	{
		@asStore
		widget: {
			widgetClose() {
				this.$actions.rmWidget(this.state.record._id)
			}
		}
	}
)
@propsToScope('record:widget.record')
@scopeToProps('widget')
export default class Widget extends React.Component {
	static propTypes = {
		selected: PropTypes.bool,
		disabled: PropTypes.bool,
		record  : PropTypes.object.isRequired,
		onSelect: PropTypes.func
	};
	state            = {};
	
	saveState = ( e, d ) => {
		let { $actions, record } = this.props;
		
		e.preventDefault();
		e.stopPropagation();
		$actions.updateWidget(
			{
				...record,
				size    : this.state.size || record.size,
				position: this.state.position || record.position
			});
	};
	
	close = ( e, d ) => {
		let { $actions, children } = this.props;
		e.preventDefault();
		e.stopPropagation();
		$actions.widgetClose();
	};
	
	render() {
		let {
			    record: { position, size } = {},
			    record, children, disabled,
			    $actions, onSelect, selected, title
		    }     = this.props,
		    state = this.state;
		return (
			<Rnd
				className={"Widget"}
				disableDragging={!!disabled}
				enableResizing={disabled}
				dragHandleClassName={"handle"}
				style={selected ? { zIndex: 2000000 } : undefined}
				size={state.size || size}
				position={state.position || position}
				onDragStop={this.saveState}
				onResizeStop={this.saveState}
				onDragStart={( e, d ) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				onDrag={( e, d ) => {
					e.preventDefault();
					e.stopPropagation();
					!selected && onSelect(record)
					this.setState(
						{
							position: { x: d.x, y: d.y }
						});
				}}
				onResize={( e, direction, ref, delta, position ) => {
					this.setState(
						{
							position,
							size: {
								width : ref.offsetWidth,
								height: ref.offsetHeight
							}
						});
				}}>
				<CardHeader
					className={"handle widgetHead"}
					action={
						<IconButton onClick={this.close}>
							<CloseIcon/>
						</IconButton>
					}
					title={title || record.props && record.props.title}
					//subheader={ record && record.label }
				/>
				<div className={" content"}>
					{children}
				</div>
			</Rnd>
		);
	}
};