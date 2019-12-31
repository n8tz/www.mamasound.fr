/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React from 'react';
import is    from 'is';


class Player extends React.Component {
	static defaultProps = {
		volume   : .8,
		jwOptions: {}
	}
	
	constructor( props ) {
		super(props);
		this.state = {
			...(this.state || {}),
			visible: props.visible || false,
			cover  : null,
			volume : is.number(props.volume) ? props.volume : 0.8,
			seekTo : 0
		};
	}
	
	componentWillMount() {
		this._playerId = this._playerId || "jw_" + Math.floor(Math.random() * 1000000);
		//this._needPaint = true;
	}
	
	componentDidMount() {
		this.loadPlayer()
	}
	
	loadPlayer() {
		if ( !this._jwplayer ) {
			try {
				this._jwplayer = jwplayer(this.refs.player);
				this._jwplayer.off('playlistItem', this.onPlayListItem.bind(this));
				this._jwplayer.on('playlistItem', this.onPlayListItem.bind(this));
			} catch ( e ) {
				this._jwplayer = undefined;
				this._loadJwTm = setTimeout(tm => this.loadPlayer(), 500);
			}
		}
		
		if ( this._jwplayer && this.props.item )
			this.playItem(this.props.item, this.props.autoplay);
	}
	
	componentWillReceiveProps( props ) {
		if ( props.item && props.item !== this.props.item && (!props.item || !this.props.item || props.item.mediaUrl !== this.props.item.mediaUrl) )
			this.playItem(props.item, this.props.autoplay);
	}
	
	componentWillUnmount() {
		try {
			this._jwplayer && this._jwplayer.remove();
		} catch ( e ) {
		
		}
		clearTimeout(this._loadJwTm);
	}
	
	onPlayListItem( state ) {
		this._currentItem = state;
		this.props.onPlayDone && this.props.onPlayDone(state);
	}
	
	shouldComponentUpdate( nextProps, nextState ) {
		if ( nextState.volume != this.state.volume ) {
			this._jwplayer.setVolume((nextState.volume * 100));
			
		}
		//debugger
		if ( this.state.seekTo !== nextState.seekTo ) { // seek to chapters
			this._jwplayer.seek(parseInt(nextState.seekTo));
			this._jwplayer.play(true);
			return false;
		}
		if ( this.state.visible !== nextState.visible || this.state.cover !== nextState.cover ) {
			return true;
		}
		
		var r           = this._needPaint;
		this._needPaint = false;
		return r;
	}
	
	stop() {
		this._jwplayer && this._jwplayer.stop();
		this.setState({ visible: false });
	}
	
	playItem( record, play, defaultCover ) {
		//
		// if ( !this._jwplayer ) {
		//     // console.warn('gfhgfhgfhfgghf');
		//     this._jwplayer = jwplayer(this._playerId);
		//     this._jwplayer.off('playlistItem', this.onPlayListItem.bind(this));
		//     this._jwplayer.on('playlistItem', this.onPlayListItem.bind(this));
		// }
		if ( record ) {
			var url      = record.previewUrl || defaultCover;
			var mediaUrl = record.mediaUrl;
			
			var jwOptions = {
				width     : "100%",
				height    : "100%",
				//aspectratio: "16:9",
				image     : url,
				autostart : play && "viewable",
				stretching: "fill",
				...record.jwOptions,
				...this.props.jwOptions
			};
			//debugger
			if ( record.mediaUrls ) {
				jwOptions.sources = Object.keys(record.mediaUrls).map(
					( k ) => ({
						file     : record.mediaUrls[k],
						label    : k,
						"default": (k == "480p").toString(),
						autoplay : play,
						autostart: play && "viewable"
					})
				);
			}
			else {
				jwOptions.file = mediaUrl;
			}
			
			this._jwplayer.setup(jwOptions);
			
			//this.setState({ visible: true });
			
			this._jwplayer.off('complete');
			this._jwplayer.on('complete', this.onPlayListItem.bind(this));
			this._jwplayer.off('ready');
			//this._jwplayer.on('ready', e=>this._jwplayer.play(true));
			play && setTimeout(e => this._jwplayer.play(true), 1000);
			
			this._jwplayer.setVolume((this.state.volume * 100));
			this._jwplayer.off('volume');
			this._jwplayer.on('volume', function ( volume ) {
				var newVolume = volume.volume;
				newVolume     = newVolume / 100;
				var me        = this;
				
				if ( typeof me.props.onVolumeChange === 'function' ) { // send it to component parent
					me.props.onVolumeChange(newVolume);
				}
				
			}.bind(this));
		}
	}
	
	loadPlaylist( records ) {
		this._jwplayer.setup(
			{
				width      : "100%",
				aspectratio: "16:9",
				playlist   : records,
				skin       : {}
			}
		);
		
		this._jwplayer.off('playlistItem', this.onPlayListItem.bind(this));
		this._jwplayer.on('playlistItem', this.onPlayListItem.bind(this));
	}
	
	toggleFullscreen() {
		var me = this;
		if ( typeof me.props.toggleFullscreen === 'function' ) { // send it to component parent
			me.props.toggleFullscreen();
		}
	}
	
	render() {
		return (
			<div className={(this.props.className || "vidPlayer") + " " +
			                this.state.visible ? "active-player" : "inactive-player"} onClick={this.props.onClick}
			     style={this.props.style}
			>
				
				<div className="jwplayer" ref="player"/>
			
			</div>
		);
	}
}
;
/*
 
 
 <div className="jw-icon jw-icon-inline jw-button-color jw-reset jw-icon-fullscreen" onClick={this.toggleFullscreen.bind(this)}></div>*
 
 */
Player.defaultProps = {};

export default Player;
