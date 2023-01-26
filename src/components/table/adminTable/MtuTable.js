import { useState } from "react";
import { Table, Row, Col, User } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useHttp } from "../../AsyncURL/useHttp";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UniversalURL } from "../../AsyncURL/BaseUrl";
import { deleteDepartment } from "../../Department/departmentSlice";
import DeleteModal from "../../deleteModal/DeleteModal";

export default function MtuTable({getAllDepartments, page}) {

  const {request} = useHttp()
  const history = useHistory()
  const dispatch = useDispatch()
  const {departments} = useSelector(state => state.departments)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [getId, setGetId] = useState("")

  const deleteM = (id) => {
    setShowDeleteModal(!showDeleteModal)
    setGetId(id)
  }


  const deleteOrganizationHandler = (id) => {

    request(`${UniversalURL}organization/delete/${id}`, "DELETE", null, {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      "Content-type":"application/json"
    })
    .then(data => {
      if(data){
        getAllDepartments(page);
      }
    })
    .then(dispatch(deleteDepartment(id)))
    .catch(error => console.log(error))
    setShowDeleteModal(!showDeleteModal)
  }



  const columns = [
    { name: "UZELLAR NOMI", uid: "name" },
    { name: "YARATILGAN VAQTI", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = departments;
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"} name={cellValue} css={{ p: 0 }}>
          </User>
        );
      case "actions":
        return (
          <Row justify="center" align="center">

            <Col css={{ d: "flex" }}>

                <IconButton onClick={() => history.push(`/editdepartment/${user.id}`)}>
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
      {showDeleteModal ? <DeleteModal deleteAdminHandler={deleteOrganizationHandler} getId={getId} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/> : null}
    </div>
  );
}