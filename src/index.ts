
/* IMPORT */

import {Container as BaseContainer} from 'unstated';

/* CONTAINER */

class Container<State extends object> extends BaseContainer<State> {

  private _listeners: Function[];
  private _isSuspending = false;

  async setState ( updater: ( ( prevState: Readonly<State> ) => Partial<State> | State | null) | Partial<State> | State | null, callback?: Function ): Promise<void> {

    let nextState;

    if ( typeof updater === 'function' ) {
      nextState = ( updater as Function )( this.state ); //TSC
    } else {
      nextState = updater;
    }

    if ( nextState == null ) {
      if ( callback ) callback ();
      return;
    }

    this.state = Object.assign ( {}, this.state, nextState );

    this._updateEmit ( callback );

  }

  suspend (): void {
    this._isSuspending = true;
  }

  unsuspend ( callback?: Function ): void {
	
	if ( !this._isSuspending ) return;
	
	this._isSuspending = false;

	this._updateEmit ( callback );
	
  }

  private _updateEmit ( callback?: Function ): void {

    if ( this._isSuspending ) return;

    const promises = this._listeners.map ( listener => listener () );

    Promise.all ( promises ).then ( () => {
      if ( callback ) callback ();
    });

  }

}

/* EXPORT */

export {Container};
