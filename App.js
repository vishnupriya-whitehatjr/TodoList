import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      listOfItems: [],
    };
  }

  deleteItem(id) {
    //get all the list items
    const list = this.state.listOfItems;
    //filter the list and create another list which is basically list - item to be deleted
    const updatedList = list.filter((item) => item.id !== id);
    //now set the state with updated list
    this.setState({
      listOfItems: updatedList,
    });
  }
  updateInput(key, value) {
    // update react state
    this.setState({
      [key]: value,
    });
  }
  addItem = () => {
    if (this.state.newItem != "") {
      // create a new item with unique id
      const newItemJSON = {
        id: 1 + Math.random(),
        value: this.state.newItem.slice(),
      };

      // copy current list of items
      const list = this.state.listOfItems;

      // add the new item to the list
      list.push(newItemJSON);

      // update state with new list, reset the new item input
      this.setState({
        listOfItems: list,
        //listOfItems:[...this.state.listOfItems,list],
        newItem: "",
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>To Do List</Text>
        </View>
        <View>
          <TextInput
            placeholder="  Type item here..."
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ newItem: text });
            }}
            value={this.state.newItem}
          ></TextInput>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.addItem}>
              <Text style={styles.buttontext}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <ScrollView>
              {this.state.listOfItems.map((item) => {
                return (
                  <View style={styles.listview}>
                    <Text style={styles.textstyle}> {item.value}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "maroon",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                      }}
                      onPress={() => this.deleteItem(item.id)}
                    >
                      <Text style={{ color: "white" }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  textView: {
    backgroundColor: "maroon",
    height: 80,
  },
  text: {
    textAlign: "center",
    marginTop: "10%",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
    height: 40,
  },
  button: {
    position: "absolute",
    right: 20,
    top: 700,
    backgroundColor: "maroon",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },

  buttontext: {
    color: "#fff",
    fontSize: 24,
  },
  textstyle: {
    fontSize: 20,
    color: "maroon",
  },
  listview: {
    borderWidth: 2,
    height: 40,
    justifyContent: "space-between",
    borderColor: "maroon",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
