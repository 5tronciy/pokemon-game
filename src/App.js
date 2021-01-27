import "./App.css";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import bg3 from "./assets/bg3.jpg";

const App = () => {
  return (
    <>
      <Header title="Pokemon" description="card game" />
      <Layout
        id="1"
        title="title1"
        description="Lorem ..."
        urlBackground={bg1}
        colorBackground="yellow"
      />
      <Layout
        id="2"
        title="title2"
        description="Lorem ..."
        urlBackground={bg2}
        colorBackground="blue"
      />
      <Layout
        id="3"
        title="title3"
        description="Lorem ..."
        urlBackground={bg3}
        colorBackground="green"
      />
      <Footer />
    </>
  );
};

export default App;
