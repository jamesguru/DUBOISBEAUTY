import React, { useEffect } from "react";
import styled from "styled-components";
import { logOut } from "../redux/userRedux";
import JsPDF from "jspdf";
import "../styles/menu.css";
import Table from "react-bootstrap/Table";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import DashBoard from "./DashBoard";
import Seller from "./Seller";
import ProductsModal from "../components/ProductsModal";
import { useSelector, useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Products from "../components/Products";
import Product from "../components/Product";
import { publicRequest } from "../requestMethods";
import { FontDownload, FontDownloadOutlined } from "@material-ui/icons";
const Container = styled.div`
  margin: 50px;
  font-weight: 900px;
`;

const Wrapper = styled.div`
  display: flex;

  padding: 5px;

  flex-wrap: wrap;

  margin: 10px;

  @media screen and (max-width: 600px) {
    margin: 10px;
  }
`;

const Left = styled.div`
  flex: 1;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const Right = styled.div`
  flex: 4;
`;

const Button = styled.button`
  margin: 10px 0px;
  padding: 15px;
  font-size: 15px;
  font-weight: 900;
  border: none;

  color: #dcca87;
  background-color: #0c0c0c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Header = styled.h5`
  font-family: "Roboto";
`;

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const [products, setproducts] = React.useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    setOpen(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logOut());
    history.push("/seller");
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          `/products?category=${user.seller}`
        );

        setproducts(res.data);
      } catch (error) {}
    };

    getProducts();
  }, []);

  const generatePDF = () => {
    const report = new JsPDF("landscape", "pt", "a3");
    report.html(document.querySelector(".product")).then(() => {
      report.save("products.pdf");
    });
  };

  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Home">
          <Button onClick={generatePDF}>
            Download PDF <FontDownload></FontDownload>
          </Button>
          <div className="product">
            <Header>Credence Products</Header>
            <Wrapper>
              {products.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </Wrapper>
          </div>
        </Tab>
        <Tab eventKey="home" title="Add Product">
          <DashBoard />
        </Tab>
        <Tab eventKey="manage" title="Manage">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="contact" title="My Account">
          <Button onClick={handleLogout}>Logout</Button>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Menu;
