import React, { Component } from 'react';
import {
  Text, Image, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';

class CustomRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
    };
  }

  render() {
    return (
      <View style= {styles.container}>
      <Image source= {{ uri: this.props.imageUrl }} style = {styles.photo} />
      <View style={styles.container_text}>
            <Text style={styles.title}>
                {this.name}
            </Text>
        </View>
      </View>
    );
  }
}

CustomRow.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },
});

export default CustomRow;