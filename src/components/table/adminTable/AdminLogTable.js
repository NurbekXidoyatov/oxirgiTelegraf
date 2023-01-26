import { Table, Row, Col, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";

export default function AdminLogTable({adminLog}) {

  const columns = [
    { name: "F.I.SH.", uid: "fullNameNew" },
    { name: "STATUSI", uid: "logStatus" },
    { name: "LAVOZIMI", uid: "jobNameNew" },
    { name: "USERNAME", uid: "usernameNew" },
    { name: "TEL NOMERI", uid: "phoneNumberNew" },
    { name: "O'ZGARGAN VAQTI", uid: "createdAt" },
    { name: "STATUS", uid: "roleName" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = adminLog;
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "fullNameNew":
        return (
          <User squared src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"} name={cellValue} css={{ p: 0 }}>
          </User>
        );
        case "logStatus":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "jobNameNew":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
        case "usernameNew":
          return (
            <Col>
              <Row>
                <Text b size={14}>
                  {cellValue}
                </Text>
              </Row>
            </Col>
          );
        case "phoneNumberNew":
          return (
            <Col>
              <Row>
                <Text b size={14} css={{ tt: "capitalize" }}>
                  {cellValue}
                </Text>
              </Row>
              <Row>
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
                <Row>
                </Row>
              </Col>
            );
      case "roleName":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;
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