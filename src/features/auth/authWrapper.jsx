import { connectedReduxRedirect } from 'redux-auth-wrapper/histtory4/redirect';
import { openModal } from '../modals/modalActions';

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: 'UserIsAuthenticated',
  redirectPath: '/events',
  authenticatedSelector: ({firebase: {auth}}) =>
    auth.isLoaded && !auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    dispatch(openModal('UnauthModal'))
  }
})
