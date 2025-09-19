import React from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserCard = ({ user, onEdit, onDelete }) => (
  <Card
    hoverable
    cover={
      <img
        src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
        alt={user.name}
        style={{ height: "200px", objectFit: "contain", padding: "10px" }}
      />
    }
    actions={[
      <Button type="link" icon={<EditOutlined />} onClick={onEdit}>
        Edit
      </Button>,
      <Button type="link" icon={<DeleteOutlined />} onClick={onDelete}>
        Delete
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
            <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
          </p>
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
          <p>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
          </p>
        </div>
      }
    />
  </Card>
);

export default UserCard;
