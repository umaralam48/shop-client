import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import AppBar from "./components/AppBar";
import ItemsMarkup from "./components/items";
import Context from "./components/dataContext";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import themeFile from "./util/theme";

//axios.defaults.baseURL = "http://192.168.43.186:4000";
///?/?console.log(?!(.err)) remove console.logs
const theme = createMuiTheme(themeFile);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: []
    };
    this.update = action => {
      this.updateAppData();
      // const categories = this.state.categories;
      // if (action == "delete") {
      //   categories.splice(categories.indexOf(category), 1);
      //   this.setState({ categories: categories });
      // } else {
      //   categories.push(category);
      //   this.setState({ categories: categories });
      // }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.updateAppData = this.updateAppData.bind(this);
  }

  componentDidMount() {
    // this.fetchItems();
    // this.fetchCategories();
    this.updateAppData();
  }

  updateAppData = () => {
    Promise.all([this.fetchItems(), this.fetchCategories()]).then(data => {
      //console.log(data[0], data[1]);
      this.setState({
        items: data[0],
        categories: data[1]
      });
    });
  };

  fetchItems = async () => {
    try {
      let newitems = await axios.get("/item");
      //console.log(newitems);
      return newitems.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  fetchCategories = async () => {
    try {
      let newcat = await axios.get("/category");
      //console.log(newcat);
      return newcat.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // updateCategories = async () => {
  //   let newcat = await this.getCategories();
  //   //console.log(newcat.data);
  //   this.setState({ categories: newcat.data });
  // };

  handleSubmit = search => {
    axios
      .get("http://192.168.43.186:4000/item/" + search)
      .then(res => {
        //console.log(res.data);
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    //console.log("APP rerendering");
    //console.log(this.state);
    return (
      <Context.Provider
        value={{
          categories: this.state.categories,
          update: this.update
        }}
      >
        <ThemeProvider theme={theme}>
          <div className="App">
            <AppBar searchHandlers={this.handleSubmit} />
            <ItemsMarkup items={this.state.items} />
          </div>
        </ThemeProvider>
      </Context.Provider>
    );
  }
}

export default App;
