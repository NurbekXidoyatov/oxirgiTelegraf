import { Loading, Grid } from "@nextui-org/react";

export default function LoadingPage() {
  return (
    <Grid.Container justify="center" align="center">
      <Grid>
        <Loading type="spinner" size="xl" />
      </Grid>
    </Grid.Container>
  );
}