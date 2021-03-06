/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React                            from "react";
import {asTweener, TweenAxis, TweenRef} from "react-voodoo";


/**
 * This is an experimental lib
 *
 */
const CardXAxis =
	      [
		      {
			      from    : 0,
			      duration: 50,
			      apply   : {
				      transform: [
					      { translateZ: 50 },
					      { rotateY: "-90deg" }
				      ],
			      }
		      },
		      {
			      from    : 50,
			      duration: .1,
			      apply   : {
				      transform: [
					      {},
					      { rotateY: "180deg" }
				      ],
			      }
		      },
		      {
			      from    : 50,
			      duration: 50,
			      apply   : {
				      transform: [
					      { translateZ: -50 },
					      { rotateY: "-90deg" }
				      ],
			      }
		      },
	      ],
      cardStyle =
	      {
		      position: "relative",
		
		      transform: [
			      {
				      perspective: 500,
				      translateZ : 0
			      }
		      ]
	      };

@asTweener({ enableMouseDrag: true })
class SwipeableCard extends React.Component {
	static defaultProps = {
		swipeAnim: CardXAxis,
		style    : cardStyle,
		showBack : false
	};
	state               = {};
	
	constructor() {
		super(...arguments);
		this._flipEvent = [
			{
				type    : "Event",
				from    : 50,
				duration: .01,
				entering: ( pos ) => this.setState({ showBack: pos === 1 })
			},
		]
	}
	
	
	static getDerivedStateFromProps( props, state ) {
		let { swipeAnim, style } = props;
		return {
			swipeAnim: { scrollX: swipeAnim },
			style,
			showBack : state.showBack === undefined ? props.showBack : state.showBack
		}
	}
	
	render() {
		let {
			    swipeAnim, style,
			    showBack
		    } = this.state;
		return <>
			<TweenAxis
				axe={"scrollX"}
				scrollableWindow={100}
				items={this._flipEvent}
				defaultPosition={showBack ? 100 : 0}
				inertia={{
					wayPoints: [{ at: 0 }, { at: 100 }],
				}}
			/>
			<TweenRef id="card"
			          tweenAxis={swipeAnim}
			          initial={style}>
				<div className={"SwipeableCard"}>
					{this.props.children && this.props.children[showBack ? 1 : 0]}
				</div>
			</TweenRef>
		</>;
	}
}


export default class Sample extends React.Component {
	render() {
		return <div className={"SwipeableCards"}>
			{
				Array(20).fill(null).map(
					( e, i ) =>
						<SwipeableCard key={i} showBack={!!(i % 3)}>
							<div className={"frontCard"}>
								<div className={"description"}>front {i}</div>
							</div>
							<div className={"backCard"}>
								<div className={"description"}>back {i}</div>
							</div>
						</SwipeableCard>
				)
			}
		</div>;
	}
}