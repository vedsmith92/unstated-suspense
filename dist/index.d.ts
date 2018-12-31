import { Container as BaseContainer } from 'unstated';
declare class Container<State extends object> extends BaseContainer<State> {
    private _listeners;
    private _isSuspending;
    setState(updater: ((prevState: Readonly<State>) => Partial<State> | State | null) | Partial<State> | State | null, callback?: Function): Promise<void>;
    suspend(): void;
    unsuspend(callback?: Function): void;
    private _updateEmit;
}
export { Container };
