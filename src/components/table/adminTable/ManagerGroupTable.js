import { Table, Row, Col, User, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { IconButton } from "./IconButton";
import { useState } from "react";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useHttp } from "../../AsyncURL/useHttp";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteGroup } from "../../ManagerGuruh/managerGuruhSlice";
import { UniversalURL } from "../../AsyncURL/BaseUrl";
import DeleteModal from "../../deleteModal/DeleteModal";

export default function AdminTable() {
  const { request } = useHttp();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [getId, setGetId] = useState("")

  const deleteM = (id) => {
    setShowDeleteModal(!showDeleteModal)
    setGetId(id)
  }

  const deleteGuruhHandler = (id) => {
    request(`${UniversalURL}group/delete/${id}`, "DELETE", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((data) => console.log(data + "Deleted"))
      .then(dispatch(deleteGroup(id)))
      .catch((error) => console.log(error));
      setShowDeleteModal(!showDeleteModal)
  };

  const { groups } = useSelector((state) => state.groups);

  const columns = [
    { name: "GURUHLAR NOMI", uid: "name" },
    { name: "XODIMLAR SONI", uid: "users" },
    { name: "YARATILGAN VAQTI", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = groups;
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            squared
            src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
            name={cellValue}
            css={{ p: 0 }}
          ></User>
        );
      case "users":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue.length}
              </Text>
            </Row>
          </Col>
        );
        case "createdAt":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <IconButton onClick={() => console.log("View user", user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Col>
            <Col css={{ d: "flex" }}>
              <IconButton onClick={() => history.push(`/editmanagerguruh/${user.id}`)}>
                <EditIcon size={20} fill="#F5A524" />
              </IconButton>
            </Col>
            <Col css={{ d: "flex" }}>
              <IconButton onClick={() => deleteM(user.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <div>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {showDeleteModal ? <DeleteModal deleteAdminHandler={deleteGuruhHandler} getId={getId} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/> : null}
    </div>
  );
}
