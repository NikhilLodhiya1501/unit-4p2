
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";
import "./App.css";

const orders = [
  { id: "#SC101", item: "Wireless Headphones", price: "₹2,499", status: "Processing" },
  { id: "#SC102", item: "Smart Watch", price: "₹3,999", status: "Shipped" },
  { id: "#SC103", item: "Mechanical Keyboard", price: "₹1,899", status: "Delivered" }
];

function Dashboard() {
  return <>
    <div className="welcome"><p>SMARTCART / OVERVIEW</p><h1>Order Command Center</h1><span>Your store at a glance.</span></div>
    <div className="metrics">
      <div className="metric"><span>Total Orders</span><h2>128</h2><small>↗ Store activity</small></div>
      <div className="metric"><span>Revenue</span><h2>₹48.5K</h2><small>↗ Sales overview</small></div>
      <div className="metric"><span>Pending</span><h2>08</h2><small>Needs attention</small></div>
    </div>
    <OrdersList filter="All Orders" />
  </>;
}

function OrdersList({ filter }) {
  const data = filter === "Current Orders"
    ? orders.filter(o => o.status !== "Delivered")
    : filter === "Order History"
    ? orders.filter(o => o.status === "Delivered")
    : filter === "Cancelled Orders" ? [] : orders;

  return <div className="panel">
    <h2>{filter}</h2>
    {data.map(o => <div className="order-row" key={o.id}>
      <div><b>{o.item}</b><p>{o.id}</p></div>
      <strong>{o.price}</strong>
      <span className={"status " + o.status.toLowerCase()}>{o.status}</span>
    </div>)}
    {data.length === 0 && <p>No cancelled orders currently.</p>}
  </div>;
}

function OrdersLayout() {
  return <><div className="welcome"><p>SMARTCART / MANAGEMENT</p><h1>Orders</h1></div>
    <div className="subnav">
      <NavLink to="current">Current Orders</NavLink>
      <NavLink to="history">Order History</NavLink>
      <NavLink to="cancelled">Cancelled Orders</NavLink>
    </div>
    <div className="panel"><Outlet /></div>
  </>;
}

export default function App() {
  return <BrowserRouter><div className="dashboard">
    <aside className="sidebar">
      <h2>◈ Smart<span>Cart</span></h2>
      <p className="side-label">WORKSPACE</p>
      <NavLink to="/" end>▦ Overview</NavLink>
      <NavLink to="/orders">▤ Orders</NavLink>
      <div className="profile"><div className="avatar">S</div><div><b>Store Admin</b><p>Administrator</p></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><span>Good day, Admin 👋</span><span className="online">● System online</span></header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersLayout />}>
          <Route index element={<OrdersList filter="All Orders" />} />
          <Route path="current" element={<OrdersList filter="Current Orders" />} />
          <Route path="history" element={<OrdersList filter="Order History" />} />
          <Route path="cancelled" element={<OrdersList filter="Cancelled Orders" />} />
        </Route>
      </Routes>
    </main>
  </div></BrowserRouter>;
}