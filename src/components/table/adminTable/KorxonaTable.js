import { useState } from "react";
import { Table, Row, Col, User, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useHttp } from "../../AsyncURL/useHttp";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UniversalURL } from "../../AsyncURL/BaseUrl";
import { deleteorganization } from "../../Guruhlar/organizationSlice";
import DeleteModal from "../../deleteModal/DeleteModal";

export default function KorxonaTable() {
  const { request } = useHttp();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [getId, setGetId] = useState("")

  const deleteM = (id) => {
    setShowDeleteModal(!showDeleteModal)
    setGetId(id)
  }


  const deleteOrganizationHandler = (id) => {
    request(`${UniversalURL}organization/delete/${id}`, "DELETE", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((data) => console.log(data + "Deleted"))
      .then(dispatch(deleteorganization(id)))
      .catch((error) => console.log(error));
      setShowDeleteModal(!showDeleteModal)
  };

  const { organizations } = useSelector((state) => state.organizations);

  const columns = [
    { name: "KORXONA NOMI", uid: "name" },
    { name: "KORXONA RAQAMI", uid: "phoneNumber" },
    { name: "UZEL NOMI", uid: "parentName" },
    { name: "YARATILGAN VAQTI", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = organizations;
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
      case "phoneNumber":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <IconButton
                onClick={() => history.push(`/editkorxona/${user.id}`)}
              >
                <EditIcon size={20} fill="#F5A524" />
              </IconButton>
            </Col>
            <Col css={{ d: "flex" }}>
                <IconButton  onClick={() => deleteM(user.id)}>
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
      {showDeleteModal ? <DeleteModal deleteAdminHandler={deleteOrganizationHandler} getId={getId} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/> : null}
    </div>
  );
}
