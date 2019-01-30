import React from 'react';
import { Button } from 'react-native';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      name: ''
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name."
              onChangeText={this.handleName}
            />
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {this.submit}>
               <Text style = {styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
        <Button
            onPress={this.makeRequest}
            title="Press me to make a 3rd party request"
            color="#841584"          
          />
          <Button
            onPress={this.queryDb}
            title="Press me to query our database"
            color="#841584"          
          />
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.names}
            renderItem={({item}) => <Text>{item}</Text>}
            key={(index) => index}
          />
        </View>
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
            keyExtractor={({id}, index) => id}
          />
        </View>
      </View>
    );
  }

  submit = () => {
    fetch('http://3.93.95.228/test', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name : this.state.name
      })
    }).then((response) => console.log(response))
    .then((responseJson) => {
      Alert.alert(
        'Hi!',
        'You submitted your name!')
      console.log(responseJson);
    });
  }

  handleName = (text) => {
    this.setState({ name: text })
  }

  queryDb = () => {
    fetch('http://3.93.95.228/users')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert(
          'Hi!',
          'You queried our db!',
          [
            {text: 'Press me to render the response', onPress: () => {
              this.setState({
                isLoading: false,
                names: responseJson,
              }, function(){
      
              });
              }
            }
          ],
          {cancelable: false},
        );
      });
  };

  makeRequest = () => {
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        Alert.alert(
          'Hi!',
          'You made a 3rd party request!',
          [
            {text: 'Press me to render the response', onPress: () => {
              this.setState({
                isLoading: false,
                dataSource: responseJson.movies,
              }, function(){
      
              });
              }
            }
          ],
          {cancelable: false},
        );
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  }
});
