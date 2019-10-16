/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Component}     from 'react';
import TweenAxis       from './comps/TweenAxis';
import TweenerContext  from './comps/TweenerContext';
import TweenRef        from './comps/TweenRef';
import asTweener       from './spells/asTweener';
import withTweener     from './spells/withTweener';
import * as tweenTools from './utils/tweenTools.js';

@asTweener
class Tweenable extends Component {
	render() {
		return this.props.children;
	}
}


export {asTweener, withTweener, tweenTools, Tweenable, TweenRef, TweenerContext, TweenAxis};
export default Tweenable;