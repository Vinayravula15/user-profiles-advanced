import React from "react";
import { Modal, Form, Input, Button } from "antd";

const EditUserModal = ({ open, user, onCancel, onSave }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(user || {});
  }, [user, form]);

  const handleFinish = (values) => {
    onSave({ ...user, ...values });
  };

  return (
    <Modal title="Edit User" open={open} onCancel={onCancel} footer={null}>
      {user && (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
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
  );
};

export default EditUserModal;
