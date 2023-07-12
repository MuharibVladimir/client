import React, { useState } from "react";
import { IUser } from "../models/IUser";
import { Table, Space, Button } from "antd";
import {
  useBanUserMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
  useUnBanUserMutation,
} from "../services/UserService";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery(5);
  const [banUser, { isSuccess: isBanSuccess }] = useBanUserMutation();
  const [unBanUser, { isSuccess: IsUnbanSuccess }] = useUnBanUserMutation();
  const [deleteUsers, { isSuccess: isSuccessDelete }] =
    useDeleteUsersMutation();

  const usersWithKey = data?.map((user) => ({
    ...user,
    key: user.id,
  }));
  console.log(usersWithKey);

  const columns: ColumnsType<IUser> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date of registration",
      dataIndex: "registerDate",
      render: (_: any, record) => {
        return <p>{moment(record.registerDate).locale("ru").format("LLL")}</p>;
      },
    },
    {
      title: "Date of last login",
      dataIndex: "lastLoginDate",
      render: (_: any, record) => {
        return <p>{moment(record.lastLoginDate).locale("ru").format("LLL")}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const deleteRows = (ids: string[]) => {
    setLoading(true);
    console.log(ids);
    deleteUsers(ids);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const banSelected = (ids: string[]) => {
    setLoading(true);
    console.log(ids);
    banUser(ids);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const unbanSelected = (ids: string[]) => {
    setLoading(true);
    console.log(ids);
    unBanUser(ids);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button
              type="primary"
              onClick={() =>
                banSelected(rowSelection.selectedRowKeys as string[])
              }
              disabled={!hasSelected}
              loading={loading}
            >
              Block
            </Button>

            <Button
              type="primary"
              onClick={() =>
                unbanSelected(rowSelection.selectedRowKeys as string[])
              }
              disabled={!hasSelected}
              loading={loading}
            >
              Unblock
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() =>
                deleteRows(rowSelection.selectedRowKeys as string[])
              }
              disabled={!hasSelected}
              loading={loading}
            >
              {/* Delete */}
            </Button>
          </Space>

          <span style={{ marginLeft: 8 }}>
            {hasSelected
              ? `Selected ${selectedRowKeys.length} items, ${selectedRowKeys}`
              : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={usersWithKey}
        />
      </div>
    </>
  );
};

export default Users;
