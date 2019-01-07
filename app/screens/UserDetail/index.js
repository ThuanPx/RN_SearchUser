import React, { Component } from 'react';
import {
  View, Text, Image, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { fetching } from '../../domain/actions/user';


class UserDetail extends Component {
  componentDidMount() {
    if (this.props.navigation.state.params) {
      const user = this.props.navigation.state.params.item;
      this.props.getDetailUser(user.login);
    }
  }

  render() {
    console.log('dataUserDetail', this.props.dataUserDetail);
    if (this.props.dataUserDetail.isFetching) {
      return this.renderLoading();
    }
    return this.renderData();
  }

  renderData() {
    return (
      <SafeAreaView style={{
        flex: 1, alignItems: 'center', marginTop: 20,
      }}>
        {
          (this.props.dataUserDetail.user && this.props.dataUserDetail.user.avatarUrl)
          && <Image source={{ uri: this.props.dataUserDetail.user.avatarUrl }} style={{ width: '50%', height: '30%' }} />
        }
        {
          (this.props.dataUserDetail.user && this.props.dataUserDetail.user.login)
          && <Text style={{ fontSize: 17, marginTop: 20 }}>
            Name: {this.props.dataUserDetail.user.login}
          </Text>
        }
        {
          (this.props.dataUserDetail.user && this.props.dataUserDetail.user.score)
          && <Text style={{ fontSize: 17, marginTop: 20 }}>
            Score: {this.props.dataUserDetail.user.score}
          </Text>
        }

      </SafeAreaView>
    );
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color='#F44336' animating={true} size='large' />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dataUserDetail: state.user,
});

const mapDispatchToProps = dispatch => ({
  getDetailUser: userName => dispatch(fetching(userName)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
