import { Table, Row, Col, User, Text, Tooltip } from "@nextui-org/react";
import { useHistory } from "react-router-dom";

export default function SendedMessageByManagerTable({allMessages}) {
  
  const history = useHistory();

  const columns = [
    { name: "XABAR SARLAVHASI", uid: "title" },
    { name: "YUBORILGAN VAQTI", uid: "createdAt" },
  ];
  const users = allMessages;
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <User
            squared
            src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
            name={cellValue}
            css={{ p: 0 }}
          ></User>
        );
      case "createdAt":
        return (
          <Col>
            <Row>
              <Text b size={14}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );

      case "actions":
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
          <Table.Row
            css={{
              "&:hover": {
                backgroundColor: "#D7F8FE",
              },
            }}
          >
            {(columnKey) => (
              <Table.Cell>
                <Tooltip
                  onClick={() => history.push(`/yuborilganXabarlar/singlemessage/${item.id}`)}
                >
                  {renderCell(item, columnKey)}
                </Tooltip>
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
