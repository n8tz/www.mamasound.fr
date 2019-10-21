/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
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
	//0235034185 service
	close     = ( e, d ) => {
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
		    state = this.state,
		    wPos  = state.position || position,
		    wSize = { ...(state.size || size) };
		if ( !__IS_SERVER__ ) {
			if ( window.innerHeight < (wPos.y + wSize.height) )
				wSize.height = Math.min(window.innerHeight, wPos.y + wSize.height) - wPos.y - 5
			if ( window.innerWidth < (wPos.x + wSize.width) )
				wSize.width = Math.min(window.innerWidth, wPos.x + wSize.width) - wPos.x - 5
		}
		//console.log(position)
		return (
			<Rnd
				className={"Widget"}
				disableDragging={!!disabled}
				enableResizing={disabled}
				dragHandleClassName={"widgetHandle"}
				style={selected ? { zIndex: 2000000 } : undefined}
				size={wSize}
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
				<div className={"widgetHandle widgetHead"}>
					<span className={"title"}>{title || record.props && record.props.title}</span>
					<span className={"material-icons icon"} onClick={this.close}>close</span>
				</div>
				<div className={" content"}>
					{children}
				</div>
			</Rnd>
		);
	}
};