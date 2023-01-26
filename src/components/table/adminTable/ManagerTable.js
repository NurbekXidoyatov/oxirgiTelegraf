import { useState } from "react";
import { Table, Row, Col, User, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useHttp } from "../../AsyncURL/useHttp";
import { useDispatch } from "react-redux";
import { deleteManager } from "../../Managers/managerSlice";
import { UniversalURL } from "../../AsyncURL/BaseUrl";
import DeleteModal from "../../deleteModal/DeleteModal";
import EditManager from "../../Managers/EditManager";

export default function ManagerTable({page, getAllManagers}) {

  const {request} = useHttp()
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [getId, setGetId] = useState("")
  const [showEditModal, setShowEditModal] = useState(false);

  const editM = (id) => {
    setShowEditModal(!showEditModal)
    setGetId(id)
  }

  const deleteM = (id) => {
    setShowDeleteModal(!showDeleteModal)
    setGetId(id)
  }

  const deleteManagerHandler = (id) => {

    request(`${UniversalURL}admin/delete/${id}`, "DELETE", null, {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      "Content-type":"application/json"
    })
    .then(data => console.log(data + "Deleted"))
    .then(dispatch(deleteManager(id)))
    .catch(error => console.log(error))
    setShowDeleteModal(!showDeleteModal)
  }


  const {managers} = useSelector(state => state.managers)

  const columns = [
    { name: "F.I.O", uid: "fullName" },
    { name: "LAVOZIMI", uid: "jobName" },
    { name: "USERNAME", uid: "username" },
    { name: "TEL NOMERI", uid: "phoneNumber" },
    { name: "STATUS", uid: "roles" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = managers;
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "fullName":
        return (
          <User squared src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"} name={cellValue} css={{ p: 0 }}>
          </User>
        );
      case "jobName":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "username":
          return (
            <Col>
              <Row>
                <Text b size={14}>
                  {cellValue}
                </Text>
              </Row>
            </Col>
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
      case "roles":
        return <StyledBadge type={user.status}>{cellValue[0].name}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
                <IconButton onClick={() => editM(user.id)}>
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
      {showDeleteModal ? <DeleteModal deleteAdminHandler={deleteManagerHandler} getId={getId} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/> : null}
      {showEditModal ? <EditManager getId={getId} setShowEditModal = {setShowEditModal} showEditModal={showEditModal} getAllManagers={getAllManagers} page={page}/> : null}
    </div>
  );
}