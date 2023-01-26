import { Button, Grid } from "@nextui-org/react";

export default function ButtonBlue({showBasket, children, ...props}) {

  
  return (
    <Grid.Container>
      <Grid>
        <Button {...props} onClick={showBasket}>
          {children}
        </Button>
      </Grid>
    </Grid.Container>
  );
}