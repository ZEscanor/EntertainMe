import { Layout } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ backgroundColor: "#1890ff", textAlign: "center", padding: "16px" }}>
      <h1 style={{ color: "white", fontSize: "24px", margin: 0 }}>Find Tickets and Events Near your Location!</h1>
    </Header>
  );
};

export default Navbar;