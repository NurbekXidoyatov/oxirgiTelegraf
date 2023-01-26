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
  import { useHistory } from "react-router-dom";
  
  export default function SendedmessageTableByOrgToManager({ allAcceptedMessagesFromOrg, showSeparateMessageModal}) {


    const history = useHistory();


    const columns = [
      { name: "XABAR MATNI", uid: "title" },
      { name: "YUBORILGAN VAQTI", uid: "createdAt" },
      { name: "ACTIONS", uid: "actions" },
    ];
    const users = allAcceptedMessagesFromOrg;
    const renderCell = (user, columnKey) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "title":
          return user.messageStatus === "SENDING" ? (
            <Badge content="new" color="error" placement="top-right" size="xs">
              <User
                squared
                src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                name={cellValue}
                css={{ p: 0 }}
              ></User>
            </Badge>
          ) : (
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
                <Text b size={14} css={{ tt: "capitalize" }}>
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
                    <Badge enableShadow disableOutline color="success">
                      Qabul qilindi
                    </Badge>
                  </Grid>
                ) : null}
                {user.messageStatus === "CANCELED" ? (
                  <Grid>
                    <Badge enableShadow disableOutline color="error">
                      Rad etildi
                    </Badge>
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
                    onClick={() => showSeparateMessageModal(item.id)}
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
  