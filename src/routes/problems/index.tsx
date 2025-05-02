import {createFileRoute} from '@tanstack/react-router'
import React from "react";

export const Route = createFileRoute('/problems/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <React.Fragment></React.Fragment>
  )
}
