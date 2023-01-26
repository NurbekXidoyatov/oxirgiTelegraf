import { useState, useEffect } from "react";
import { Table, Row, Col, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { useHttp } from "../../AsyncURL/useHttp";
import {  useParams } from "react-router-dom";
import { UniversalURL } from "../../AsyncURL/BaseUrl";

export default function SingleMessageTableSendedByManager() {

  const {request} = useHttp()
  var {id} = useParams()
  const [allMessagesForStatus, setallMessagesForStatus] = useState([]);


  useEffect(() => {
    request(`${UniversalURL}message/find-employee/${id}`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        setallMessagesForStatus(response?.data?.content)
      })
      .catch(error => console.log(error))
  }, [id])

  const columns = [
    { name: "F.I.SH.", uid: "employee" },
    { name: "KORXONASI", uid: "employeeOrg" },
    { name: "TELEFON RAQAMI", uid: "employeePhone" },
    { name: "YUBORILGAN VAQTI", uid: "sendDate" },
    { name: "TASDIQLANGANLIGI", uid: "messageStatus" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = allMessagesForStatus;
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "employee":
        return (
          <User squared src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"} name={cellValue} css={{ p: 0 }}>
          </User>
        );
      case "employeePhone":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "employeeOrg":
          return (
            <Col>
              <Row>
                <Text b size={14}>
                  {cellValue}
                </Text>
              </Row>
            </Col>
          );
        case "sendDate":
          return (
            <Col>
              <Row>
                <Text b size={14} css={{ tt: "capitalize" }}>
                  {cellValue}
                </Text>
              </Row>
            </Col>
          );

        case "messageStatus":
            return <StyledBadge type={user?.messageStatus}>{cellValue === "SENDING" ? "Yuborildi" : "Tasdiqlandi"}</StyledBadge>;

    default:
        return cellValue;
    }
  };
  return (
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

  );
}