/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';


import {Comps}            from 'App/ui';
import React, {Component} from "react";
import Modal              from 'react-responsive-modal';
import {scopeToProps}     from "react-scopes";


@scopeToProps("CurrentUser")
export default class LoginBox extends Component {
	state = { session: {}, showModal: false, lastLoginFail: false };
	
	doSubmit = ( form ) => {
		this.props.$actions.login(
			{
				username: this.state.login,
				password: this.state.pass
			},
			( e, r ) => {
				if ( e ) this.setState({ lastLoginFail: true });
				else this.setState({ showModal: false });
			}
		);
	}
	
	render() {
		let { CurrentUser, $actions } = this.props;
		
		return (
			<span className="LoginBox">
				{
					!CurrentUser &&
					<a className="loginLink material-icons" onClick={() => this.setState({ showModal: true })}
					   title="Connexion">person</a>
				}
				{
					CurrentUser &&
					<React.Fragment>
						<Comps.Image src={CurrentUser.avatar}/>
						<span onClick={$actions.logout}>Sign out</span>
					</React.Fragment>
					
				}
				<Modal open={this.state.showModal}
				       center
				       styles={{ overlay: { zIndex: 200000000 } }}
				       onClose={() => this.setState({ showModal: false })}>
					<h1>Connexion</h1>
					
					<form onKeyPress={
						( e ) => {
							if ( e.charCode == '13' ) {
								e.preventDefault();
								this.doSubmit();
							}
						}}>
						
						<input label="Login / Adresse email" ref="login"
						       type="email"
						       onChange={( e ) => this.setState({ login: e.target.value })}
						       name="login"/>
						
						<input label="Mot de passe" ref="pass" type="password"
						       onChange={( e ) => this.setState({ pass: e.target.value })}
						       name="pass"/>
						{
							this.state.lastLoginFail
							&&
							<div type="danger">
								<strong>Erreur :</strong> Ces identifiant sont incorrects
							</div>
						}
					</form>
					<br/>
					{/*<a className="loginBoxPasswordLost" onClick={this.doFindSubmit}>Mot de passe oublié</a>*/}
					<button className="submit-input" onClick={this.doSubmit}>Connexion</button>
				</Modal>
			</span>
		)
			;
	}
	
};