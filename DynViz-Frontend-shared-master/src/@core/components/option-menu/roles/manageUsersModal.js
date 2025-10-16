import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Select, Spin } from 'antd';
import getRoles from 'src/api/roles/getRoles';
import getUser from 'src/api/user/getUser';

const { Option } = Select;

const ManageUsersModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getRoles();
        if (response.code === 200) {
          setRoles(response.Data);
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUser();
        if (response.code === 200) {
          setUsers(response.Data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
    fetchUsers();
  }, []);

  const handleUserChange = (value) => {
    setSelectedUsers(value);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleSubmit = () => {
    console.log('Selected Users:', selectedUsers);
    console.log('Selected Role:', selectedRole);
    // Handle form submission here
    onClose();
  };

  return (
    <Modal
      title="Manage Users"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <Form layout="vertical">
          <Form.Item label="Select Users">
            <Select
              mode="multiple"
              placeholder="Select users"
              onChange={handleUserChange}
            >
              {users.map((user) => (
                <Option key={user.ID} value={user.ID}>
                  {`${user.Name} - ${user.ID}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Select Role">
            <Select placeholder="Select role" onChange={handleRoleChange}>
              {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ManageUsersModal;
