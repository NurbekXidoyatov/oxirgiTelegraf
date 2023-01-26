import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Button,
  Grid,
  Badge,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SendedMessageTableByEMployees() {
  const history = useHistory();

  const { allSendedMessages } = useSelector((state) => state.employeesprofile);
  console.log(allSendedMessages);

  const columns = [
    { name: "XABAR SARLAVHASI", uid: "title" },
    { name: "YUBORILGAN VAQTI", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = allSendedMessages;
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
        return (
          <Grid.Container gap={2}>
            {user.messageStatus === "ACCEPTED" ? (
              <Grid>
                <Button flat auto color="primary">
                  Qabul qilindi
                </Button>
              </Grid>
            ) : null}

            {user.messageStatus === "CANCELED" ? (
              <Grid>
                <Button flat auto color="error">
                  Rad etildi
                </Button>
              </Grid>
            ) : null}

            {user.messageStatus === "SENDING" ? (
              <Grid>
                <Button
                  flat
                  auto
                  color="success"
                  onClick={() => console.log(user.id)}
                >
                  Xabar yuborildi
                </Button>
              </Grid>
            ) : null}

            {user.messageStatus === "READING" ? (
              <Grid>
                <Button
                  flat
                  auto
                  color="warning"
                  onClick={() => console.log(user.id)}
                >
                  Xabar o'qildi
                </Button>
              </Grid>
            ) : null}
          </Grid.Container>
        );
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
                  onClick={() =>
                    history.push(`/separateMessageForSeing/${item.id}`)
                  }
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
