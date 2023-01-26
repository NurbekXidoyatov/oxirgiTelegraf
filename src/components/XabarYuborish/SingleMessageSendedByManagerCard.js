import { useEffect, useState } from "react";
import { useHttp } from "../AsyncURL/useHttp";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import { useHistory, useParams } from 'react-router-dom'
import { Card, Grid, Text, Link, Row, Button } from "@nextui-org/react";

export default function SingleMessageSndedByManager() {

    const {request} = useHttp()
    var {id} = useParams()
    const history = useHistory()
    const [singleMessage, setsingleMessage] = useState([])


    useEffect(() => {
        request(`${UniversalURL}message/find-by-message-id/${id}`, "GET", null, {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json"
        })
          .then(response => {
            setsingleMessage(response.data)
          })
          .catch(error => console.log(error))
      }, [id])
    


  return (
    <Card >
      <Card.Header>
        <img
          alt="nextui logo"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width="34px"
          height="34px"
        />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
            {singleMessage?.title}
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>{singleMessage?.fromUser?.fullName}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio atque optio quod a eos autem sequi nemo. Aperiam dolorum ut aut perferendis assumenda unde cum nobis, libero, inventore facilis ullam sunt autem commodi! Voluptate atque pariatur, quaerat numquam maxime magni amet odio. Sapiente similique ullam cum sed facilis nulla incidunt.
        </Text>
      </Card.Body>
      <Card.Divider />
          <Card.Footer>
            <Row justify="space-around">
              <Button size="sm" color="error">
                Go back
              </Button>
              <Button size="sm" color="success">
                Learn more
              </Button>
            </Row>
          </Card.Footer>
    </Card>
  );
}