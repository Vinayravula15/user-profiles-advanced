import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const showEditModal = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleSave = (values) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u))
    );
    setIsModalVisible(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        User Profiles
      </Title>
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
            <Card
              cover={
                <img
                  alt={user.name}
                  src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                  style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                />
              }
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => showEditModal(user)}
                >
                  Edit
                </Button>,
              ]}
            >
              <Card.Meta
                title={user.name}
                description={
                  <div>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={`http://${user.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.website}
                      </a>
                    </p>
                    <p>
                      <strong>Company:</strong> {user.company.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {user.address.street},{" "}
                      {user.address.city}
                    </p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {editingUser && (
          <Form
            layout="vertical"
            initialValues={editingUser}
            onFinish={handleSave}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default App;
