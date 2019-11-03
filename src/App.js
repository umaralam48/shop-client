import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import AppBar from "./components/AppBar";
import ItemsMarkup from "./components/items";
import Context from "./components/categoryContext";

axios.defaults.baseURL = "http://192.168.43.186:4000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    this.updateCategories();
    axios
      .get("/item")
      .then(res => {
        console.log(res.data);
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log(err));
  }

  getCategories = () => {
    return axios.get("/category");
  };

  updateCategories = async () => {
    let newcat = await this.getCategories();
    console.log(newcat.data);
    this.setState({ categories: newcat.data });
  };

  handleSubmit = search => {
    axios
      .get("http://192.168.43.186:4000/item/" + search)
      .then(res => {
        console.log(res.data);
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Context.Provider
        value={{
          categories: this.state.categories,
          updateCategories: this.updateCategories
        }}
      >
        <div className="App">
          <AppBar searchHandlers={this.handleSubmit} />
          <ItemsMarkup items={this.state.items} />
        </div>
      </Context.Provider>
    );
  }
}

export default App;
