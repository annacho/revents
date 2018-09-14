import React, {Component} from 'react';
// import {Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserDetailHeader from './UserDetailHeader';
import UserDetailDescription from './UserDetailDescription';
import UserDetailSidebar from './UserDetailSidebar';
import UserDetailPhotos from './UserDetailPhotos';
import UserDetailEvents from './UserDetailEvents';

const query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}

class UserDetailPage extends Component {

  render() {
    return (
      <Grid>
        <UserDetailHeader profile={profile}/>
        <UserDetailDescription profile={profile}/>
        <UserDetailSidebar/>
        {photos && photos.length > 0 &&
        <UserDetailPhotos photos={photos} />}
        <UserDetailEvents/>
      </Grid>
    )
  }
}

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firebase.ordered.photos
})

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth)),
)(UserDetailPage);
