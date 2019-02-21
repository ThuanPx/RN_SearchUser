import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView, Text, TextInput, TouchableHighlight, StyleSheet, ActivityIndicator, View, FlatList,
  Image,
} from 'react-native';
import { fetching } from '../../domain/actions/github';
import I18n from '../../locales/i18n';
import CustomRow from '../../ultis/CustomRow';


class Home extends Component {
  static navigationOptions = {
    title: I18n.t('Home'),
  };

  constructor(props) {
    super(props);
    this.state = {
      textSearch: 'Thuan',
      isRefresh: false,
    };
  }

  render() {
    console.log('default user');
    console.log(this.props.github);
    return this.renderData();
  }

  renderLoading() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true}
          color="#F44336"
          style={{ height: 80, marginTop: 10 }}
          size="large" />
      </View>
    );
  }

  renderData() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter User"
            value={this.state.textSearch}
            onChangeText={textSearch => this.setState({ textSearch })}
          />
          <TouchableHighlight
            style={styles.containerText}
            underlayColor="#fff"
            onPress={() => {
              this.props.searchUser(this.state.textSearch);
              this.setState({ isRefresh: false });
            }}>
            <Text style={styles.text}> Search User </Text>
          </TouchableHighlight>
          <View style={{ width: '100%', flex: 1 }}>
            {
              (this.props.github.users && this.props.github.users.length > 0) ? <FlatList

                style={styles.flatlist}
                data={this.props.github.users}
                extraData={this.state}
                renderItem={({ item }) => this.renderItemFlatList(item)}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => {
                  this.props.searchUser(this.state.textSearch);
                  this.setState({ isRefresh: true });
                }}
                refreshing={this.props.github.isFetching}
              /> : this.renderEmptyData()
            }
          </View>
        </View>
        {(this.props.github.isFetching && !this.state.isRefresh)
          && <View style={{ alignSelf: 'center', flex: 1 }}>
            <ActivityIndicator animating={true}
              color="#F44336"
              size="large" />
          </View>
        }

      </SafeAreaView>
    );
  }

  renderItemFlatList(item) {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => this.onItemClick(item)}
      >
        <CustomRow
          name={item.login}
          imageUrl={item.avatarUrl}
        />
        {/* <View style={{ flex: 1 }}>
          <View style={styles.itemFlatContainer}>
            <Image source={{ uri: item.avatarUrl }}
              style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
            <Text style={{ marginStart: 10, alignSelf: 'center', fontSize: 17 }}>
            {item.login}
            </Text>
          </View>
          <View style={{ backgroundColor: '#9b9b9b', width: '100%', height: 0.5 }} />
        </View> */}
      </TouchableHighlight>
    );
  }

  onItemClick(item) {
    this.props.navigation.navigate('UserDetail', {
      item,
    });
  }


  renderEmptyData() {
    return (
      <Text style={{
        fontSize: 20, flex: 1, alignSelf: 'center', marginTop: 20,
      }}>Không có data</Text>
    );
  }
}

const white = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    width: '80%',
    fontSize: 17,
  },
  text: {
    color: white,
    textAlign: 'center',
    fontSize: 17,
    paddingLeft: 10,
    paddingRight: 10,

  },
  containerText: {
    height: 40,
    width: '80%',
    backgroundColor: '#1E6738',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    marginBottom: 5,
    marginTop: 10,
  },
  itemFlatContainer: {
    margin: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  github: state.github,
});

const mapDispatchToProps = dispatch => ({
  searchUser: textSearch => dispatch(fetching(textSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
